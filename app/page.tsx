"use client";

import { useAuth } from "@/components/AuthProvider";
import VisitorLoginForm from "@/components/VisitorLoginForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRole } from "@/lib/types";

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible] = useState(true);
  const [visitorSignedIn, setVisitorSignedIn] = useState(false);

  useEffect(() => {
    fetch("/api/visitors/me")
      .then(response => response.ok ? response.json() : null)
      .then(data => { setVisitorSignedIn(!!data?.signedIn); })
      .catch(() => undefined);
  }, []);

  const roles = [
    { role: "farmer" as const, title: "Farmer", desc: "List your produce and connect with buyers across Nigeria.", color: "#1f7a4d", image: "https://images.unsplash.com/photo-1595854775527-69a8a4470e2c?auto=format&fit=crop&w=600&q=80", icon: "🌾", stats: "12,000+ Farmers" },
    { role: "buyer" as const, title: "Buyer", desc: "Source quality produce from verified farmers and agents.", color: "#1e4d8c", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80", icon: "🛒", stats: "5,000+ Buyers" },
    { role: "agent" as const, title: "Marketing Agent", desc: "Aggregate produce and connect farmers to large buyers.", color: "#7a4e1e", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", icon: "🤝", stats: "1,200+ Agents" },
    { role: "exporter" as const, title: "Exporter", desc: "Find export-quality commodities and manage orders.", color: "#9bcf8a", image: "https://images.unsplash.com/photo-1576582527649-d162a3e333e9?auto=format&fit=crop&w=600&q=80", icon: "✈️", stats: "300+ Exporters" },
  ];

  const canAccessApp = visitorSignedIn;

  const handleRoleClick = async (role: string) => {
    if (!canAccessApp) return;
    setLoading(true);
    setFeedback("");
    try {
      await new Promise(r => setTimeout(r, 400));
      login(role as UserRole);
      setFeedback(`Welcome! Redirecting to ${role} dashboard...`);
      setTimeout(() => {
        router.push(`/${role}/dashboard`);
      }, 1000);
    } catch {
      setFeedback("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="particles" id="particles">
        {[8, 21, 34, 47, 60, 73, 86, 14, 28, 42, 56, 68, 79, 91, 3].map((position, i) => (
          <div key={i} className="particle" style={{
            left: `${position}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${15 + (i % 5)}s`
          }} />
        ))}
      </div>

      <header className={`landing-header ${isVisible ? "visible" : ""}`}>
        <div className="brand">
          <span className="leaf-mark">✦</span>
          <span>farm<span className="brand-accent">to</span>money</span>
        </div>
        <div className="header-actions">
          <button onClick={() => handleRoleClick("admin")} className="header-btn" disabled={!canAccessApp}>
            Admin
          </button>
          <button onClick={() => (canAccessApp ? router.push("/login") : undefined)} className="header-btn primary" disabled={!canAccessApp}>
            Get Started
          </button>
        </div>
      </header>

      <main className="landing-main">
        <div className="hero">
          <div className="hero-content">
            <div className={`hero-badge ${isVisible ? "visible" : ""}`}>
              <span className="live-dot" /> Nigeria&apos;s #1 Agricultural Marketplace
            </div>
            <h1 className={`hero-title ${isVisible ? "visible" : ""}`}>
              Better produce.<br />
              <em>Better business.</em>
            </h1>
            <p className={`hero-subtitle ${isVisible ? "visible" : ""}`}>
              Connect farmers, agents, buyers, and exporters in one trusted marketplace.
              Verified suppliers, fair prices, secure transactions.
            </p>

            <div className={`stats-bar ${isVisible ? "visible" : ""}`}>
              <div className="stat-item">
                <div className="stat-number" data-count="15000">0</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-number" data-count="8500">0</div>
                <div className="stat-label">Produce Listings</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-number" data-count="3200">0</div>
                <div className="stat-label">Transactions</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-number" data-count="36">0</div>
                <div className="stat-label">States Covered</div>
              </div>
            </div>

            <div className={`role-grid ${isVisible ? "visible" : ""}`} style={{ position: "relative" }}>
              {roles.map((r, i) => (
                <button
                  key={r.role}
                  className={`role-card role-${r.role}`}
                  onClick={() => handleRoleClick(r.role)}
                  disabled={loading || !canAccessApp}
                  style={{ 
                    "--card-color": r.color,
                    animationDelay: `${i * 0.1}s`
                  } as React.CSSProperties}
                >
                  <div className="role-image-container">
                    <img src={r.image} alt={r.title} className="role-image" onError={event => { event.currentTarget.style.display = "none"; }} />
                    <div className="role-image-overlay" />
                    <div className="role-badge">{r.icon}</div>
                  </div>
                  <div className="role-card-content">
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                    <div className="role-stats">{r.stats}</div>
                  </div>
                  <div className="role-arrow">
                    <span>Get Started →</span>
                  </div>
                </button>
              ))}
              {!canAccessApp && (
                <div className="visitor-gate-overlay">
                  <span className="visitor-gate-icon">🔒</span>
                  <span className="visitor-gate-text">Sign in to access the marketplace</span>
                </div>
              )}
            </div>

            <div className={`cta-section ${isVisible ? "visible" : ""}`}>
              <button 
                onClick={() => handleRoleClick("admin")} 
                className="cta-button"
                disabled={loading || !canAccessApp}
              >
                <span>Admin Access</span>
              </button>
            </div>

            <VisitorLoginForm onRegistered={() => setVisitorSignedIn(true)} />

            {feedback && (
              <div className={`feedback-toast ${feedback ? "show" : ""}`}>
                <span className="toast-icon">✓</span>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="leaf-mark">✦</span>
            <span>farm<span className="brand-accent">to</span>money</span>
          </div>
          <p>© 2026 FarmToMoney. Built for Nigerian agriculture.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
