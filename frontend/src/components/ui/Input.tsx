import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-colors disabled:opacity-50",
          error && "border-rose-500/80 focus:border-rose-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-rose-400">{error}</p>}
    </div>
  );
}
