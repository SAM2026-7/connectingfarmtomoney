"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { UserRole } from "@/lib/types";

const NAV_ITEMS: Record<UserRole, { href: string; label: string; icon: string }[]> = {
  farmer: [
    { href: "/farmer/dashboard", label: "Dashboard", icon: "⌂" },
    { href: "/farmer/produce", label: "My Produce", icon: "♧" },
    { href: "/market", label: "Marketplace", icon: "⌕" },
    { href: "/wanted", label: "Buyer Requests", icon: "📝" },
    { href: "/farmer/orders", label: "Orders", icon: "↗" },
    { href: "/payments", label: "Payments", icon: "⬡" },
    { href: "/logistics", label: "Logistics", icon: "⛟" },
    { href: "/quality", label: "Quality", icon: "✓" },
    { href: "/market/prices", label: "Market Prices", icon: "◒" },
    { href: "/info", label: "Information", icon: "☰" },
    { href: "/messages", label: "Messages", icon: "✉" },
    { href: "/disputes", label: "Disputes", icon: "!" },
  ],
  buyer: [
    { href: "/buyer/dashboard", label: "Dashboard", icon: "⌂" },
    { href: "/buyer/search", label: "Find Produce", icon: "⌕" },
    { href: "/market", label: "Marketplace", icon: "⌕" },
    { href: "/wanted", label: "Buyer Requests", icon: "📝" },
    { href: "/buyer/orders", label: "My Orders", icon: "↗" },
    { href: "/payments", label: "Payments", icon: "⬡" },
    { href: "/logistics", label: "Logistics", icon: "⛟" },
    { href: "/market/prices", label: "Market Prices", icon: "◒" },
    { href: "/info", label: "Information", icon: "☰" },
    { href: "/messages", label: "Messages", icon: "✉" },
    { href: "/disputes", label: "Disputes", icon: "!" },
  ],
  agent: [
    { href: "/agent/dashboard", label: "Dashboard", icon: "⌂" },
    { href: "/agent/farmers", label: "Farmers", icon: "♧" },
    { href: "/agent/aggregation", label: "Aggregation", icon: "◈" },
    { href: "/buyer/search", label: "Produce", icon: "⌕" },
    { href: "/market", label: "Marketplace", icon: "⌕" },
    { href: "/wanted", label: "Buyer Requests", icon: "📝" },
    { href: "/agent/orders", label: "Orders", icon: "↗" },
    { href: "/payments", label: "Payments", icon: "⬡" },
    { href: "/logistics", label: "Logistics", icon: "⛟" },
    { href: "/quality", label: "Quality", icon: "✓" },
    { href: "/messages", label: "Messages", icon: "✉" },
    { href: "/disputes", label: "Disputes", icon: "!" },
  ],
  exporter: [
    { href: "/exporter/dashboard", label: "Dashboard", icon: "⌂" },
    { href: "/buyer/search", label: "Find Produce", icon: "⌕" },
    { href: "/market", label: "Marketplace", icon: "⌕" },
    { href: "/wanted", label: "Buyer Requests", icon: "📝" },
    { href: "/exporter/requests", label: "Export Requests", icon: "✈" },
    { href: "/payments", label: "Payments", icon: "⬡" },
    { href: "/logistics", label: "Logistics", icon: "⛟" },
    { href: "/quality", label: "Quality", icon: "✓" },
    { href: "/market/prices", label: "Market Prices", icon: "◒" },
    { href: "/info", label: "Information", icon: "☰" },
    { href: "/messages", label: "Messages", icon: "✉" },
    { href: "/disputes", label: "Disputes", icon: "!" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: "⌂" },
    { href: "/admin/analytics", label: "Analytics", icon: "◒" },
    { href: "/payments", label: "Payments", icon: "⬡" },
    { href: "/logistics", label: "Logistics", icon: "⛟" },
    { href: "/quality", label: "Quality", icon: "✓" },
    { href: "/disputes", label: "Disputes", icon: "!" },
    { href: "/ai", label: "AI Features", icon: "◈" },
    { href: "/pilot", label: "Pilot", icon: "▶" },
    { href: "/expansion", label: "Expansion", icon: "⛗" },
    { href: "/architecture", label: "Architecture", icon: "☰" },
    { href: "/roadmap", label: "Roadmap", icon: "⟳" },
    { href: "/info", label: "Info", icon: "☰" },
    { href: "/market/prices", label: "Prices", icon: "◒" },
  ],
};

export default function Sidebar() {
  const { user, role, logout } = useAuth();
  const pathname = usePathname();
  const items = role ? NAV_ITEMS[role] : [];

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="leaf-mark">✦</span>
        <span>farm<span className="brand-accent">to</span>money</span>
      </div>
      <div className="workspace-label">{role ? role.toUpperCase() : "WORKSPACE"}</div>
      <nav className="side-nav" aria-label="Main navigation">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <span>{item.icon}</span> {item.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="phase-card">
          <span className="phase-kicker">BUILD PHASE 01</span>
          <strong>Connect & discover</strong>
          <p>Meet trusted growers and find what is fresh near you.</p>
          <div className="phase-progress"><i /></div>
          <small>1 of 5 phases</small>
        </div>
        {user && (
          <div className="user-chip">
            <div className="avatar">{user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>{user.name}</strong>
              <small>{role?.replace("_", " ")}</small>
            </div>
            <button onClick={logout} className="logout-btn" aria-label="Logout">↪</button>
          </div>
        )}
      </div>
    </aside>
  );
}
