"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { formatPrice } from "@/lib/data";
import { Order, ProduceListing, User } from "@/lib/types";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetch("/api/admin/summary")
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        setUsers(data?.data?.users ?? []);
        setProduce(data?.data?.produce ?? []);
        setOrders(data?.data?.orders ?? []);
      })
      .catch(() => { setUsers([]); setProduce([]); setOrders([]); });
  }, []);
  const totalUsers = users.length;
  const totalValue = orders.reduce((sum, order) => sum + order.price, 0);
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
              <div className="stat-value">{produce.filter(p => p.status === "active").length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Orders</div>
              <div className="stat-value">{orders.length}</div>
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
                <td>{users.filter(user => user.role === "farmer").length}</td>
                <td>{users.filter(user => user.role === "farmer" && user.verificationLevel !== "unverified").length}</td>
                <td>{(users.filter(user => user.role === "farmer").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(users.filter(user => user.role === "farmer").length, 1)).toFixed(1)}</td>
              </tr>
              <tr>
                <td className="commodity-name">Agents</td>
                <td>{users.filter(user => user.role === "agent").length}</td>
                <td>{users.filter(user => user.role === "agent" && user.verificationLevel !== "unverified").length}</td>
                <td>{(users.filter(user => user.role === "agent").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(users.filter(user => user.role === "agent").length, 1)).toFixed(1)}</td>
              </tr>
              <tr>
                <td className="commodity-name">Buyers</td>
                <td>{users.filter(user => user.role === "buyer").length}</td>
                <td>{users.filter(user => user.role === "buyer" && user.verificationLevel !== "unverified").length}</td>
                <td>{(users.filter(user => user.role === "buyer").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(users.filter(user => user.role === "buyer").length, 1)).toFixed(1)}</td>
              </tr>
              <tr>
                <td className="commodity-name">Exporters</td>
                <td>{users.filter(user => user.role === "exporter").length}</td>
                <td>{users.filter(user => user.role === "exporter" && user.verificationLevel !== "unverified").length}</td>
                <td>{(users.filter(user => user.role === "exporter").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(users.filter(user => user.role === "exporter").length, 1)).toFixed(1)}</td>
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
