from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.entities import CareerProfile, UserSkill, Project
from app.schemas.modules import SkillResponse

router = APIRouter()

@router.get("/skills", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    skills = db.query(UserSkill).all()
    if not skills:
        return [
            {"id": "sk-1", "skill_name": "Python & FastAPI", "category": "technical", "proficiency_level": 5, "is_verified": True},
            {"id": "sk-2", "skill_name": "TypeScript & Next.js", "category": "technical", "proficiency_level": 4, "is_verified": True},
            {"id": "sk-3", "skill_name": "RAG & LLM Orchestration", "category": "technical", "proficiency_level": 5, "is_verified": True},
            {"id": "sk-4", "skill_name": "PostgreSQL & Vector DBs", "category": "technical", "proficiency_level": 4, "is_verified": True},
            {"id": "sk-5", "skill_name": "System Architecture", "category": "technical", "proficiency_level": 4, "is_verified": False}
        ]
    return skills
