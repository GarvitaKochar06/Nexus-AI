export interface DashboardMetrics {
  ai_credits_available: number;
  active_tasks_count: number;
  career_skills_count: number;
  saved_applications_count: number;
  streak_days: number;
  ats_average_score: number;
  system_readiness_pct: number;
}

export interface QuickStats {
  memory_count: number;
  documents_indexed: number;
  interviews_scheduled: number;
  active_habits: number;
}

export interface RecentActivityItem {
  id: string;
  category: 'memory' | 'career' | 'lifeos' | 'system';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

export interface OpportunitySummary {
  id: string;
  company_name: string;
  job_title: string;
  match_score: number;
  location: string;
  deadline?: string;
  required_skills: string[];
}

export interface DashboardOverview {
  user_name: string;
  subscription_tier: string;
  metrics: DashboardMetrics;
  quick_stats: QuickStats;
  recent_activities: RecentActivityItem[];
  top_opportunities: OpportunitySummary[];
  ai_greeting: string;
  last_synced: string;
}

export interface PasswordAnalysisResult {
  score: number;
  feedback: string[];
  is_strong: boolean;
  estimated_crack_time: string;
}
