"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/types";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const roles = [
    { role: "farmer", title: "Farmer", desc: "List produce and connect with buyers" },
    { role: "buyer", title: "Buyer", desc: "Source quality produce for your business" },
    { role: "agent", title: "Marketing Agent", desc: "Aggregate and connect farmers to buyers" },
    { role: "exporter", title: "Exporter", desc: "Find export-quality commodities" },
  ];

  const handleLogin = async () => {
    if (!selectedRole) return;
    await login(selectedRole as UserRole);
    router.push(`/${selectedRole}/dashboard`);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: "var(--cream)" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>farm<span style={{ color: "var(--orange)" }}>to</span>money</div>
          <p style={{ color: "#708077", fontSize: "14px" }}>Select your role to continue</p>
        </div>
        <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
          {roles.map(r => (
            <button key={r.role} onClick={() => setSelectedRole(r.role)} style={{ padding: "18px", border: selectedRole === r.role ? "2px solid var(--green)" : "1px solid var(--line)", borderRadius: "10px", background: "white", textAlign: "left", cursor: "pointer", transition: "all .15s" }}>
              <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px", color: selectedRole === r.role ? "var(--green)" : "var(--ink)" }}>{r.title}</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>{r.desc}</div>
            </button>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: "100%", padding: "14px", fontSize: "15px", justifyContent: "center" }} onClick={handleLogin} disabled={!selectedRole}>
          Continue
        </button>
      </div>
    </div>
  );
}
