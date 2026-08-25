"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";
import { AgentAggregation, ProduceListing, Order, User } from "@/lib/types";

export default function AgentDashboard() {
  const { user } = useAuth();
  const [aggregations, setAggregations] = useState<AgentAggregation[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [farmers, setFarmers] = useState<User[]>([]);
  useEffect(() => { if (user) fetch("/api/catalog").then(response => response.ok ? response.json() : null).then(data => { const catalog = data?.data; setAggregations(catalog?.aggregations ?? []); setProduce(catalog?.produce ?? []); setOrders(catalog?.orders ?? []); setFarmers((catalog?.users ?? []).filter((candidate: User) => candidate.role === "farmer")); }).catch(() => undefined); }, [user]);
  const myAggregations = aggregations.filter(a => a.agentId === user?.id);
  const myFarmers = [...new Set(myAggregations.map(a => a.farmerId))];
  const myOrders = orders.filter(o => o.sellerId === user?.id);
  const totalAggregated = myAggregations.reduce((sum, a) => sum + a.quantity, 0);

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
          <h1 className="page-title">Agent Dashboard</h1>
          <p className="page-subtitle">Manage farmers, aggregation, and buyer orders.</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Farmers Connected</div>
              <div className="stat-value">{myFarmers.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Aggregated Volume</div>
              <div className="stat-value">{totalAggregated.toLocaleString()}</div>
              <div className="stat-change positive">tonnes</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Orders</div>
              <div className="stat-value">{myOrders.filter(o => !["completed", "cancelled"].includes(o.status)).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Commission (MTD)</div>
              <div className="stat-value">{formatPrice(myOrders.reduce((sum, o) => sum + o.price * 0.05, 0))}</div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <span className="section-kicker">AGGREGATION</span>
              <h2>Current Aggregations</h2>
            </div>
            <Link href="/agent/aggregation" className="btn btn-outline btn-sm">Manage <span>→</span></Link>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Commodity</th>
                <th>Quantity</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {myAggregations.map((a, i) => {
                const farmer = farmers.find(f => f.id === a.farmerId);
                const produceItem = produce.find(p => p.id === a.produceId);
                return (
                  <tr key={i}>
                    <td className="commodity-name">{farmer?.name || "Unknown"}</td>
                    <td>{produceItem ? getCommodityName(produceItem.commodityId) : "N/A"} <span style={{ color: "#708077", fontWeight: 400 }}>{produceItem?.variety}</span></td>
                    <td>{a.quantity.toLocaleString()} {produceItem?.packaging.split(" ")[1] || "units"}</td>
                    <td><span className={`grade ${a.grade.toLowerCase()}`}>{a.grade}</span></td>
                    <td>{formatDate(a.date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="section-heading" style={{ marginTop: "50px" }}>
            <div>
              <span className="section-kicker">MY ORDERS</span>
              <h2>Recent Orders</h2>
            </div>
            <Link href="/agent/orders" className="btn btn-outline btn-sm">View all <span>→</span></Link>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td className="commodity-name">{o.id}</td>
                  <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
                                    <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
                  <td>{o.quantity.toLocaleString()}</td>
                  <td>{formatPrice(o.price)}</td>
                  <td><span className={`badge ${o.status === "completed" || o.status === "delivered" ? "badge-green" : o.status === "cancelled" ? "badge-red" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
