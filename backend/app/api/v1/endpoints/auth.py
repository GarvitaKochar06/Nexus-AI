from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.entities import User, Wallet, Subscription, SubscriptionPlan
from app.schemas.common import Token, UserCreate, UserLogin, UserResponse
from datetime import datetime, timedelta, timezone

router = APIRouter()

@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role="user",
        is_verified=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Initialize wallet with 50 free credits
    wallet = Wallet(user_id=user.id, credits_balance=50)
    db.add(wallet)

    # Default to free tier
    now = datetime.now(timezone.utc)
    free_sub = Subscription(
        user_id=user.id,
        plan_id="free",
        status="active",
        current_period_start=now,
        current_period_end=now + timedelta(days=365)
    )
    db.add(free_sub)
    db.commit()

    token = create_access_token(subject=user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role
    }

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    token = create_access_token(subject=user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role
    }
