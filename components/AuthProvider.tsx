"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (selectedRole: UserRole) => {
    const mockUsers: Record<UserRole, User> = {
      farmer: { id: "current-farmer", role: "farmer", name: "Adebayo Ogundimu", email: "adebayo@farm.com", phone: "+234 803 123 4567", state: "Oyo", lga: "Iseyin", verificationLevel: "trade_verified", rating: 4.8, joinedDate: "2025-03-15" },
      buyer: { id: "current-buyer", role: "buyer", name: "Lagos Foods & Beverages", email: "procurement@lagosfoods.ng", phone: "+234 901 111 2222", state: "Lagos", lga: "Apapa", verificationLevel: "business_verified", rating: 4.8, joinedDate: "2024-12-01" },
      agent: { id: "current-agent", role: "agent", name: "Lagos Agro Services Ltd", email: "info@lagosagro.ng", phone: "+234 801 111 2222", state: "Lagos", lga: "Lagos Mainland", verificationLevel: "trusted", rating: 4.7, joinedDate: "2024-09-01" },
      exporter: { id: "current-exporter", role: "exporter", name: "West Africa Export Ltd", email: "exports@wael.ng", phone: "+234 904 111 2222", state: "Lagos", lga: "Lagos Island", verificationLevel: "trusted", rating: 4.9, joinedDate: "2024-08-20" },
      admin: { id: "current-admin", role: "admin", name: "Admin User", email: "admin@farmtomoney.ng", phone: "+234 900 000 0000", state: "Lagos", lga: "Lagos Island", verificationLevel: "trusted", rating: 5.0, joinedDate: "2024-01-01" },
    };
    setUser(mockUsers[selectedRole]);
    setRole(selectedRole);
  };

  const logout = () => {
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
