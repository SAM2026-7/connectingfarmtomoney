"use client";

import { useAuth } from "@/components/AuthProvider";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { MOCK_PRODUCE, MOCK_ORDERS } from "@/lib/data";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const myProduce = MOCK_PRODUCE.filter(p => p.sellerId === user?.id);
  const myOrders = MOCK_ORDERS.filter(o => o.sellerId === user?.id);
  const activeListings = myProduce.filter(p => p.status === "active").length;
  const pendingOrders = myOrders.filter(o => ["requested", "negotiating", "payment_pending"].includes(o.status)).length;
  const revenue = myOrders.filter(o => o.status === "completed" || o.status === "delivered").reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="dashboard-wrap">
      <Sidebar />
      <div className="dashboard-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="leaf-mark">✦</span> farm<span>to</span>money</div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifications">♢<i /></button>
            <div className="mini-avatar">{user?.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}</div>
          </div>
        </header>
        <div className="content-wrap">
          <h1 className="page-title">Hello, {user?.name.split(" ")[0]}</h1>
          <p className="page-subtitle">Manage your produce and track your sales.</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Active Listings</div>
              <div className="stat-value">{activeListings}</div>
              <div className="stat-change positive">+2 this week</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending Orders</div>
              <div className="stat-value">{pendingOrders}</div>
              <div className="stat-change positive">+1 today</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">{formatPrice(revenue)}</div>
              <div className="stat-change positive">+12.5%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Verification</div>
              <div className="stat-value" style={{ fontSize: "18px", paddingTop: "6px" }}><span className="badge badge-green">Trade Verified</span></div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <span className="section-kicker">MY PRODUCE</span>
              <h2>Recent Listings</h2>
            </div>
            <Link href="/farmer/produce" className="btn btn-outline btn-sm">View all <span>→</span></Link>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myProduce.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td className="commodity-name">{getCommodityName(p.commodityId)} <span style={{ color: "#708077", fontWeight: 400 }}>{p.variety}</span></td>
                  <td>{p.quantity.toLocaleString()} {p.packaging.split(" ")[1] || "units"}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td><span className={`grade ${p.grade.toLowerCase()}`}>{p.grade}</span></td>
                  <td><span className="status">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="section-heading" style={{ marginTop: "50px" }}>
            <div>
              <span className="section-kicker">ORDERS</span>
              <h2>Recent Orders</h2>
            </div>
            <Link href="/farmer/orders" className="btn btn-outline btn-sm">View all <span>→</span></Link>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td className="commodity-name">{o.id}</td>
                  <td>{getCommodityName(MOCK_PRODUCE.find(p => p.id === o.produceId)?.commodityId || "")}</td>
                  <td>{o.quantity.toLocaleString()}</td>
                  <td>{formatPrice(o.price)}</td>
                  <td><span className={`badge ${o.status === "completed" || o.status === "delivered" ? "badge-green" : o.status === "cancelled" ? "badge-red" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
                  <td>{formatDate(o.createdAt)}</td>
                </tr>
              ))}
              {myOrders.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#708077" }}>No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
