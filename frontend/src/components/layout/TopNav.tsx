"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Search,
  Bell,
  Coins,
  Sparkles,
  Command,
  User,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface TopNavProps {
  onOpenAIChat?: () => void;
  credits?: number;
}

export function TopNav({ onOpenAIChat, credits = 85 }: TopNavProps) {
  const [hasNotification, setHasNotification] = useState(true);
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Global Command / Search Trigger */}
      <div className="flex items-center gap-3 w-72 sm:w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search modules, career, or notes... (Ctrl+K)"
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-12 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <kbd className="hidden sm:inline absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions: Health, AI Credits, Theme, Assistant, User */}
      <div className="flex items-center gap-2.5">
        {/* System Health Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Core Connected</span>
        </div>

        {/* AI Credit Wallet */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline text-slate-400">Credits:</span>
          <span className="font-semibold text-slate-100 font-mono">{credits}</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAIChat}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask Nexus AI</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setHasNotification(false)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {hasNotification && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
          )}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px]">
            <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-xs font-bold text-cyan-300">
              {user ? user.full_name.substring(0, 2).toUpperCase() : "AV"}
            </div>
          </div>
          <div className="hidden xl:block text-left text-xs">
            <div className="font-medium text-slate-200">{user?.full_name || "Alex Vance"}</div>
            <div className="text-[10px] text-slate-500">{user?.role === "pro" ? "Pro Member" : "Pioneer User"}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
