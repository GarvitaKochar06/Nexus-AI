import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "purple" | "emerald" | "amber" | "rose" | "slate";
}

export function Badge({ className, variant = "cyan", children, ...props }: BadgeProps) {
  const variants = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
