"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const NAV_ITEMS = [
  { href: "/market", label: "Browse" },
  { href: "/wanted", label: "Wanted" },
  { href: "/market/prices", label: "Prices" },
  { href: "/info", label: "Info" },
];

export default function MarketplaceHeader() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();

  return (
    <header className="marketplace-header">
      <div className="marketplace-header-inner">
        <Link href="/" className="marketplace-brand">
          <span className="leaf-mark">✦</span>
          farm<span className="brand-accent">to</span>money
        </Link>
        <nav className="marketplace-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`marketplace-nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="marketplace-user">
          {user ? (
            <div className="marketplace-user-active">
              <div className="mini-avatar">{user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</div>
              <span className="marketplace-user-name">{user.name}</span>
              <span className="marketplace-user-role">{role}</span>
              <button className="marketplace-logout" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link href="/login" className="marketplace-login-btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
