"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchCareerSkills } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  Briefcase,
  Award,
  CheckCircle2,
  Plus,
  FileText,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface Skill {
  id: string;
  skill_name: string;
  category: string;
  proficiency_level: number;
  is_verified: boolean;
}

export default function CareerOSPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("technical");
  const [newSkillProficiency, setNewSkillProficiency] = useState(4);

  useEffect(() => {
    fetchCareerSkills()
      .then(setSkills)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      skill_name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency_level: Number(newSkillProficiency),
      is_verified: false,
    };

    setSkills((prev) => [newSkill, ...prev]);
    setNewSkillName("");
    setIsModalOpen(false);
  };

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Career Intelligence
              </span>
              <span className="text-xs text-slate-400">Verified Master Profile</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <span>CareerOS Workspace</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Central ground-truth for your verified skills, projects, and truthful resume tailoring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setIsModalOpen(true)} className="text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Verified Skill</span>
            </Button>
          </div>
        </div>

        {/* Master Career Identity Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Target Role</div>
            <div className="text-base font-bold text-white">AI Platform Architect</div>
            <div className="text-[11px] text-cyan-400">High-Market Relevance</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Years of Experience</div>
            <div className="text-base font-bold text-white font-mono">3.5 Years</div>
            <div className="text-[11px] text-slate-400">Full-Stack AI Systems</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Master ATS Score</div>
            <div className="text-base font-bold text-emerald-400 font-mono">88% Average</div>
            <div className="text-[11px] text-slate-400">Tested across 15 JDs</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Profile Verification</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Truthful Ground-Truth</span>
            </div>
            <div className="text-[10px] text-slate-500">Zero Fabricated Claims</div>
          </div>
        </div>

        {/* Verified Skills Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Validated Skill Inventory ({skills.length})</span>
            </h2>
            <span className="text-xs text-slate-400">Connected to Opportunity Radar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm text-slate-100">{skill.skill_name}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{skill.category}</div>
                  </div>
                  {skill.is_verified ? (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                      SELF-REPORTED
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Proficiency</span>
                    <span>Level {skill.proficiency_level} / 5</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Customization Banner */}
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 to-cyan-950/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>AI Resume Tailoring Engine</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Paste a Job Description from Opportunity Radar to extract missing keywords, match skills, and generate a truthful ATS-optimized PDF resume.
            </p>
          </div>
          <Button variant="outline" className="text-xs text-cyan-400 border-cyan-500/40">
            <span>Tailor Resume for New Role</span>
            <Sparkles className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Add Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Verified Skill to CareerOS"
        description="Records your skill capability as ground truth for resume tailoring."
      >
        <form onSubmit={handleAddSkill} className="space-y-4">
          <Input
            id="skill_name"
            label="Skill Name"
            placeholder="e.g. Docker, PyTorch, Kubernetes"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Category</label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="technical">Technical / Engineering</option>
              <option value="system_design">System Architecture</option>
              <option value="ai_ml">AI & Machine Learning</option>
              <option value="soft">Leadership & Communication</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Proficiency Level (1 - 5): {newSkillProficiency}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={newSkillProficiency}
              onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs">
              Cancel
            </Button>
            <Button type="submit" className="text-xs">
              Save to CareerOS
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
}
