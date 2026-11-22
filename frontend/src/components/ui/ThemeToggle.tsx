"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all flex items-center gap-2 text-xs"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline text-slate-400">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline text-slate-600">Dark</span>
        </>
      )}
    </button>
  );
}
