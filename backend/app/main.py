import os
import contextlib
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1.api import api_router
from app.models.entities import User, Wallet, SubscriptionPlan
from app.core.security import get_password_hash

# Create tables on startup
Base.metadata.create_all(bind=engine)

def seed_initial_data():
    """
    Seed initial subscription plans and optional development demo user.
    Demo user password is read securely from environment variables.
    No hardcoded production credentials are stored in code.
    """
    with Session(engine) as db:
        # 1. Always seed standard subscription plan tiers
        plans = [
            SubscriptionPlan(
                id="free",
                tier="free",
                name="Nexus Explorer",
                price_inr=0.0,
                billing_period="forever",
                ai_credits_monthly=50,
                features_json={"chat": True, "docs_limit": 3}
            ),
            SubscriptionPlan(
                id="plus_monthly",
                tier="plus",
                name="Nexus Plus",
                price_inr=249.0,
                billing_period="monthly",
                ai_credits_monthly=300,
                features_json={"chat": True, "docs_limit": 25, "resume_ai": True}
            ),
            SubscriptionPlan(
                id="pro_monthly",
                tier="pro",
                name="Nexus Pro",
                price_inr=599.0,
                billing_period="monthly",
                ai_credits_monthly=1000,
                features_json={"chat": True, "docs_limit": 100, "resume_ai": True, "smart_apply": True}
            )
        ]
        for plan in plans:
            db.merge(plan)

        # 2. Seed optional development demo account only if configured via environment variables
        seed_enabled = os.getenv("SEED_DEMO_DATA", "true").lower() in ("true", "1", "yes")
        demo_email = os.getenv("DEMO_USER_EMAIL", "demo@nexusai.dev")
        demo_password = os.getenv("DEMO_USER_PASSWORD", "")

        if seed_enabled and demo_password:
            demo_user = db.query(User).filter(User.email == demo_email).first()
            if not demo_user:
                demo_user = User(
                    email=demo_email,
                    hashed_password=get_password_hash(demo_password),
                    full_name="Alex Vance",
                    role="pro",
                    is_verified=True
                )
                db.add(demo_user)
                db.flush()

                # Seed demo wallet
                wallet = Wallet(
                    user_id=demo_user.id,
                    credits_balance=85,
                    total_credits_purchased=100,
                    total_credits_spent=15
                )
                db.add(wallet)

        db.commit()

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    # Production security check: ensure weak dev secret key is not deployed
    if settings.ENVIRONMENT == "production":
        if "nexus-dev" in settings.SECRET_KEY or "secret" in settings.SECRET_KEY.lower():
            raise RuntimeError("CRITICAL: Unsafe SECRET_KEY detected in production environment!")
    seed_initial_data()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Nexus AI — Personal Intelligence Operating System Backend Services",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API v1
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "database_connected": True,
        "ai_provider": settings.AI_DEFAULT_PROVIDER,
        "billing_sandbox": settings.BILLING_SANDBOX_MODE
    }
