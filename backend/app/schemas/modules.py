from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

# Memory
class MemoryCreate(BaseModel):
    category: str
    content: str
    source: Optional[str] = "manual"

class MemoryResponse(BaseModel):
    id: str
    category: str
    content: str
    source: Optional[str]
    confidence_score: float
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# LifeOS
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    due_date: Optional[datetime] = None
    estimated_minutes: Optional[int] = 30

class TaskResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    priority: str
    status: str
    due_date: Optional[datetime]
    estimated_minutes: Optional[int]
    is_ai_generated: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    title: Optional[str] = None
    priority: Optional[str] = None

# CareerOS
class SkillCreate(BaseModel):
    skill_name: str
    category: Optional[str] = "technical"
    proficiency_level: int = 3

class SkillResponse(BaseModel):
    id: str
    skill_name: str
    category: str
    proficiency_level: int
    is_verified: bool
    model_config = ConfigDict(from_attributes=True)

# Billing
class PlanResponse(BaseModel):
    id: str
    tier: str
    name: str
    price_inr: float
    billing_period: str
    ai_credits_monthly: int
    features_json: Dict[str, Any]

class WalletResponse(BaseModel):
    credits_balance: int
    total_credits_purchased: int
    total_credits_spent: int

# Cyber Hub
class PasswordCheckRequest(BaseModel):
    password: str

class PasswordCheckResponse(BaseModel):
    score: int # 0-4
    feedback: List[str]
    is_strong: bool
    estimated_crack_time: str
