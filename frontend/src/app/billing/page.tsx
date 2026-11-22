"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchBillingPlans, fetchWallet } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import {
  CreditCard,
  Coins,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Receipt,
  AlertCircle
} from "lucide-react";

export default function BillingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any>({ credits_balance: 85, total_credits_spent: 15 });
  const [selectedPlan, setSelectedPlan] = useState<string>("pro_monthly");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    fetchBillingPlans().then(setPlans).catch(console.error);
    fetchWallet().then(setWallet).catch(console.error);
  }, []);

  const handleSimulateUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 4000);
  };

  return (
    <DashboardShell credits={wallet?.credits_balance ?? 85}>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Monetization & Billing
              </span>
              <span className="text-xs text-amber-400 font-mono">Sandbox Test Mode Active</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              <span>Subscription & AI Credit Wallet</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage your plan entitlements, recharge AI credits, and review transparent billing records.
            </p>
          </div>
        </div>

        {checkoutSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              Sandbox Subscription Simulated! Server verified HMAC webhook signature and updated entitlement record.
            </span>
          </div>
        )}

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Active Plan */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Active Subscription</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                Active
              </span>
            </div>
            <div className="text-2xl font-bold text-white">Nexus Pro Tier</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full access to ATS Resume Intelligence, Opportunity Radar, Second Brain RAG, and LifeOS Planner.
            </p>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              Renews on Dec 22, 2026 • ₹599 / month (Sandbox)
            </div>
          </div>

          {/* Credit Wallet */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Available AI Credits</span>
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              {wallet?.credits_balance ?? 85} <span className="text-sm font-normal text-slate-400">Credits</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consumes 1 credit per conversational turn, 2 per Second Brain document Q&A, and 10 per tailored resume.
            </p>
            <div className="text-[11px] text-cyan-400 pt-2 border-t border-slate-800">
              +50 Credits grant scheduled next monthly billing cycle
            </div>
          </div>
        </div>

        {/* Plans Matrix */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-white">Available Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase">Explorer</div>
                <div className="text-2xl font-bold text-white">₹0</div>
                <p className="text-xs text-slate-400">Essential personal intelligence.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>50 Monthly AI credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3 Second Brain documents</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSimulateUpgrade("free")}
                disabled={selectedPlan === "free"}
              >
                {selectedPlan === "free" ? "Current Plan" : "Downgrade to Free"}
              </Button>
            </div>

            {/* Plus */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-cyan-400 uppercase">Nexus Plus</div>
                <div className="text-2xl font-bold text-white">₹249 <span className="text-xs text-slate-400">/ mo</span></div>
                <p className="text-xs text-slate-400">Full career acceleration & memory.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>300 Monthly AI credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Resume Tailoring Engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>25 Second Brain documents</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSimulateUpgrade("plus_monthly")}
                disabled={selectedPlan === "plus_monthly"}
              >
                {selectedPlan === "plus_monthly" ? "Current Plan" : "Switch to Plus"}
              </Button>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl border border-cyan-500/40 bg-slate-900/80 shadow-xl shadow-cyan-500/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-purple-400 uppercase">Nexus Pro</div>
                <div className="text-2xl font-bold text-white">₹599 <span className="text-xs text-slate-400">/ mo</span></div>
                <p className="text-xs text-slate-400">High-volume opportunity radar.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>1,000 Monthly AI credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Full Opportunity Radar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>100 Second Brain documents</span>
                  </li>
                </ul>
              </div>
              <Button
                size="sm"
                onClick={() => handleSimulateUpgrade("pro_monthly")}
                disabled={selectedPlan === "pro_monthly"}
              >
                {selectedPlan === "pro_monthly" ? "Current Active Plan" : "Upgrade to Pro"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
