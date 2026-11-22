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

# Job Application Schemas
class JobApplicationCreate(BaseModel):
    opportunity_id: Optional[str] = None
    company_name: str
    job_title: str
    location: Optional[str] = None
    work_mode: Optional[str] = "remote"
    salary_range: Optional[str] = None
    application_url: Optional[str] = None
    deadline: Optional[datetime] = None
    notes: Optional[str] = None
    status: Optional[str] = "saved"
    interview_date: Optional[datetime] = None
    follow_up_date: Optional[datetime] = None

class JobApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    interview_date: Optional[datetime] = None
    follow_up_date: Optional[datetime] = None

class JobApplicationResponse(BaseModel):
    id: str
    user_id: str
    company_name: str
    job_title: str
    location: Optional[str]
    work_mode: Optional[str]
    salary_range: Optional[str]
    application_url: Optional[str]
    deadline: Optional[datetime]
    notes: Optional[str]
    status: str
    interview_date: Optional[datetime]
    follow_up_date: Optional[datetime]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Analytics
class JobAnalyticsResponse(BaseModel):
    status_counts: Dict[str, int]
    total: int
    model_config = ConfigDict(from_attributes=True)

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

# Cyber Hub schemas (continued)

class CyberChecklistItem(BaseModel):
    name: str
    description: Optional[str] = None
    completed: bool = False

class CyberChecklistCreate(BaseModel):
    items: List[CyberChecklistItem]

class CyberChecklistResponse(BaseModel):
    id: str
    items: List[CyberChecklistItem]
    score: float
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class SecurityFindingCreate(BaseModel):
    title: str
    description: Optional[str] = None
    severity: Optional[str] = "low"  # low, medium, high, critical
    project_id: Optional[str] = None
    is_simulated: bool = True

class SecurityFindingUpdate(BaseModel):
    status: Optional[str] = None
    remediation: Optional[str] = None
    is_simulated: Optional[bool] = None

class SecurityFindingResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    severity: str
    status: str
    remediation: Optional[str]
    is_simulated: bool
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class LearningModuleResponse(BaseModel):
    id: str
    title: str
    category: str
    content: str
    resource_url: Optional[str] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ReminderCreate(BaseModel):
    finding_id: str
    message: str
    scheduled_at: datetime

class ReminderResponse(BaseModel):
    id: str
    message: str
    scheduled_at: datetime
    sent: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
