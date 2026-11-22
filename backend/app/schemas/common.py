from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    email: str
    full_name: str
    role: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class UserBase(BaseModel):
    email: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: str
    role: str
    is_verified: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
    database_connected: bool
    ai_provider: str
    billing_sandbox: bool
