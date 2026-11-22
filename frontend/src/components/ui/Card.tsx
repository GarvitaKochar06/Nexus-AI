import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "cyan" | "purple" | "emerald" | "none";
}

export function Card({ className, glow = "none", children, ...props }: CardProps) {
  const glowStyles = {
    none: "border-slate-800/80 bg-slate-900/60",
    cyan: "border-cyan-500/30 bg-slate-900/80 shadow-lg shadow-cyan-500/5",
    purple: "border-purple-500/30 bg-slate-900/80 shadow-lg shadow-purple-500/5",
    emerald: "border-emerald-500/30 bg-slate-900/80 shadow-lg shadow-emerald-500/5",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-xl transition-all duration-200",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-semibold text-slate-100", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-slate-400 mt-1", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-3", className)} {...props}>
      {children}
    </div>
  );
}
