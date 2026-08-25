"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";
import { Order, ProduceListing } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";

export default function Payments() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  useEffect(() => { if (user) fetch("/api/catalog").then(response => response.ok ? response.json() : null).then(data => { const allOrders = data?.data?.orders ?? []; setOrders(user.role === "admin" ? allOrders : allOrders.filter((order: Order) => order.buyerId === user.id || order.sellerId === user.id)); setProduce(data?.data?.produce ?? []); }).catch(() => undefined); }, [user]);
  const paidOrders = orders.filter(o => ["paid", "processing", "dispatched", "delivered", "completed"].includes(o.status));
  const escrowOrders = orders.filter(o => o.status === "payment_pending");

  return (
    <DashboardLayout title="Payments & Escrow" subtitle="Manage transactions and escrow payments">
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Total Paid</div>
          <div className="stat-value">{formatPrice(paidOrders.reduce((s, o) => s + o.price, 0))}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Escrow</div>
          <div className="stat-value">{formatPrice(escrowOrders.reduce((s, o) => s + o.price, 0))}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transactions</div>
          <div className="stat-value">{paidOrders.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Platform Fee</div>
          <div className="stat-value">{formatPrice(paidOrders.reduce((s, o) => s + o.price, 0) * 0.02)}</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">ESCROW</span>
          <h2>Escrow Payments</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
        <p style={{ margin: "0 0 16px", color: "#708077", fontSize: "13px" }}>Funds held securely until delivery is confirmed by the buyer.</p>
        {escrowOrders.length === 0 ? (
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px" }}>No payments in escrow.</p>
        ) : (
          <table className="produce-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {escrowOrders.map(o => (
                <tr key={o.id}>
                  <td className="commodity-name">{o.id}</td>
                  <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
                  <td>{formatPrice(o.price)}</td>
                  <td><span className="badge badge-yellow">Awaiting Delivery</span></td>
                  <td><button className="btn btn-primary btn-sm">Confirm Delivery</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">TRANSACTIONS</span>
          <h2>Transaction History</h2>
        </div>
      </div>
      <table className="produce-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paidOrders.slice(0, 10).map(o => (
            <tr key={o.id}>
              <td className="commodity-name">{o.id}</td>
              <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
              <td>{formatPrice(o.price)}</td>
              <td>Bank Transfer</td>
              <td><span className="badge badge-green">Paid</span></td>
              <td>{formatDate(o.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
