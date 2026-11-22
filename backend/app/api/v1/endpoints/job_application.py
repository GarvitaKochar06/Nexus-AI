from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.models.entities import JobApplication, JobOpportunity, User
from app.schemas.modules import (
    JobApplicationCreate,
    JobApplicationUpdate,
    JobApplicationResponse,
    JobAnalyticsResponse,
)

router = APIRouter()

# Helper to ensure ownership
def get_user(job_app: JobApplication, user_id: str):
    if job_app.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized for this application")
    return job_app

@router.post("/applications", response_model=JobApplicationResponse)
def create_application(payload: JobApplicationCreate, db: Session = Depends(get_db), user: User = Depends(lambda: None)):
    # In production user is obtained from auth dependency; here we assume a placeholder
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    # Prevent duplicate (same company+title+user)
    dup = (
        db.query(JobApplication)
        .filter(JobApplication.user_id == user.id)
        .filter(JobApplication.company_name == payload.company_name)
        .filter(JobApplication.job_title == payload.job_title)
        .first()
    )
    if dup:
        raise HTTPException(status_code=400, detail="Application already exists for this role")
    job_app = JobApplication(
        user_id=user.id,
        opportunity_id=payload.opportunity_id,
        company_name=payload.company_name,
        job_title=payload.job_title,
        location=payload.location,
        work_mode=payload.work_mode,
        salary_range=payload.salary_range,
        application_url=payload.application_url,
        deadline=payload.deadline,
        notes=payload.notes,
        status=payload.status,
        interview_date=payload.interview_date,
        follow_up_date=payload.follow_up_date,
    )
    db.add(job_app)
    db.commit()
    db.refresh(job_app)
    return job_app

@router.get("/applications", response_model=List[JobApplicationResponse])
def list_applications(
    status: Optional[str] = Query(None),
    role: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    work_mode: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    user: User = Depends(lambda: None),
):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    query = db.query(JobApplication).filter(JobApplication.user_id == user.id)
    if status:
        query = query.filter(JobApplication.status == status)
    if role:
        query = query.filter(JobApplication.job_title.ilike(f"%{role}%"))
    if location:
        query = query.filter(JobApplication.location.ilike(f"%{location}%"))
    if work_mode:
        query = query.filter(JobApplication.work_mode == work_mode)
    return query.all()

@router.get("/applications/{app_id}", response_model=JobApplicationResponse)
def get_application(app_id: str, db: Session = Depends(get_db), user: User = Depends(lambda: None)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    job_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not job_app:
        raise HTTPException(status_code=404, detail="Application not found")
    get_user(job_app, user.id)
    return job_app

@router.patch("/applications/{app_id}", response_model=JobApplicationResponse)
def update_application(app_id: str, payload: JobApplicationUpdate, db: Session = Depends(get_db), user: User = Depends(lambda: None)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    job_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not job_app:
        raise HTTPException(status_code=404, detail="Application not found")
    get_user(job_app, user.id)
    for attr, value in payload.dict(exclude_unset=True).items():
        setattr(job_app, attr, value)
    db.commit()
    db.refresh(job_app)
    return job_app

@router.delete("/applications/{app_id}")
def delete_application(app_id: str, db: Session = Depends(get_db), user: User = Depends(lambda: None)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    job_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not job_app:
        raise HTTPException(status_code=404, detail="Application not found")
    get_user(job_app, user.id)
    db.delete(job_app)
    db.commit()
    return {"detail": "Deleted"}

@router.get("/applications/analytics", response_model=JobAnalyticsResponse)
def application_analytics(db: Session = Depends(get_db), user: User = Depends(lambda: None)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    from sqlalchemy import func
    counts = (
        db.query(JobApplication.status, func.count())
        .filter(JobApplication.user_id == user.id)
        .group_by(JobApplication.status)
        .all()
    )
    status_counts = {status: cnt for status, cnt in counts}
    total = sum(status_counts.values())
    return JobAnalyticsResponse(status_counts=status_counts, total=total)
