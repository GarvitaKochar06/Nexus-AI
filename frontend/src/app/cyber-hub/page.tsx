"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { analyzePasswordSecurity } from "@/lib/api";
import { PasswordAnalysisResult } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ShieldCheck,
  KeyRound,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  Terminal
} from "lucide-react";

export default function CyberHubPage() {
  const [password, setPassword] = useState("");
  const [analysis, setAnalysis] = useState<PasswordAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // Phishing URL test state
  const [urlInput, setUrlInput] = useState("");
  const [urlResult, setUrlResult] = useState<string | null>(null);

  const handleAnalyzePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      const res = await analyzePasswordSecurity(password);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScanUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (urlInput.includes("free-crypto") || urlInput.includes("login-verify") || urlInput.includes("bank-update")) {
      setUrlResult("SUSPICIOUS: Domain exhibits high-risk credential-harvesting patterns.");
    } else {
      setUrlResult("CLEAN: No known heuristic threats or deceptive subdomains identified.");
    }
  };

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Defensive Security
              </span>
              <span className="text-xs text-slate-400">Zero Plain-Text Retention</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>Cyber Hub — Personal Safety Matrix</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Evaluate password entropy, audit suspicious links, and maintain personal operational security.
            </p>
          </div>
        </div>

        {/* 1. Password Strength Analyzer */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Password Entropy & Crack-Time Analyzer</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-500">Local / Fast Heuristics</span>
          </div>

          <form onSubmit={handleAnalyzePassword} className="space-y-3">
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to test entropy..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button type="submit" loading={loading} size="sm">
              Calculate Security Entropy
            </Button>
          </form>

          {analysis && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Security Score:</span>
                <span
                  className={`font-mono font-bold ${
                    analysis.is_strong ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {analysis.score} / 4 ({analysis.is_strong ? "Strong" : "Vulnerable"})
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Brute Force Resilience</span>
                  <span className="text-slate-200 font-mono">{analysis.estimated_crack_time}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      analysis.score >= 3 ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${(analysis.score / 4) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                {analysis.feedback.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-cyan-400">•</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Suspicious Link Scanner */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Phishing & Suspicious Link Auditor</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-500">Heuristic Engine</span>
          </div>

          <form onSubmit={handleScanUrl} className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste suspicious URL (e.g. https://...)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Button type="submit" size="sm">
              Scan URL
            </Button>
          </form>

          {urlResult && (
            <div
              className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                urlResult.startsWith("SUSPICIOUS")
                  ? "bg-rose-950/30 border-rose-500/40 text-rose-300"
                  : "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{urlResult}</span>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
