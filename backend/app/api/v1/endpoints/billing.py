from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.entities import SubscriptionPlan, Wallet
from app.schemas.modules import PlanResponse, WalletResponse

router = APIRouter()

@router.get("/plans", response_model=List[PlanResponse])
def get_plans(db: Session = Depends(get_db)):
    plans = db.query(SubscriptionPlan).filter(SubscriptionPlan.is_active == True).all()
    if not plans:
        # Default seeded plans
        return [
            {
                "id": "free",
                "tier": "free",
                "name": "Nexus Explorer",
                "price_inr": 0.0,
                "billing_period": "forever",
                "ai_credits_monthly": 50,
                "features_json": {
                    "assistant_chat": True,
                    "max_documents": 3,
                    "resume_analyzer": "basic",
                    "lifeos_tasks": True
                }
            },
            {
                "id": "plus_monthly",
                "tier": "plus",
                "name": "Nexus Plus",
                "price_inr": 249.0,
                "billing_period": "monthly",
                "ai_credits_monthly": 300,
                "features_json": {
                    "assistant_chat": True,
                    "max_documents": 25,
                    "resume_analyzer": "advanced",
                    "lifeos_tasks": True,
                    "rag_document_chat": True
                }
            },
            {
                "id": "pro_monthly",
                "tier": "pro",
                "name": "Nexus Pro",
                "price_inr": 599.0,
                "billing_period": "monthly",
                "ai_credits_monthly": 1000,
                "features_json": {
                    "assistant_chat": True,
                    "max_documents": 100,
                    "resume_analyzer": "unlimited",
                    "lifeos_tasks": True,
                    "rag_document_chat": True,
                    "opportunity_radar_alerts": True,
                    "smart_apply_engine": True
                }
            }
        ]
    return plans

@router.get("/wallet", response_model=WalletResponse)
def get_wallet(db: Session = Depends(get_db)):
    wallet = db.query(Wallet).first()
    if not wallet:
        return WalletResponse(
            credits_balance=85,
            total_credits_purchased=100,
            total_credits_spent=15
        )
    return wallet
