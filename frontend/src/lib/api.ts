import { DashboardOverview, PasswordAnalysisResult } from "@/types";

const API_BASE = `${(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "").replace(/\/api\/v1$/, "")}/api/v1`;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("nexus_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
}

// ---------------- AUTHENTICATION ----------------
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(err.detail || "Invalid credentials");
  }
  return await res.json();
}

export async function registerUser(email: string, password: string, fullName: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name: fullName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Registration failed" }));
    throw new Error(err.detail || "Registration failed");
  }
  return await res.json();
}

// ---------------- DASHBOARD ----------------
export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  try {
    const res = await fetch(`${API_BASE}/dashboard/overview`, {
      headers: getHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using fallback state:", err);
    return {
      user_name: "Alex Vance",
      subscription_tier: "Nexus Pro (Trial)",
      metrics: {
        ai_credits_available: 85,
        active_tasks_count: 3,
        career_skills_count: 14,
        saved_applications_count: 5,
        streak_days: 12,
        ats_average_score: 88,
        system_readiness_pct: 94,
      },
      quick_stats: {
        memory_count: 18,
        documents_indexed: 7,
        interviews_scheduled: 2,
        active_habits: 4,
      },
      recent_activities: [
        {
          id: "act-1",
          category: "career",
          title: "Resume Tailored for Senior AI Engineer",
          description: "Generated ATS-compliant resume with 92% match score for DeepMind.",
          timestamp: "15m ago",
          status: "completed",
        },
        {
          id: "act-2",
          category: "memory",
          title: "Saved Learning Goal to Memory",
          description: "Knowledge Engine indexed interest in Rust and Distributed Systems.",
          timestamp: "1h ago",
          status: "verified",
        },
      ],
      top_opportunities: [
        {
          id: "opp-1",
          company_name: "Google DeepMind",
          job_title: "Research Engineer — Multimodal AI",
          match_score: 94,
          location: "Bengaluru / Hybrid",
          deadline: "15 Dec 2026",
          required_skills: ["Python", "PyTorch", "Transformers"],
        },
        {
          id: "opp-2",
          company_name: "Anthropic",
          job_title: "Full Stack Systems Engineer",
          match_score: 89,
          location: "Remote",
          deadline: "20 Dec 2026",
          required_skills: ["TypeScript", "Next.js", "FastAPI"],
        },
      ],
      ai_greeting: "Welcome to Nexus AI. Your connected workspace is online.",
      last_synced: new Date().toISOString(),
    };
  }
}

// ---------------- LIFEOS TASKS ----------------
export async function fetchLifeOSTasks() {
  const res = await fetch(`${API_BASE}/lifeos/tasks`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch LifeOS tasks");
  return await res.json();
}

export async function createLifeOSTask(task: {
  title: string;
  description?: string;
  priority?: string;
  estimated_minutes?: number;
}) {
  const res = await fetch(`${API_BASE}/lifeos/tasks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return await res.json();
}

export async function updateLifeOSTask(taskId: string, update: { status?: string; title?: string }) {
  const res = await fetch(`${API_BASE}/lifeos/tasks/${taskId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(update),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
}

// ---------------- CAREEROS SKILLS ----------------
export async function fetchCareerSkills() {
  const res = await fetch(`${API_BASE}/career/skills`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return await res.json();
}

// ---------------- MEMORY ENGINE ----------------
export async function fetchMemories() {
  const res = await fetch(`${API_BASE}/memory/`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch memories");
  return await res.json();
}

export async function createMemory(category: string, content: string) {
  const res = await fetch(`${API_BASE}/memory/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ category, content, source: "user_ui" }),
  });
  if (!res.ok) throw new Error("Failed to save memory");
  return await res.json();
}

export async function deleteMemory(memoryId: string) {
  const res = await fetch(`${API_BASE}/memory/${memoryId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete memory");
  return await res.json();
}

// ---------------- BILLING & PLANS ----------------
export async function fetchBillingPlans() {
  const res = await fetch(`${API_BASE}/billing/plans`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch plans");
  return await res.json();
}

export async function fetchWallet() {
  const res = await fetch(`${API_BASE}/billing/wallet`, {
    headers: getHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch wallet");
  return await res.json();
}

// ---------------- CYBER HUB ----------------
export async function analyzePasswordSecurity(password: string): Promise<PasswordAnalysisResult> {
  const res = await fetch(`${API_BASE}/cyber-hub/password-analyzer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("Failed to analyze password");
  return await res.json();
}
