"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { registerUser } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await registerUser(email, password, fullName);
      login(data);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-cyan-500 selection:text-black">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">NEXUS AI</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create your account
          </h1>
          <p className="text-xs text-slate-400">
            Start building your connected personal intelligence ecosystem.
          </p>
        </div>

        {/* Signup Form */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <Input
              id="name"
              label="Full Name"
              type="text"
              placeholder="e.g. Alex Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

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
              label="Password (min. 8 characters)"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
              <div className="text-slate-300 font-medium">Free plan benefits:</div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>50 Free AI credits granted instantly on signup</span>
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full text-xs font-semibold py-2.5 mt-2"
            >
              Register & Launch Workspace
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign In
            </Link>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Your data is strictly isolated and never used for public training.</span>
        </p>
      </div>
    </div>
  );
}
