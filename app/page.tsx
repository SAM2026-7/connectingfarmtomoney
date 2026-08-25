"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRole } from "@/lib/types";

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    { role: "farmer" as const, title: "Farmer", desc: "List your produce and connect with buyers across Nigeria.", color: "#2d654d" },
    { role: "buyer" as const, title: "Buyer", desc: "Source quality produce from verified farmers and agents.", color: "#1e4d8c" },
    { role: "agent" as const, title: "Marketing Agent", desc: "Aggregate produce and connect farmers to large buyers.", color: "#7a4e1e" },
    { role: "exporter" as const, title: "Exporter", desc: "Find export-quality commodities and manage orders.", color: "#5e1e4d" },
  ];

  const handleRoleClick = async (role: string) => {
    setLoading(true);
    setFeedback("");
    try {
      await new Promise(r => setTimeout(r, 300));
      login(role as UserRole);
      setFeedback(`Welcome! Redirecting to ${role} dashboard...`);
      setTimeout(() => {
        router.push(`/${role}/dashboard`);
      }, 800);
    } catch {
      setFeedback("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="brand">
          <span className="leaf-mark">✦</span>
          <span>farm<span className="brand-accent">to</span>money</span>
        </div>
        <p className="tagline">Nigeria&apos;s Agricultural Marketplace</p>
      </header>

      <main className="landing-main">
        <div className="hero">
          <h1>Better produce.<br /><em>Better business.</em></h1>
          <p>Connect farmers, agents, buyers, and exporters in one trusted marketplace.</p>
          <div className="role-grid">
            {roles.map((r) => (
              <button
                key={r.role}
                className="role-card"
                onClick={() => handleRoleClick(r.role)}
                disabled={loading}
                style={{ "--card-color": r.color } as React.CSSProperties}
              >
                <div className="role-icon" style={{ background: r.color }}>
                  {r.role === "farmer" ? "🌾" : r.role === "buyer" ? "🛒" : r.role === "agent" ? "🤝" : "✈️"}
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </button>
            ))}
          </div>
          <div className="admin-link">
            <button onClick={() => handleRoleClick("admin")} className="admin-btn" disabled={loading}>
              Admin Access
            </button>
          </div>
          {feedback && (
            <div style={{
              marginTop: "24px",
              padding: "12px 20px",
              background: "#2d654d",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
              display: "inline-block",
              animation: "rise .3s ease-out"
            }}>
              {feedback}
            </div>
          )}
        </div>
      </main>

      <footer className="landing-footer">
        <p>© 2026 FarmToMoney. Built for Nigerian agriculture.</p>
      </footer>
    </div>
  );
}
