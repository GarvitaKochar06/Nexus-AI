"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, ArrowRight, ShieldCheck, AlertCircle, UserPlus } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      login(data);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-cyan-500 selection:text-black">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">NEXUS AI</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your connected intelligence workspace.
          </p>
        </div>

        {/* Quick Registration Helper Banner */}
        <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-300">
            <UserPlus className="w-4 h-4 text-cyan-400" />
            <span>New here? Free 50 AI credits on signup</span>
          </div>
          <Link
            href="/signup"
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-semibold transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full text-xs font-semibold py-2.5 mt-2"
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Create an account
            </Link>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Encrypted with SHA-256 JWT & multi-tenant user isolation.</span>
        </p>
      </div>
    </div>
  );
}
