from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class DashboardMetrics(BaseModel):
    ai_credits_available: int
    active_tasks_count: int
    career_skills_count: int
    saved_applications_count: int
    streak_days: int
    ats_average_score: int
    system_readiness_pct: int

class QuickStats(BaseModel):
    memory_count: int
    documents_indexed: int
    interviews_scheduled: int
    active_habits: int

class RecentActivityItem(BaseModel):
    id: str
    category: str # 'memory', 'career', 'lifeos', 'system'
    title: str
    description: str
    timestamp: str
    status: Optional[str] = None

class OpportunitySummary(BaseModel):
    id: str
    company_name: str
    job_title: str
    match_score: int
    location: str
    deadline: Optional[str] = None
    required_skills: List[str]

class DashboardOverviewResponse(BaseModel):
    user_name: str
    subscription_tier: str
    metrics: DashboardMetrics
    quick_stats: QuickStats
    recent_activities: List[RecentActivityItem]
    top_opportunities: List[OpportunitySummary]
    ai_greeting: str
    last_synced: str
