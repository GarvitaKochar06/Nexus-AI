"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface UserSession {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (tokenData: { access_token: string; user_id: string; email: string; full_name: string; role: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nexus_session");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load auth session from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (tokenData: { access_token: string; user_id: string; email: string; full_name: string; role: string }) => {
    const session: UserSession = {
      user_id: tokenData.user_id,
      email: tokenData.email,
      full_name: tokenData.full_name,
      role: tokenData.role,
      token: tokenData.access_token,
    };
    setUser(session);
    localStorage.setItem("nexus_session", JSON.stringify(session));
    localStorage.setItem("nexus_token", tokenData.access_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexus_session");
    localStorage.removeItem("nexus_token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
