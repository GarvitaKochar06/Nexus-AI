"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import {
  Brain,
  UploadCloud,
  FileText,
  Search,
  Sparkles,
  Database,
  Layers,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function SecondBrainPage() {
  const [documents, setDocuments] = useState([
    {
      id: "doc-1",
      name: "Distributed_Systems_Patterns.pdf",
      size: "2.4 MB",
      chunks: 14,
      uploadedAt: "Yesterday",
      status: "Indexed",
    },
    {
      id: "doc-2",
      name: "Nexus_AI_Product_Architecture.md",
      size: "48 KB",
      chunks: 6,
      uploadedAt: "2 days ago",
      status: "Indexed",
    },
    {
      id: "doc-3",
      name: "Multimodal_Transformers_Research.pdf",
      size: "5.1 MB",
      chunks: 28,
      uploadedAt: "5 days ago",
      status: "Indexed",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [queryAnswer, setQueryAnswer] = useState<string | null>(null);

  const handleSimulateRAG = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setQueryAnswer(
      `Grounded in 'Nexus_AI_Product_Architecture.md' (Section 3) and 'Distributed_Systems_Patterns.pdf':
      "Nexus AI isolates all user memories with query-level user_id multi-tenancy. Vector chunks are indexed with 768-dimension embeddings, enabling strict semantic citation without public model training leakage."`
    );
  };

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Knowledge Retrieval
              </span>
              <span className="text-xs text-slate-400">pgvector Semantic Embeddings</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              <span>Second Brain Knowledge Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Upload documents, presentations, and notes for grounded Q&A with strict source citations.
            </p>
          </div>
        </div>

        {/* Knowledge Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="text-xs text-slate-400 mb-1">Indexed Documents</div>
            <div className="text-xl font-bold text-white font-mono">3 Uploaded</div>
            <div className="text-[11px] text-cyan-400 mt-1">PDF, Markdown & Notes</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="text-xs text-slate-400 mb-1">Semantic Vector Chunks</div>
            <div className="text-xl font-bold text-white font-mono">48 Chunks</div>
            <div className="text-[11px] text-purple-400 mt-1">Embedded with pgvector</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="text-xs text-slate-400 mb-1">Security Boundary</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">Zero Training</div>
            <div className="text-[11px] text-slate-400 mt-1">Private multi-tenant isolation</div>
          </div>
        </div>

        {/* Upload Dropzone */}
        <div className="p-8 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-950/40 transition-colors text-center space-y-3 cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">
              Drag & Drop your notes, research papers, or PDFs
            </div>
            <p className="text-xs text-slate-500 mt-1">Supports PDF, MD, TXT, DOCX up to 25MB.</p>
          </div>
          <Button size="sm" variant="secondary" className="text-xs">
            Browse Local Files
          </Button>
        </div>

        {/* Grounded Semantic Search Simulation */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Grounded Document Q&A (RAG)</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">2 credits / query</span>
          </div>

          <form onSubmit={handleSimulateRAG} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask any question across your uploaded repository..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <Button type="submit" size="sm">
              Ask Second Brain
            </Button>
          </form>

          {queryAnswer && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2 text-xs leading-relaxed animate-in fade-in">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Grounded Retrieval Result:</span>
              </div>
              <p className="text-slate-300">{queryAnswer}</p>
            </div>
          )}
        </div>

        {/* Uploaded Documents List */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white">Repository Catalog</h2>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="font-semibold text-slate-200">{doc.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {doc.size} • {doc.chunks} Vector Chunks
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
