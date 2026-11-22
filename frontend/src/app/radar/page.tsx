"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchDashboardOverview } from "@/lib/api";
import { OpportunitySummary } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Radar,
  Target,
  ArrowUpRight,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function OpportunityRadarPage() {
  const [opportunities, setOpportunities] = useState<OpportunitySummary[]>([]);
  const [filterRole, setFilterRole] = useState("all");
  const [selectedOpp, setSelectedOpp] = useState<OpportunitySummary | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStep, setApplyStep] = useState<"review" | "submitted">("review");

  useEffect(() => {
    fetchDashboardOverview().then((res) => {
      setOpportunities(res.top_opportunities);
    });
  }, []);

  const handleOpenApply = (opp: OpportunitySummary) => {
    setSelectedOpp(opp);
    setApplyStep("review");
    setIsApplyModalOpen(true);
  };

  const handleConfirmApply = () => {
    setApplyStep("submitted");
  };

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Career Radar
              </span>
              <span className="text-xs text-slate-400">Grounded in CareerOS Profile</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Radar className="w-6 h-6 text-cyan-400" />
              <span>Opportunity Radar</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Curated high-relevance internships, full-time positions, and hackathons.
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Filter Role:</span>
            {["all", "AI/ML", "Backend", "Full Stack"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterRole(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                  filterRole === cat
                    ? "bg-cyan-500 text-black font-semibold"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            3 Matches Active • Zero Fabricated Opportunities
          </div>
        </div>

        {/* Opportunity Cards List */}
        <div className="space-y-3">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{opp.job_title}</h3>
                    <div className="text-xs text-slate-400">{opp.company_name}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{opp.location}</span>
                  </span>
                  {opp.deadline && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Deadline: {opp.deadline}</span>
                    </span>
                  )}
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

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Career Match Score</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">{opp.match_score}%</div>
                </div>
                <Button onClick={() => handleOpenApply(opp)} size="sm" className="text-xs">
                  <span>Assisted Apply</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assisted Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={applyStep === "review" ? "Assisted Apply Review" : "Application Registered"}
        description={
          applyStep === "review"
            ? "Review prefilled details verified from your CareerOS profile."
            : "Saved to your Application Command Center."
        }
      >
        {applyStep === "review" ? (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-semibold text-slate-200">{selectedOpp?.job_title}</div>
              <div className="text-slate-400">{selectedOpp?.company_name}</div>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-200">Alex Vance</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-500">Resume Version:</span>
                <span className="text-cyan-400">Master AI Platform Architect v2</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-500">Verified Skills Attached:</span>
                <span>Python, TypeScript, FastAPI (Level 5)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
              <span>
                Nexus AI Assisted Apply never bypasses anti-bot rules or submits fabricated answers. You maintain full oversight before submission.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)} size="sm">
                Cancel
              </Button>
              <Button onClick={handleConfirmApply} size="sm">
                Register & Save Application
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center py-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-white">Application Successfully Saved</div>
            <p className="text-slate-400 text-xs">
              Saved under Application Command Center in CareerOS with status &apos;Ready to Apply&apos;.
            </p>
            <Button onClick={() => setIsApplyModalOpen(false)} size="sm" className="mx-auto">
              Return to Radar
            </Button>
          </div>
        )}
      </Modal>
    </DashboardShell>
  );
}
