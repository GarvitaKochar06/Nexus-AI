from fastapi import Depends
import uuid
from sqlalchemy.orm import Session
from datetime import datetime, date
from sqlalchemy import func

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.entities import Wallet, Subscription, SubscriptionPlan, AIUsageLog

def get_wallet(db: Session, user_id: str) -> Wallet:
    wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
    if not wallet:
        raise HTTPException(status_code=400, detail="Wallet not found")
    return wallet

def get_active_subscription_plan(db: Session, user_id: str) -> SubscriptionPlan:
    sub = (
        db.query(Subscription)
        .filter(Subscription.user_id == user_id, Subscription.status == "active")
        .first()
    )
    if not sub:
        raise HTTPException(status_code=400, detail="Active subscription not found")
    plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == sub.plan_id).first()
    if not plan:
        raise HTTPException(status_code=400, detail="Subscription plan not found")
    return plan

def enforce_usage_limits(
    user=Depends(get_current_user), db: Session = Depends(get_db)
):
    """Dependency injected into AI endpoints.
    It checks daily limits and returns a callable that records successful usage.
    """
    wallet = get_wallet(db, user.id)
    plan = get_active_subscription_plan(db, user.id)

    # Simple daily limit derived from monthly credits (approximate)
    daily_limit = max(plan.ai_credits_monthly // 30, 1)

    # Tokens used today (sum of total_tokens in AIUsageLog)
    today = date.today()
    used_today = (
        db.query(func.coalesce(func.sum(AIUsageLog.total_tokens), 0))
        .filter(
            AIUsageLog.user_id == user.id,
            AIUsageLog.created_at >= datetime.combine(today, datetime.min.time()),
        )
        .scalar()
    )
    if used_today >= daily_limit:
        raise HTTPException(
            status_code=429, detail="Daily AI usage limit reached"
        )

    def record_success(tokens: int = 0, request_id: str | None = None):
        # Prevent duplicate or negative deductions
        if tokens <= 0:
            return
        # Ensure uniqueness of request_id
        if request_id:
            existing = db.query(AIUsageLog).filter(AIUsageLog.id == request_id).first()
            if existing:
                return  # already processed
        # Deduct from wallet atomically
        if wallet.credits_balance < tokens:
            raise HTTPException(status_code=400, detail="Insufficient credits")
        wallet.credits_balance -= tokens
        # Log usage with request_id as primary key if provided
        usage = AIUsageLog(
            id=request_id or str(uuid.uuid4()),
            user_id=user.id,
            provider="sandbox",
            model_name="sandbox-model",
            feature="chat",
            prompt_tokens=0,
            completion_tokens=tokens,
            total_tokens=tokens,
            estimated_cost_usd=0.0,
        )
        db.add(usage)
        db.commit()

    return record_success
