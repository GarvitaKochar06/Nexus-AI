"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Brain,
  Sparkles,
  CalendarDays,
  Briefcase,
  FileText,
  Send,
  BookOpen,
  FolderKanban,
  Radar,
  ShieldCheck,
  CreditCard,
  Settings,
  ChevronRight,
  Database,
  LogOut
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  category?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", href: "/assistant", icon: Sparkles, badge: "Core" },
  { name: "CareerOS", href: "/career", icon: Briefcase },
  { name: "LifeOS Planner", href: "/lifeos", icon: CalendarDays },
  { name: "Second Brain", href: "/second-brain", icon: Brain },
  { name: "Learning Hub", href: "/learning", icon: BookOpen },
  { name: "Project Hub", href: "/projects", icon: FolderKanban },
  { name: "Opportunity Radar", href: "/radar", icon: Radar, badge: "Live" },
  { name: "Cyber Hub", href: "/cyber-hub", icon: ShieldCheck },
  { name: "Billing & Plans", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-300 to-white bg-clip-text text-transparent">
            NEXUS AI
          </span>
          <span className="block text-[10px] text-slate-400 tracking-wider font-medium uppercase">
            Personal OS
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Workspace Modules
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Subscription Tier Pill */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/30">
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 mb-2">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-cyan-300">Nexus Pro</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
              85 CR
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
            15% credits consumed this cycle.
          </p>
          <Link
            href="/billing"
            className="flex items-center justify-between text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Manage Plans</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* User Signout Button */}
        {user && (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out ({user.email})</span>
          </button>
        )}
      </div>
    </aside>
  );
}
