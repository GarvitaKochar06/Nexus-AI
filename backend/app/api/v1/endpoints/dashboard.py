from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.core.database import get_db
from app.schemas.dashboard import (
    DashboardOverviewResponse, DashboardMetrics, QuickStats,
    RecentActivityItem, OpportunitySummary
)
from app.models.entities import (
    User, Wallet, Task, Memory, CareerProfile, UserSkill,
    JobApplication, JobOpportunity, Document
)

router = APIRouter()

@router.get("/overview", response_model=DashboardOverviewResponse)
def get_dashboard_overview(db: Session = Depends(get_db)):
    # Fetch demo user or default active profile
    user = db.query(User).first()
    user_name = user.full_name if user else "Pioneer User"
    
    # Calculate live counts from DB
    wallet = db.query(Wallet).first()
    credits = wallet.credits_balance if wallet else 85
    
    tasks_count = db.query(Task).filter(Task.status != "completed").count()
    skills_count = db.query(UserSkill).count()
    app_count = db.query(JobApplication).count()
    memories_count = db.query(Memory).filter(Memory.is_active == True).count()
    docs_count = db.query(Document).count()

    metrics = DashboardMetrics(
        ai_credits_available=credits,
        active_tasks_count=max(tasks_count, 3),
        career_skills_count=max(skills_count, 14),
        saved_applications_count=max(app_count, 5),
        streak_days=12,
        ats_average_score=88,
        system_readiness_pct=94
    )

    quick_stats = QuickStats(
        memory_count=max(memories_count, 18),
        documents_indexed=max(docs_count, 7),
        interviews_scheduled=2,
        active_habits=4
    )

    recent_activities = [
        RecentActivityItem(
            id="act-1",
            category="career",
            title="Resume Tailored for Senior AI Engineer",
            description="Generated ATS-compliant resume with 92% match score for DeepMind.",
            timestamp="15m ago",
            status="completed"
        ),
        RecentActivityItem(
            id="act-2",
            category="memory",
            title="Saved Learning Goal to Memory",
            description="Knowledge Engine indexed interest in Rust and Distributed Systems.",
            timestamp="1h ago",
            status="verified"
        ),
        RecentActivityItem(
            id="act-3",
            category="lifeos",
            title="Completed Task: System Architecture Review",
            description="LifeOS streak updated to 12 consecutive productive days.",
            timestamp="3h ago",
            status="completed"
        ),
        RecentActivityItem(
            id="act-4",
            category="system",
            title="Second Brain Synced",
            description="4 documents and 32 semantic chunks indexed with vector embeddings.",
            timestamp="5h ago",
            status="synced"
        )
    ]

    top_opportunities = [
        OpportunitySummary(
            id="opp-1",
            company_name="Google DeepMind",
            job_title="Research Engineer — Multimodal AI",
            match_score=94,
            location="Bengaluru / Hybrid",
            deadline="15 Dec 2026",
            required_skills=["Python", "PyTorch", "Transformers", "Distributed Systems"]
        ),
        OpportunitySummary(
            id="opp-2",
            company_name="Anthropic",
            job_title="Full Stack Systems Engineer",
            match_score=89,
            location="Remote",
            deadline="20 Dec 2026",
            required_skills=["TypeScript", "Next.js", "FastAPI", "PostgreSQL"]
        ),
        OpportunitySummary(
            id="opp-3",
            company_name="Nexus AI Core",
            job_title="Founding AI Platform Architect",
            match_score=98,
            location="Global Remote",
            deadline="Rolling",
            required_skills=["LLM Architecture", "RAG", "FastAPI", "React"]
        )
    ]

    return DashboardOverviewResponse(
        user_name=user_name,
        subscription_tier="Nexus Pro",
        metrics=metrics,
        quick_stats=quick_stats,
        recent_activities=recent_activities,
        top_opportunities=top_opportunities,
        ai_greeting="Welcome back to your connected intelligence workspace. All systems are operational.",
        last_synced=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    )
