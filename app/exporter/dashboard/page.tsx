"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { formatPrice, getCommodityName } from "@/lib/data";
import { ProduceListing, Order } from "@/lib/types";

export default function ExporterDashboard() {
  const { user } = useAuth();
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (!user) return;
    Promise.all([fetch("/api/produce"), fetch("/api/orders")])
      .then(async ([produceResponse, orderResponse]) => {
        const produceData = produceResponse.ok ? await produceResponse.json() : { data: [] };
        const orderData = orderResponse.ok ? await orderResponse.json() : { data: [] };
        setProduce(produceData.data ?? []);
        setOrders(orderData.data ?? []);
      })
      .catch(() => { setProduce([]); setOrders([]); });
  }, [user]);
  const myProduce = produce.filter(p => p.sellerId === user?.id);
  const myOrders = orders.filter(o => o.sellerId === user?.id);
  const exportReady = myProduce.filter(p => p.grade === "export").length;

  return (
    <div className="dashboard-wrap exporter-dashboard">
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
          <h1 className="page-title">Exporter Dashboard</h1>
          <p className="page-subtitle">Manage export orders and documentation.</p>

          <div className="exporter-hero">
            <img
              src="https://images.unsplash.com/photo-1595854775527-69a8a4470e2c?auto=format&fit=crop&w=1400&q=85"
              alt="Farmer in a corn field"
              onError={event => { event.currentTarget.style.display = "none"; }}
            />
            <div className="exporter-hero-overlay" />
            <div className="exporter-hero-copy">
              <span>EXPORT SUPPLY NETWORK</span>
              <strong>Move quality produce<br />from farm to global markets.</strong>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Export Listings</div>
              <div className="stat-value">{exportReady}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Export Orders</div>
              <div className="stat-value">{myOrders.filter(o => !["completed", "cancelled"].includes(o.status)).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Verified Suppliers</div>
              <div className="stat-value">12</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Export Volume</div>
              <div className="stat-value">840t</div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPORT LISTINGS</span>
              <h2>Export-Quality Produce</h2>
            </div>
            <Link href="/exporter/requests" className="btn btn-outline btn-sm">Post request <span>→</span></Link>
          </div>
          <table className="produce-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Location</th>
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
                  <td>{p.location}, {p.state}</td>
                  <td>{p.quantity.toLocaleString()} {p.packaging.split(" ")[1] || "units"}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td><span className={`grade ${p.grade.toLowerCase()}`}>{p.grade}</span></td>
                  <td><span className="status">{p.status}</span></td>
                </tr>
              ))}
              {myProduce.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#708077" }}>No export listings yet.</td></tr>
              )}
            </tbody>
          </table>

          <div className="section-heading" style={{ marginTop: "50px" }}>
            <div>
              <span className="section-kicker">DOCUMENTATION</span>
              <h2>Export Documents</h2>
            </div>
          </div>
          <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "30px", textAlign: "center", color: "#708077" }}>
            <p style={{ margin: "0 0 10px", color: "var(--ink)", fontWeight: 600 }}>Document Management</p>
            <p style={{ margin: 0, fontSize: "13px" }}>Upload and manage export documentation including invoices, packing lists, certificates of origin, phytosanitary certificates, and shipping documents.</p>
            <button className="btn btn-primary" style={{ marginTop: "20px" }}>Upload Document</button>
          </div>
        </div>
      </div>
    </div>
  );
}
