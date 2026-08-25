"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data?.user) {
          setUser(data.user);
          setRole(data.user.role);
        }
      })
      .catch(() => undefined);
  }, []);

  const login = async (selectedRole: UserRole) => {
    const demoEmails: Record<UserRole, string> = {
      farmer: "adebayo@farm.com",
      buyer: "procurement@lagosfoods.ng",
      agent: "info@lagosagro.ng",
      exporter: "exports@wael.ng",
      admin: "admin@farmtomoney.ng",
    };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: demoEmails[selectedRole] }),
    });
    if (!response.ok) throw new Error("Login failed");
    const data = await response.json();
    setUser(data.user);
    setRole(data.user.role);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
