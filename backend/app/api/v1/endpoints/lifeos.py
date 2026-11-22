from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.entities import Task, User
from app.schemas.modules import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter()

@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).order_by(Task.created_at.desc()).all()

@router.post("/tasks", response_model=TaskResponse)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db)):
    user = db.query(User).first()
    user_id = user.id if user else "default-user"

    task = Task(
        user_id=user_id,
        title=task_in.title,
        description=task_in.description,
        priority=task_in.priority or "medium",
        due_date=task_in.due_date,
        estimated_minutes=task_in.estimated_minutes or 30
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.patch("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, task_up: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task_up.status is not None:
        task.status = task_up.status
    if task_up.title is not None:
        task.title = task_up.title
    if task_up.priority is not None:
        task.priority = task_up.priority
    db.commit()
    db.refresh(task)
    return task
