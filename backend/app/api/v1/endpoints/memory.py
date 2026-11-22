from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.entities import Memory, User
from app.schemas.modules import MemoryCreate, MemoryResponse

router = APIRouter()

@router.get("/", response_model=List[MemoryResponse])
def get_memories(db: Session = Depends(get_db)):
    memories = db.query(Memory).order_by(Memory.created_at.desc()).all()
    return memories

@router.post("/", response_model=MemoryResponse)
def create_memory(mem_in: MemoryCreate, db: Session = Depends(get_db)):
    user = db.query(User).first()
    user_id = user.id if user else "default-user"
    
    mem = Memory(
        user_id=user_id,
        category=mem_in.category,
        content=mem_in.content,
        source=mem_in.source,
        confidence_score=1.0,
        is_active=True
    )
    db.add(mem)
    db.commit()
    db.refresh(mem)
    return mem

@router.delete("/{memory_id}")
def delete_memory(memory_id: str, db: Session = Depends(get_db)):
    mem = db.query(Memory).filter(Memory.id == memory_id).first()
    if not mem:
        raise HTTPException(status_code=404, detail="Memory not found")
    db.delete(mem)
    db.commit()
    return {"message": "Memory removed successfully"}
