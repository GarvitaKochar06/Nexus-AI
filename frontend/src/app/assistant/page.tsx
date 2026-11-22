"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Sparkles, Send, Bot, User, Zap, Database, Briefcase, Calendar, ShieldCheck } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  groundedIn?: string[];
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "assistant",
      content:
        "Greetings. I am Nexus AI Core — your unified intelligence layer. I am grounded in your verified CareerOS profile (14 skills, AI Architecture focus), your active LifeOS schedule, and your personal episodic memory. How can I advance your priorities today?",
      timestamp: "Just now",
      groundedIn: ["CareerOS", "LifeOS", "Personal Memory"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const credits = 85;

  const handleSend = (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      content: prompt,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I synthesized your query using your connected workspace context.";
      let sources = ["Nexus Core"];

      const lower = prompt.toLowerCase();
      if (lower.includes("skill") || lower.includes("gap") || lower.includes("career")) {
        reply =
          "According to your CareerOS profile, you have verified proficiency in Python, FastAPI, and TypeScript (Level 4-5). Comparing this with the latest Opportunity Radar positions at DeepMind and Anthropic, your primary skill gap is in 'Distributed Consensus (Raft/Paxos)' and 'vLLM Kernel Optimization'. Would you like me to schedule a targeted study path in Learning Hub?";
        sources = ["CareerOS", "Opportunity Radar"];
      } else if (lower.includes("task") || lower.includes("focus") || lower.includes("schedule")) {
        reply =
          "In LifeOS, you currently have 3 open tasks. I can block out an uninterrupted 90-minute focus window at 2:30 PM today for 'System Architecture Review' and set a recurring habit reminder. Should I create this in your planner?";
        sources = ["LifeOS Planner"];
      } else if (lower.includes("resume") || lower.includes("ats")) {
        reply =
          "Your master resume scores 88% average across target roles. To increase relevance for High-Scale Backend roles without fabricating experience, we should emphasize your FastAPI and PostgreSQL pgvector integration in the project section.";
        sources = ["Resume Intelligence Engine"];
      } else {
        reply = `Understood. I have recorded your instruction and verified it against your user-approved privacy settings. 1 credit has been deducted from your sandbox balance.`;
        sources = ["Personal Memory Engine"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: "assistant",
          content: reply,
          timestamp: "Just now",
          groundedIn: sources,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const PROMPT_SUGGESTIONS = [
    {
      title: "Analyze Career Skill Gaps",
      prompt: "Analyze my verified skills in CareerOS and identify gaps for Senior AI Engineer positions.",
      icon: Briefcase,
    },
    {
      title: "Plan LifeOS Focus Window",
      prompt: "Schedule a 90-minute focus session in LifeOS for architecture refinement.",
      icon: Calendar,
    },
    {
      title: "Optimize Master Resume",
      prompt: "Review my resume bullet points and suggest truthful ATS keyword enhancements.",
      icon: Sparkles,
    },
  ];

  return (
    <DashboardShell credits={credits}>
      <div className="flex flex-col h-[calc(100vh-130px)] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Assistant Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                Nexus AI Conversational Core
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  Gemini 2.0 Flash
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Ground-truth connected to your database with strict user authorization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>1 credit / turn</span>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 text-xs leading-relaxed max-w-3xl ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  m.sender === "user"
                    ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                    : "bg-cyan-600/30 text-cyan-300 border border-cyan-500/30"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl space-y-2 ${
                  m.sender === "user"
                    ? "bg-violet-950/40 text-violet-100 border border-violet-500/30 rounded-tr-none"
                    : "bg-slate-900/80 text-slate-200 border border-slate-800 rounded-tl-none"
                }`}
              >
                <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">{m.content}</div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    {m.groundedIn?.map((src) => (
                      <span
                        key={src}
                        className="px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700 font-mono"
                      >
                        ✓ {src}
                      </span>
                    ))}
                  </div>
                  <span>{m.timestamp}</span>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 text-xs items-center text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 animate-pulse">
                Nexus AI is reasoning across connected modules...
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Starter Chips */}
        {messages.length <= 2 && (
          <div className="px-6 py-2 border-t border-slate-800/60 bg-slate-900/30 flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything grounded in your career, tasks, notes, or memories..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Episodic Memory & Knowledge Graph verified. Never used for public training.</span>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
