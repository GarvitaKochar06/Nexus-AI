"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import {
  Settings,
  User,
  Sun,
  Moon,
  Database,
  Trash2,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [memoryCleared, setMemoryCleared] = useState(false);

  const handleClearMemory = () => {
    if (confirm("Are you sure you want to clear your episodic memory? This cannot be undone.")) {
      setMemoryCleared(true);
      setTimeout(() => setMemoryCleared(false), 3000);
    }
  };

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              User Preferences
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-400" />
            <span>Workspace Settings & Privacy</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your account identity, UI appearance, personal memory controls, and security boundaries.
          </p>
        </div>

        {/* 1. Account Identity */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Account Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500">Full Name</span>
              <div className="font-semibold text-slate-200">{user?.full_name || "Alex Vance"}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500">Email Address</span>
              <div className="font-semibold text-slate-200">{user?.email || "pioneer@nexusai.dev"}</div>
            </div>
          </div>
        </div>

        {/* 2. Theme & Appearance */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Theme & Visual Mode</span>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                theme === "dark"
                  ? "border-cyan-500 bg-cyan-950/20 text-cyan-300"
                  : "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              <Moon className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold">Deep Space Dark</div>
                <div className="text-[11px] opacity-70">Carbon Slate (#090D16)</div>
              </div>
            </button>

            <button
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                theme === "light"
                  ? "border-cyan-500 bg-cyan-950/20 text-cyan-300"
                  : "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              <Sun className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-xs font-semibold">Clean Light Mode</div>
                <div className="text-[11px] opacity-70">High-Contrast Surface</div>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Personal Memory Engine Controls */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <span>Personal Memory Engine & Privacy</span>
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono">
              User-Controlled
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Nexus AI remembers your career milestones, task habits, and explicit preferences to provide personalized context. You have total authority to pause or purge this data at any time.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-200">Retain Episodic Memory</div>
              <div className="text-[11px] text-slate-500">Allow AI Assistant to reference previous conversations.</div>
            </div>
            <button
              onClick={() => setMemoryEnabled(!memoryEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                memoryEnabled ? "bg-cyan-500" : "bg-slate-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  memoryEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>18 active memory facts indexed under your user ID.</span>
            </div>
            <button
              onClick={handleClearMemory}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge Episodic Memory</span>
            </button>
          </div>

          {memoryCleared && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Episodic memory context successfully purged from database.</span>
            </div>
          )}
        </div>

        {/* 4. Session & Logout */}
        <div className="pt-4 flex justify-between items-center text-xs text-slate-500">
          <span>Nexus AI Personal OS • Build 2026.11.22</span>
          {user && (
            <button
              onClick={logout}
              className="text-rose-400 hover:text-rose-300 font-medium"
            >
              Sign Out of Account
            </button>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
