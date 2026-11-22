"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  Zap,
  Info,
  CheckCircle2,
  Lock
} from "lucide-react";

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
}

interface ChatMessage {
  id: string;
  sender: "user" | "nexus";
  text: string;
  timestamp: string;
}

export function AIChatDrawer({ isOpen, onClose, credits }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "nexus",
      text: "Hello Alex. I am your Nexus AI Personal Operating System. I have indexed your career goals, active tasks in LifeOS, and your verified skills (Python, TypeScript, FastAPI). What can we advance together today?",
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    const prompt = input;
    setInput("");
    setIsTyping(true);

    // Context-aware intelligent response
    setTimeout(() => {
      let reply = "I analyzed your query across your connected workspace.";
      if (prompt.toLowerCase().includes("resume") || prompt.toLowerCase().includes("job")) {
        reply = "I retrieved your master resume and active application targets. Your profile has an 88% average ATS score. I recommend optimizing the 'Distributed Systems' bullet point under your latest project to increase match relevance.";
      } else if (prompt.toLowerCase().includes("task") || prompt.toLowerCase().includes("plan")) {
        reply = "Looking at LifeOS: You have 3 priority tasks scheduled for today. Would you like me to block out a 45-minute focus window at 3:00 PM for 'Architecture Review'?";
      } else {
        reply = `Understood. I have recorded this inquiry in your episodic memory context. You currently have ${credits} AI credits available.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `n-${Date.now()}`,
          sender: "nexus",
          text: reply,
          timestamp: "Just now"
        }
      ]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Nexus Assistant
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                Flash 2.0
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">Context Connected: Memory, LifeOS, CareerOS</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Credit cost notice */}
      <div className="bg-slate-900/60 px-6 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Consumes 1 AI credit per query</span>
        </span>
        <span className="font-mono text-slate-200">{credits} remaining</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 text-xs leading-relaxed ${
              m.sender === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                m.sender === "user"
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "bg-cyan-600/30 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`p-3.5 rounded-2xl max-w-[80%] ${
                m.sender === "user"
                  ? "bg-violet-950/40 text-violet-100 border border-violet-500/30 rounded-tr-none"
                  : "bg-slate-900/80 text-slate-200 border border-slate-800 rounded-tl-none"
              }`}
            >
              {m.text}
              <div className="text-[10px] text-slate-500 mt-1.5 text-right">{m.timestamp}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 text-xs items-center text-slate-400">
            <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse">
              Nexus AI is connecting context...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything across your career, tasks, or documents..."
            className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-md shadow-cyan-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-600 text-center mt-2">
          Grounded by Personal Memory Engine with strict privacy boundaries.
        </p>
      </div>
    </div>
  );
}
