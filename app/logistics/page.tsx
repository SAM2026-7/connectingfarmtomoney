"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_ORDERS, MOCK_PRODUCE } from "@/lib/data";
import { getCommodityName } from "@/lib/data";

export default function Logistics() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout title="Logistics" subtitle="Manage transportation and delivery">
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Active Deliveries</div>
          <div className="stat-value">{MOCK_ORDERS.filter(o => ["processing", "dispatched"].includes(o.status)).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{MOCK_ORDERS.filter(o => o.status === "delivered" || o.status === "completed").length}</div>
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

      {showForm && (
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>Request Transport</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Pickup Location</label>
              <input type="text" placeholder="e.g. Iseyin, Oyo" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Delivery Location</label>
              <input type="text" placeholder="e.g. Lagos" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
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
              <input type="text" placeholder="e.g. 20 tonnes" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button className="btn btn-primary">Find Transporters</button>
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
          {MOCK_ORDERS.filter(o => ["processing", "dispatched", "delivered", "completed"].includes(o.status)).map(o => (
            <tr key={o.id}>
              <td className="commodity-name">{o.id}</td>
              <td>{getCommodityName(MOCK_PRODUCE.find(p => p.id === o.produceId)?.commodityId || "")}</td>
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
