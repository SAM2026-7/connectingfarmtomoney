"use client";

import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  return (
    <div className="dashboard-wrap">
      <Sidebar />
      <div className="dashboard-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="leaf-mark">✦</span> farm<span>to</span>money</div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifications">♢<i /></button>
            <div className="mini-avatar">JD</div>
          </div>
        </header>
        <div className="content-wrap">
          {title && <h1 className="page-title">{title}</h1>}
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
