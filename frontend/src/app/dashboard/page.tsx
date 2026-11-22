"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchDashboardOverview, analyzePasswordSecurity } from "@/lib/api";
import { DashboardOverview, PasswordAnalysisResult } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Target,
  Briefcase,
  Calendar,
  TrendingUp,
  FileText,
  Send,
  Brain,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Award,
  Layers,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  // Cyber Hub interactive state
  const [pwdInput, setPwdInput] = useState("");
  const [pwdAnalysis, setPwdAnalysis] = useState<PasswordAnalysisResult | null>(null);
  const [analyzingPwd, setAnalyzingPwd] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const overview = await fetchDashboardOverview();
      setData(overview);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePasswordAnalyze = async () => {
    if (!pwdInput) return;
    setAnalyzingPwd(true);
    try {
      const result = await analyzePasswordSecurity(pwdInput);
      setPwdAnalysis(result);
    } catch (err) {
      console.error("Password analysis error:", err);
    } finally {
      setAnalyzingPwd(false);
    }
  };

  return (
    <DashboardShell credits={data?.metrics.ai_credits_available ?? 85}>
      {/* Welcome Banner & Health Indicator */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 lg:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Phase 2 Connected Workspace
              </span>
              <span className="text-xs text-slate-400">Sandbox Mode Active</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {user?.full_name || data?.user_name || "Alex Vance"}
              </span>
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              {data?.ai_greeting || "Your connected personal intelligence workspace is online. All modules are synchronizing user-approved context."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-200 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync Core</span>
            </button>
            <Link
              href="/assistant"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Assistant</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>AI Credits</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {data?.metrics.ai_credits_available ?? 85}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>+50 Monthly grant</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>LifeOS Tasks</span>
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {data?.metrics.active_tasks_count ?? 3}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Pending focus</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Verified Skills</span>
            <Award className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {data?.metrics.career_skills_count ?? 14}
          </div>
          <div className="text-[11px] text-purple-400 mt-1">CareerOS Master</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Applications</span>
            <Send className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {data?.metrics.saved_applications_count ?? 5}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1">2 in interview</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Habit Streak</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {data?.metrics.streak_days ?? 12}d
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Consistent momentum</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>ATS Average</span>
            <FileText className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {data?.metrics.ats_average_score ?? 88}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">High interview rate</div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Connected Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/career"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-cyan-500/40 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors">
              CareerOS Profile
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Manage skills, view verified portfolio evidence, and target roles.
            </p>
          </Link>

          <Link
            href="/assistant"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-purple-500/40 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <Brain className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-slate-200 group-hover:text-purple-400 transition-colors">
              AI Intelligence Session
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Grounded conversational reasoning across all 18 modules.
            </p>
          </Link>

          <Link
            href="/lifeos"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-blue-500/40 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">
              LifeOS Daily Planner
            </div>
            <p className="text-xs text-slate-400 mt-1">
              View active tasks, create new milestones, and maintain habit streaks.
            </p>
          </Link>

          <Link
            href="/second-brain"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-slate-200 group-hover:text-emerald-400 transition-colors">
              Second Brain RAG
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Upload documents, view chunked embeddings, and chat with notes.
            </p>
          </Link>
        </div>
      </div>

      {/* 2-Column Section: Opportunity Radar & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Opportunity Radar (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>Opportunity Radar — Active Matches</span>
              </h3>
              <p className="text-xs text-slate-400">
                Opportunities matched with verified skills in CareerOS.
              </p>
            </div>
            <Link
              href="/radar"
              className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded-md hover:bg-cyan-900/40 transition-colors"
            >
              Explore All Radar →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.top_opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/90 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-100">
                      {opp.job_title}
                    </span>
                    <span className="text-xs text-slate-400">• {opp.company_name}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>{opp.location}</span>
                    {opp.deadline && <span>Deadline: {opp.deadline}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Match:</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">
                      {opp.match_score}%
                    </span>
                  </div>
                  <Link
                    href="/radar"
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Intelligence Timeline & Cyber Hub (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Activity Stream</span>
            </h3>
            <span className="text-xs text-slate-500">Live</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            {data?.recent_activities.map((act) => (
              <div key={act.id} className="relative pl-5 border-l border-slate-800 space-y-1">
                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-slate-950"></span>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{act.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{act.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {act.description}
                </p>
              </div>
            ))}
          </div>

          {/* Cyber Hub Interactive Widget */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cyber Hub — Password Analyzer</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Defensive
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Zero plain-text storage. Evaluates password entropy locally and against security heuristics.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={pwdInput}
                onChange={(e) => setPwdInput(e.target.value)}
                placeholder="Enter test password..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handlePasswordAnalyze}
                disabled={analyzingPwd || !pwdInput}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs text-white font-medium transition-colors"
              >
                {analyzingPwd ? "Checking..." : "Analyze"}
              </button>
            </div>
            {pwdAnalysis && (
              <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Strength Score:</span>
                  <span className={`font-bold font-mono ${pwdAnalysis.is_strong ? "text-emerald-400" : "text-amber-400"}`}>
                    {pwdAnalysis.score}/4 ({pwdAnalysis.is_strong ? "Strong" : "Weak"})
                  </span>
                </div>
                <div className="text-slate-400">
                  Estimated Crack Time: <span className="text-slate-200">{pwdAnalysis.estimated_crack_time}</span>
                </div>
                <div className="text-slate-500 text-[10px]">
                  {pwdAnalysis.feedback.join(" ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
