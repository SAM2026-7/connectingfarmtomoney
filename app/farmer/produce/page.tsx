"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_PRODUCE, COMMODITIES } from "@/lib/data";
import { formatPrice, getCommodityName } from "@/lib/data";

export default function FarmerProduce() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <DashboardLayout title="My Produce" subtitle="Manage your produce listings">
      <div style={{ marginBottom: "20px" }}>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>+ Add New Listing</button>
      </div>

      {showAddForm && (
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>New Produce Listing</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Commodity</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                {COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Quantity</label>
              <input type="number" placeholder="e.g. 50" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Price (₦)</label>
              <input type="number" placeholder="e.g. 85000" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Grade</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
                <option value="export">Export Quality</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button className="btn btn-primary">Save Listing</button>
            <button className="btn btn-outline" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <table className="produce-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Grade</th>
            <th>Available</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_PRODUCE.slice(0, 8).map(p => (
            <tr key={p.id}>
              <td className="commodity-name">{getCommodityName(p.commodityId)} <span style={{ color: "#708077", fontWeight: 400 }}>{p.variety}</span></td>
              <td>{p.quantity.toLocaleString()} {p.packaging.split(" ")[1] || "units"}</td>
              <td>{formatPrice(p.price)}</td>
              <td><span className={`grade ${p.grade.toLowerCase()}`}>{p.grade}</span></td>
              <td>{new Date(p.availableDate).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</td>
              <td><span className={`badge ${p.status === "active" ? "badge-green" : p.status === "sold" ? "badge-blue" : "badge-red"}`}>{p.status}</span></td>
              <td><button className="btn btn-outline btn-sm">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
