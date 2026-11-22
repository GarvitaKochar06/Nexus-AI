"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Briefcase,
  Calendar,
  FileText,
  Target,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
  ChevronRight,
  Star,
  Lock,
  Database,
  ExternalLink
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"career" | "lifeos" | "brain" | "radar">("career");

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* ---------------- NAVIGATION ---------------- */}
      <nav className="h-18 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-300 to-white bg-clip-text text-transparent">
              NEXUS AI
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono">
              v1.0 OS
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Ecosystem</a>
          <a href="#comparison" className="hover:text-cyan-400 transition-colors">Why Nexus</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
          <Link href="/assistant" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Assistant</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Your Personal Intelligence • One Connected Workspace</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          AI that doesn&apos;t just answer.{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            AI that understands your journey.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
          Nexus AI connects your episodic memory, career trajectory, daily productivity, and personal knowledge into one cohesive operating system. Powered by real backend architecture with zero fabricated claims.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Open Connected Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Sign In / Demo Account</span>
          </Link>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur">
            <div className="text-cyan-400 font-semibold text-sm mb-1 flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>Personal Memory</span>
            </div>
            <p className="text-[11px] text-slate-400">User-approved episodic & semantic memory engine.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur">
            <div className="text-purple-400 font-semibold text-sm mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Resume Intelligence</span>
            </div>
            <p className="text-[11px] text-slate-400">ATS gap analysis and truthful profile-backed tailoring.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur">
            <div className="text-blue-400 font-semibold text-sm mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>LifeOS Planner</span>
            </div>
            <p className="text-[11px] text-slate-400">Time-blocking, habits, and editable AI schedules.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur">
            <div className="text-emerald-400 font-semibold text-sm mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Cyber Hub</span>
            </div>
            <p className="text-[11px] text-slate-400">Defensive security, password entropy & privacy audits.</p>
          </div>
        </div>
      </section>

      {/* ---------------- INTERACTIVE PRODUCT STAGE ---------------- */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Interactive Product Preview
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            One workspace. Multiple synchronized dimensions.
          </h3>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab("career")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "career"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            CareerOS & Resume AI
          </button>
          <button
            onClick={() => setActiveTab("lifeos")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "lifeos"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            LifeOS Daily Planner
          </button>
          <button
            onClick={() => setActiveTab("brain")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "brain"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Second Brain RAG
          </button>
          <button
            onClick={() => setActiveTab("radar")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "radar"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Opportunity Radar
          </button>
        </div>

        {/* Live Mock Stage */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {activeTab === "career" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-semibold text-white">CareerOS Master Profile</h4>
                  <p className="text-xs text-slate-400">Target Role: AI Platform Architect • Years Experience: 3.5</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
                    ATS Score: 88%
                  </span>
                  <Link href="/career" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                    <span>Manage Skills</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Verified Technical Skills</div>
                  <div className="text-lg font-bold text-white font-mono">14 Validated</div>
                  <div className="text-[11px] text-cyan-400 mt-1">Python, TypeScript, FastAPI, pgvector</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Tailored Resumes</div>
                  <div className="text-lg font-bold text-white font-mono">3 Versions</div>
                  <div className="text-[11px] text-purple-400 mt-1">Grounded in verified master profile</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Active Pipeline</div>
                  <div className="text-lg font-bold text-white font-mono">5 Applications</div>
                  <div className="text-[11px] text-emerald-400 mt-1">2 Interviewing, 3 Ready</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "lifeos" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-semibold text-white">LifeOS Productivity Matrix</h4>
                  <p className="text-xs text-slate-400">Current Focus: Sprint 1 Architecture Review</p>
                </div>
                <Link href="/lifeos" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                  <span>Open Planner</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-xs font-medium text-slate-200">System Architecture & Schema Review</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">HIGH PRIORITY</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs font-medium text-slate-200">Personal Memory Knowledge Ingestion</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono">MEDIUM</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "brain" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-semibold text-white">Second Brain Knowledge Store</h4>
                  <p className="text-xs text-slate-400">7 Documents • 32 Semantic Vector Chunks</p>
                </div>
                <Link href="/second-brain" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                  <span>Explore Repository</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                Nexus AI answers questions grounded strictly in user documents. No hallucinations or unauthorized web leakage. Source sections are explicitly cited for complete auditability.
              </div>
            </div>
          )}

          {activeTab === "radar" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-semibold text-white">Opportunity Radar</h4>
                  <p className="text-xs text-slate-400">Recommended based on verified skills and goals</p>
                </div>
                <Link href="/radar" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                  <span>View All Opportunities</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Research Engineer — Multimodal AI</div>
                  <div className="text-[11px] text-slate-400">Google DeepMind • Bengaluru / Hybrid</div>
                </div>
                <span className="text-sm font-bold text-cyan-400 font-mono">94% Match</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- WHY NEXUS COMPARISON ---------------- */}
      <section id="comparison" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Why Nexus AI
          </h2>
          <h3 className="text-3xl font-bold text-white">
            Stop juggling 5 disjointed tools.
          </h3>
          <p className="text-slate-400 text-xs max-w-xl mx-auto mt-2">
            Traditional AI chatbots forget everything after you close the tab. Nexus AI is your permanent personal intelligence ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-4">
            <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-2">
              <span>✕ The Fragmented Way</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>Copy-pasting your resume into ChatGPT every time you need tailoring.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>Tasks in Notion, jobs on LinkedIn, study notes in Google Docs with zero cross-linking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>AI fabricating project achievements or fake metrics that fail in interviews.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 space-y-4">
            <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
              <span>✓ The Nexus AI Connected Way</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Verified CareerOS profile provides ground-truth for all resume customizations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Projects automatically reinforce skill evidence, which powers Opportunity Radar.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Personal Memory Engine remembers your preferences with explicit user control.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- PRICING TIERS ---------------- */}
      <section id="pricing" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="text-center mb-14">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Transparent Commercial Pricing
          </h2>
          <h3 className="text-3xl font-bold text-white">
            Predictable plans designed to scale with your growth.
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Sandbox mode active for initial testing. No unexpected credit card charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Explorer</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">₹0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <p className="text-xs text-slate-400">Essential personal intelligence tools for students and beginners.</p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>50 Monthly AI Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Basic LifeOS Planner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Up to 3 Second Brain Documents</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 text-center transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Plus Tier */}
          <div className="p-6 rounded-2xl border border-cyan-500/40 bg-slate-900/80 shadow-xl shadow-cyan-500/10 space-y-6 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">Nexus Plus</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">₹249</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400">Full career acceleration, resume tailoring, and knowledge chat.</p>
              <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>300 Monthly AI Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Resume Intelligence & ATS Scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>25 Second Brain Documents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Episodic Memory Retention</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-white text-center shadow-md shadow-cyan-500/20 transition-all"
            >
              Start Plus Trial
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs uppercase font-semibold text-purple-400 tracking-wider">Nexus Pro</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">₹599</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-400">Complete autonomous opportunity radar and priority AI workflows.</p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>1000 Monthly AI Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Smart Job Assisted Apply Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>100 Second Brain Documents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Full Career Roadmap Synthesis</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 text-center transition-colors"
            >
              Start Pro Trial
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-6 lg:px-12 py-10 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">NEXUS AI</span>
            <span>• Your Personal Intelligence. One Connected Workspace.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">Workspace</Link>
            <Link href="/login" className="hover:text-slate-300 transition-colors">Sign In</Link>
            <Link href="/settings" className="hover:text-slate-300 transition-colors">Privacy & Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
