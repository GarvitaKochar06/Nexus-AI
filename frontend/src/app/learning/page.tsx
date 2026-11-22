"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { BookOpen, CheckCircle2, Clock, Sparkles, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LearningHubPage() {
  const learningPaths = [
    {
      id: "lp-1",
      title: "Distributed Systems & Consensus",
      progress: 65,
      status: "In Progress",
      modulesCompleted: 4,
      totalModules: 6,
      targetSkill: "System Architecture",
    },
    {
      id: "lp-2",
      title: "vLLM & High-Performance Inference",
      progress: 30,
      status: "In Progress",
      modulesCompleted: 2,
      totalModules: 7,
      targetSkill: "AI Systems Engineering",
    },
    {
      id: "lp-3",
      title: "pgvector Index Optimization & IVFFlat",
      progress: 100,
      status: "Completed",
      modulesCompleted: 5,
      totalModules: 5,
      targetSkill: "PostgreSQL Vector DB",
    },
  ];

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Skills Growth
              </span>
              <span className="text-xs text-slate-400">Integrated with CareerOS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <span>Learning Hub & Skill Roadmaps</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Personalized revision schedules, study roadmaps, and automated skill-gap closure.
            </p>
          </div>
        </div>

        {/* Active Roadmaps */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Active Study Roadmaps</span>
          </h2>

          <div className="space-y-3">
            {learningPaths.map((lp) => (
              <div
                key={lp.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-slate-100">{lp.title}</h3>
                    <div className="text-[11px] text-cyan-400 mt-0.5">Target Skill: {lp.targetSkill}</div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      lp.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                    }`}
                  >
                    {lp.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>{lp.modulesCompleted} of {lp.totalModules} modules</span>
                    <span>{lp.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      style={{ width: `${lp.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
