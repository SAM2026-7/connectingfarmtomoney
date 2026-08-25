"use client";

import Sidebar from "@/components/Sidebar";
import { MOCK_PRODUCE, MOCK_ORDERS, MOCK_FARMERS, MOCK_AGENTS, MOCK_BUYERS, MOCK_EXPORTERS } from "@/lib/data";
import { formatPrice } from "@/lib/data";

export default function AdminDashboard() {
  const totalUsers = MOCK_FARMERS.length + MOCK_AGENTS.length + MOCK_BUYERS.length + MOCK_EXPORTERS.length;
  const totalValue = MOCK_ORDERS.reduce((sum, o) => sum + o.price, 0);
  const topCommodities = ["Maize", "Cassava", "Sesame", "Rice", "Yam", "Ginger", "Cocoa", "Soybean"];

  return (
    <div className="dashboard-wrap">
      <Sidebar />
      <div className="dashboard-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="leaf-mark">✦</span> farm<span>to</span>money</div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifications">♢<i /></button>
            <div className="mini-avatar">AD</div>
          </div>
        </header>
        <div className="content-wrap">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Monitor marketplace activity and manage users.</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{totalUsers}</div>
              <div className="stat-change positive">+12 this week</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Listings</div>
              <div className="stat-value">{MOCK_PRODUCE.filter(p => p.status === "active").length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Orders</div>
              <div className="stat-value">{MOCK_ORDERS.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Platform Revenue</div>
              <div className="stat-value">{formatPrice(totalValue * 0.02)}</div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <span className="section-kicker">USERS</span>
              <h2>User Distribution</h2>
            </div>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Count</th>
                <th>Verified</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="commodity-name">Farmers</td>
                <td>{MOCK_FARMERS.length}</td>
                <td>{MOCK_FARMERS.filter(f => f.verificationLevel !== "unverified").length}</td>
                <td>{(MOCK_FARMERS.reduce((s, f) => s + (f.rating || 0), 0) / MOCK_FARMERS.length).toFixed(1)}</td>
              </tr>
              <tr>
                <td className="commodity-name">Agents</td>
                <td>{MOCK_AGENTS.length}</td>
                <td>{MOCK_AGENTS.filter(a => a.verificationLevel !== "unverified").length}</td>
                <td>{(MOCK_AGENTS.reduce((s, a) => s + (a.rating || 0), 0) / MOCK_AGENTS.length).toFixed(1)}</td>
              </tr>
              <tr>
                <td className="commodity-name">Buyers</td>
                <td>{MOCK_BUYERS.length}</td>
                <td>{MOCK_BUYERS.filter(b => b.verificationLevel !== "unverified").length}</td>
                <td>{(MOCK_BUYERS.reduce((s, b) => s + (b.rating || 0), 0) / MOCK_BUYERS.length).toFixed(1)}</td>
              </tr>
              <tr>
                <td className="commodity-name">Exporters</td>
                <td>{MOCK_EXPORTERS.length}</td>
                <td>{MOCK_EXPORTERS.filter(e => e.verificationLevel !== "unverified").length}</td>
                <td>{(MOCK_EXPORTERS.reduce((s, e) => s + (e.rating || 0), 0) / MOCK_EXPORTERS.length).toFixed(1)}</td>
              </tr>
            </tbody>
          </table>

          <div className="section-heading" style={{ marginTop: "50px" }}>
            <div>
              <span className="section-kicker">TOP COMMODITIES</span>
              <h2>Most Traded</h2>
            </div>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Volume</th>
                <th>Transactions</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {topCommodities.map((c, i) => (
                <tr key={c}>
                  <td className="commodity-name">{c}</td>
                  <td>{[840, 650, 520, 480, 390, 310, 280, 210][i]}t</td>
                  <td>{[42, 35, 28, 24, 19, 15, 12, 8][i]}</td>
                  <td><span className="stat-change positive">+{[12, 8, 15, 5, -2, 10, 6, 18][i]}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
