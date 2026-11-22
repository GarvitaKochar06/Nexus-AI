from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.entities import User, Subscription, SubscriptionPlan, Wallet, AIUsageLog, AuditLog
from app.api.v1.dependencies.admin import admin_required

router = APIRouter()

# Helper to record audit logs
def record_audit(db: Session, admin_user: User, action: str, target_type: Optional[str] = None, target_id: Optional[str] = None, details: Optional[dict] = None):
    audit = AuditLog(
        user_id=admin_user.id,
        action=action,
        target_type=target_type,
        target_id=target_id,
        details=details or {},
    )
    db.add(audit)
    db.commit()

# 1️⃣ Overview
@router.get("/overview", summary="Admin overview dashboard")
def admin_overview(db: Session = Depends(get_db), admin: User = Depends(admin_required)):
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_verified == True).count()
    free_subs = db.query(Subscription).filter(Subscription.plan_id == "free").count()
    pro_subs = db.query(Subscription).filter(Subscription.plan_id == "pro").count()
    premium_subs = db.query(Subscription).filter(Subscription.plan_id == "premium").count()
    total_ai_requests = db.query(AIUsageLog).count()
    total_credits = db.query(Wallet).with_entities(func.sum(Wallet.credits_balance)).scalar() or 0
    # Simple recent registrations (last 7 days)
    recent_regs = db.query(User).order_by(User.created_at.desc()).limit(5).all()
    return {
        "total_users": total_users,
        "active_users": active_users,
        "subscriptions": {
            "free": free_subs,
            "pro": pro_subs,
            "premium": premium_subs,
        },
        "ai_requests": total_ai_requests,
        "credits_balance": total_credits,
        "recent_registrations": [u.id for u in recent_regs],
    }

# 2️⃣ User management
@router.get("/users", response_model=List[dict])
def list_users(
    q: Optional[str] = Query(None, description="Search by email or name"),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    admin: User = Depends(admin_required),
):
    query = db.query(User)
    if q:
        like = f"%{q}%"
        query = query.filter(User.email.ilike(like) | User.full_name.ilike(like))
    users = query.offset(skip).limit(limit).all()
    return [{"id": u.id, "email": u.email, "full_name": u.full_name, "role": u.role, "is_verified": u.is_verified} for u in users]

@router.patch("/users/{user_id}/suspend")
def suspend_user(user_id: str, db: Session = Depends(get_db), admin: User = Depends(admin_required)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role == "admin":
        raise HTTPException(status_code=400, detail="Cannot suspend another admin")
    user.role = "suspended"
    db.commit()
    record_audit(db, admin, action="suspend_user", target_type="user", target_id=user_id)
    return {"status": "suspended"}

@router.patch("/users/{user_id}/reactivate")
def reactivate_user(user_id: str, db: Session = Depends(get_db), admin: User = Depends(admin_required)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role != "suspended":
        raise HTTPException(status_code=400, detail="User is not suspended")
    user.role = "user"
    db.commit()
    record_audit(db, admin, action="reactivate_user", target_type="user", target_id=user_id)
    return {"status": "active"}

# 3️⃣ Subscription management – list plans
@router.get("/plans", response_model=List[dict])
def list_plans(db: Session = Depends(get_db), admin: User = Depends(admin_required)):
    plans = db.query(SubscriptionPlan).all()
    return [{"id": p.id, "name": p.name, "tier": p.tier, "price_inr": p.price_inr, "ai_credits_monthly": p.ai_credits_monthly, "features": p.features_json} for p in plans]

@router.patch("/plans/{plan_id}")
def update_plan(
    plan_id: str,
    features: Optional[dict] = None,
    ai_credits_monthly: Optional[int] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(admin_required),
):
    plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    if features is not None:
        plan.features_json = features
    if ai_credits_monthly is not None:
        plan.ai_credits_monthly = ai_credits_monthly
    db.commit()
    record_audit(db, admin, action="update_plan", target_type="plan", target_id=plan_id, details={"features": features, "ai_credits_monthly": ai_credits_monthly})
    return {"status": "updated"}

# 4️⃣ AI usage monitoring
@router.get("/usage")
def usage_stats(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    admin: User = Depends(admin_required),
):
    query = db.query(AIUsageLog)
    if start_date:
        query = query.filter(AIUsageLog.created_at >= start_date)
    if end_date:
        query = query.filter(AIUsageLog.created_at <= end_date)
    total_requests = query.count()
    credits_consumed = query.with_entities(func.sum(AIUsageLog.total_tokens)).scalar() or 0
    by_feature = (
        query.with_entities(AIUsageLog.feature, func.count(AIUsageLog.id))
        .group_by(AIUsageLog.feature)
        .all()
    )
    return {
        "total_requests": total_requests,
        "credits_consumed": credits_consumed,
        "by_feature": {f: cnt for f, cnt in by_feature},
    }

# 5️⃣ Platform health
@router.get("/health")
def platform_health(db: Session = Depends(get_db), admin: User = Depends(admin_required)):
    # Simple health checks – DB connectivity is implicit, background tasks could be listed from a registry if present.
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

# 6️⃣ Audit logs list
@router.get("/audit-logs", response_model=List[dict])
def list_audit_logs(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    admin: User = Depends(admin_required),
):
    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).offset(skip).limit(limit).all()
    return [
        {
            "id": log.id,
            "admin_id": log.user_id,
            "action": log.action,
            "target_type": log.target_type,
            "target_id": log.target_id,
            "details": log.details,
            "created_at": log.created_at,
        }
        for log in logs
    ]
