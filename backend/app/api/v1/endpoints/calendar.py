from fastapi import APIRouter, Depends, HTTPException, Query
from datetime import date, datetime, timedelta
from typing import List

from app.core.security import get_current_user
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.models.entities import Task, Goal, Habit

router = APIRouter()

def _date_range(start: date, end: date):
    return start, end

@router.get("/calendar/month")
async def get_month_view(
    year: int = Query(...),
    month: int = Query(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        start = date(year, month, 1)
        if month == 12:
            end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            end = date(year, month + 1, 1) - timedelta(days=1)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid year or month")
    tasks = (
        db.query(Task)
        .filter(Task.user_id == user.id, Task.due_date >= start, Task.due_date <= end)
        .all()
    )
    goals = (
        db.query(Goal)
        .filter(Goal.user_id == user.id, Goal.target_date >= start, Goal.target_date <= end)
        .all()
    )
    habits = (
        db.query(Habit)
        .filter(Habit.user_id == user.id, Habit.created_at >= start, Habit.created_at <= end)
        .all()
    )
    return {"tasks": tasks, "goals": goals, "habits": habits}

@router.get("/calendar/week")
async def get_week_view(
    start_date: date = Query(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    end_date = start_date + timedelta(days=6)
    tasks = (
        db.query(Task)
        .filter(Task.user_id == user.id, Task.due_date >= start_date, Task.due_date <= end_date)
        .all()
    )
    goals = (
        db.query(Goal)
        .filter(Goal.user_id == user.id, Goal.target_date >= start_date, Goal.target_date <= end_date)
        .all()
    )
    habits = (
        db.query(Habit)
        .filter(Habit.user_id == user.id, Habit.created_at >= start_date, Habit.created_at <= end_date)
        .all()
    )
    return {"tasks": tasks, "goals": goals, "habits": habits}

@router.get("/calendar/day")
async def get_day_view(
    day: date = Query(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tasks = (
        db.query(Task)
        .filter(Task.user_id == user.id, Task.due_date == day)
        .all()
    )
    goals = (
        db.query(Goal)
        .filter(Goal.user_id == user.id, Goal.target_date == day)
        .all()
    )
    habits = (
        db.query(Habit)
        .filter(Habit.user_id == user.id, Habit.created_at == day)
        .all()
    )
    return {"tasks": tasks, "goals": goals, "habits": habits}

@router.patch("/tasks/{task_id}/reschedule")
async def reschedule_task(
    task_id: str,
    new_date: date = Query(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.due_date = new_date
    db.commit()
    return {"status": "ok", "task": task}
