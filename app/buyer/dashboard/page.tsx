"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { ProduceListing, Order } from "@/lib/types";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (!user) return;
    fetch("/api/catalog").then(response => response.ok ? response.json() : null).then(data => {
      setProduce(data?.data?.produce ?? []);
      setMyOrders((data?.data?.orders ?? []).filter((order: Order) => order.buyerId === user.id));
    }).catch(() => { setProduce([]); setMyOrders([]); });
  }, [user]);
  const totalSpent = myOrders.filter(o => o.status === "completed" || o.status === "delivered").reduce((sum, o) => sum + o.price, 0);
  const activeOrders = myOrders.filter(o => !["completed", "cancelled", "delivered"].includes(o.status)).length;

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
          <h1 className="page-title">Welcome, {user?.name}</h1>
          <p className="page-subtitle">Source quality produce for your business.</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Active Orders</div>
              <div className="stat-value">{activeOrders}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Spent</div>
              <div className="stat-value">{formatPrice(totalSpent)}</div>
              <div className="stat-change positive">+8.2% vs last month</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Verified Suppliers</div>
              <div className="stat-value">24</div>
              <div className="stat-change positive">+3 new</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Saved Searches</div>
              <div className="stat-value">5</div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <span className="section-kicker">AVAILABLE PRODUCE</span>
              <h2>Fresh on the Market</h2>
            </div>
            <Link href="/buyer/search" className="btn btn-outline btn-sm">View all produce <span>→</span></Link>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Seller</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {produce.filter(p => p.status === "active").slice(0, 6).map(p => (
                <tr key={p.id}>
                  <td className="commodity-name">{getCommodityName(p.commodityId)} <span style={{ color: "#708077", fontWeight: 400 }}>{p.variety}</span></td>
                  <td>{(p.sellerRole === "farmer" ? "Farmer" : p.sellerRole === "agent" ? "Agent" : "Exporter")}</td>
                  <td>{p.location}, {p.state}</td>
                  <td>{p.quantity.toLocaleString()} {p.packaging.split(" ")[1] || "units"}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td><span className={`grade ${p.grade.toLowerCase()}`}>{p.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="section-heading" style={{ marginTop: "50px" }}>
            <div>
              <span className="section-kicker">YOUR ORDERS</span>
              <h2>Recent Orders</h2>
            </div>
            <Link href="/buyer/orders" className="btn btn-outline btn-sm">View all <span>→</span></Link>
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
                  <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
                  <td>{o.quantity.toLocaleString()}</td>
                  <td>{formatPrice(o.price)}</td>
                  <td><span className={`badge ${o.status === "completed" || o.status === "delivered" ? "badge-green" : o.status === "cancelled" ? "badge-red" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
                  <td>{formatDate(o.createdAt)}</td>
                </tr>
              ))}
              {myOrders.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#708077" }}>No orders yet. Start searching!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
