"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { COMMODITIES } from "@/lib/data";

export default function ExporterRequests() {
  const [form, setForm] = useState({ commodity: "", quantity: "", destination: "", deadline: "", notes: "" });

  return (
    <DashboardLayout title="Export Requests" subtitle="Post produce requests for export markets">
      <div style={{ maxWidth: "700px" }}>
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "28px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>Post New Export Request</h3>
          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Commodity</label>
              <select value={form.commodity} onChange={e => setForm({ ...form, commodity: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px" }}>
                <option value="">Select commodity</option>
                {COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Required Quantity (tonnes)</label>
                <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500" style={{ width: "100%", padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Destination Market</label>
                <input type="text" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} placeholder="e.g. Europe" style={{ width: "100%", padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Delivery Requirement</label>
                <select style={{ width: "100%", padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px" }}>
                  <option>FOB</option>
                  <option>CIF</option>
                  <option>EXW</option>
                  <option>DDP</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Deadline</label>
                <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Additional Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={4} placeholder="Specify quality requirements, packaging, etc." style={{ width: "100%", padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn btn-primary">Post Export Request</button>
              <button className="btn btn-outline" onClick={() => setForm({ commodity: "", quantity: "", destination: "", deadline: "", notes: "" })}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
