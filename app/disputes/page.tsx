"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const DISPUTES = [
  { id: "DSP-001", orderId: "AGN-2026-000145", type: "Quality Issue", description: "Cassava moisture level higher than agreed", status: "open", date: "2026-08-23" },
  { id: "DSP-002", orderId: "AGN-2026-000142", type: "Non-delivery", description: "Seller failed to deliver within agreed timeframe", status: "investigating", date: "2026-08-21" },
  { id: "DSP-003", orderId: "AGN-2026-000138", type: "Wrong Quantity", description: "Delivered 18t instead of 20t", status: "resolved", date: "2026-08-18" },
];

export default function Disputes() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout title="Dispute Resolution" subtitle="Report and resolve transaction issues">
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Open Disputes</div>
          <div className="stat-value">{DISPUTES.filter(d => d.status === "open").length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Investigating</div>
          <div className="stat-value">{DISPUTES.filter(d => d.status === "investigating").length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Resolved</div>
          <div className="stat-value">{DISPUTES.filter(d => d.status === "resolved").length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Resolution</div>
          <div className="stat-value">2.4d</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">REPORT</span>
          <h2>File a Dispute</h2>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>+ New Dispute</button>
      </div>

      {showForm && (
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Order ID</label>
              <input type="text" placeholder="e.g. AGN-2026-000150" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Dispute Type</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                <option>Quality Issue</option>
                <option>Wrong Quantity</option>
                <option>Non-delivery</option>
                <option>Payment Problem</option>
                <option>Misrepresentation</option>
                <option>Damaged Produce</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Description</label>
              <textarea rows={4} placeholder="Describe the issue in detail..." style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn btn-primary">Submit Dispute</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="section-heading">
        <div>
          <span className="section-kicker">DISPUTES</span>
          <h2>Dispute Queue</h2>
        </div>
      </div>
      <table className="produce-table">
        <thead>
          <tr>
            <th>Dispute ID</th>
            <th>Order ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {DISPUTES.map(d => (
            <tr key={d.id}>
              <td className="commodity-name">{d.id}</td>
              <td>{d.orderId}</td>
              <td>{d.type}</td>
              <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.description}</td>
              <td><span className={`badge ${d.status === "resolved" ? "badge-green" : d.status === "investigating" ? "badge-yellow" : "badge-red"}`}>{d.status}</span></td>
              <td>{d.date}</td>
              <td><button className="btn btn-outline btn-sm">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
