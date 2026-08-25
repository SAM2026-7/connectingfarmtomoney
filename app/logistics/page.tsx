"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { getCommodityName } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";
import { Order, ProduceListing } from "@/lib/types";

export default function Logistics() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  useEffect(() => { if (user) fetch("/api/catalog").then(response => response.ok ? response.json() : null).then(data => { setOrders(data?.data?.orders ?? []); setProduce(data?.data?.produce ?? []); }).catch(() => undefined); }, [user]);
  const visibleOrders = orders.filter(order => order.buyerId === user?.id || order.sellerId === user?.id);
  const [feedback, setFeedback] = useState("");
  const [transport, setTransport] = useState({ pickup: "", delivery: "", capacity: "" });

  const findTransporters = () => {
    if (!transport.pickup.trim() || !transport.delivery.trim() || !transport.capacity.trim()) {
      setFeedback("Pickup, delivery, and capacity are required.");
      return;
    }
    setFeedback("Transport request submitted. Matching transporters will be shown shortly.");
    setShowForm(false);
    setTransport({ pickup: "", delivery: "", capacity: "" });
  };

  return (
    <DashboardLayout title="Logistics" subtitle="Manage transportation and delivery">
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Active Deliveries</div>
          <div className="stat-value">{visibleOrders.filter(o => ["processing", "dispatched"].includes(o.status)).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{visibleOrders.filter(o => o.status === "delivered" || o.status === "completed").length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transporters</div>
          <div className="stat-value">8</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Fleet Capacity</div>
          <div className="stat-value">120t</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">DELIVERIES</span>
          <h2>Active Deliveries</h2>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>+ Request Transport</button>
      </div>
      {feedback && <p role="status" style={{ color: feedback.includes("submitted") ? "var(--royal-green)" : "#a33a2a", fontSize: "13px" }}>{feedback}</p>}

      {showForm && (
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>Request Transport</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Pickup Location</label>
              <input value={transport.pickup} onChange={event => setTransport(current => ({ ...current, pickup: event.target.value }))} type="text" placeholder="e.g. Iseyin, Oyo" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Delivery Location</label>
              <input value={transport.delivery} onChange={event => setTransport(current => ({ ...current, delivery: event.target.value }))} type="text" placeholder="e.g. Lagos" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Vehicle Type</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                <option>Flatbed Truck</option>
                <option>Refrigerated Truck</option>
                <option>Tipper Truck</option>
                <option>Pickup Van</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Capacity Needed</label>
              <input value={transport.capacity} onChange={event => setTransport(current => ({ ...current, capacity: event.target.value }))} type="text" placeholder="e.g. 20 tonnes" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={findTransporters}>Find Transporters</button>
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <table className="produce-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Pickup</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Tracking</th>
          </tr>
        </thead>
        <tbody>
          {visibleOrders.filter(o => ["processing", "dispatched", "delivered", "completed"].includes(o.status)).map(o => (
            <tr key={o.id}>
              <td className="commodity-name">{o.id}</td>
              <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
              <td>Seller location</td>
              <td>{o.deliveryLocation}</td>
              <td><span className={`badge ${o.status === "delivered" || o.status === "completed" ? "badge-green" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
              <td><button className="btn btn-outline btn-sm">Track</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
