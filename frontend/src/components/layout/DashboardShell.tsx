"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { AIChatDrawer } from "@/components/chat/AIChatDrawer";

interface DashboardShellProps {
  children: React.ReactNode;
  credits?: number;
}

export function DashboardShell({ children, credits = 85 }: DashboardShellProps) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#090D16]">
      {/* Sticky Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav onOpenAIChat={() => setIsAIChatOpen(true)} credits={credits} />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Collapsible AI Assistant Flyout Drawer */}
      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        credits={credits}
      />
    </div>
  );
}
