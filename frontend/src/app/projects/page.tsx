"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { FolderKanban, Github, ExternalLink, Award, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProjectHubPage() {
  const projects = [
    {
      id: "p-1",
      title: "Nexus AI Operating System",
      description: "Full-stack personal AI workspace combining LifeOS, CareerOS, Second Brain RAG, and multi-tier AI routing.",
      technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "pgvector"],
      repoUrl: "https://github.com/alexvance/nexus-ai",
      skillsValidated: ["System Architecture", "RAG Orchestration", "FastAPI"],
    },
    {
      id: "p-2",
      title: "Semantic Vector Search Pipeline",
      description: "High-performance embedding service utilizing pgvector and IVFFlat indexing for sub-10ms similarity queries.",
      technologies: ["Python", "PyTorch", "pgvector", "FastAPI"],
      repoUrl: "https://github.com/alexvance/vector-pipeline",
      skillsValidated: ["Vector DBs", "Python"],
    },
  ];

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Portfolio Evidence
              </span>
              <span className="text-xs text-slate-400">Ground-Truth Evidence</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-blue-400" />
              <span>Project Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Connect your GitHub projects and real engineering deliverables to validate CareerOS skills.
            </p>
          </div>
        </div>

        {/* Project Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all space-y-4"
            >
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] text-slate-500">Validates CareerOS Skills:</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.skillsValidated.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
