"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { COMMODITIES } from "@/lib/data";
import { formatPrice, getCommodityName } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";
import { ProduceListing } from "@/lib/types";

export default function FarmerProduce() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [form, setForm] = useState({ commodityId: COMMODITIES[0].id, quantity: "", price: "", grade: "B" });
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProduce = () => fetch("/api/produce")
    .then(response => response.ok ? response.json() : null)
    .then(data => setProduce(data?.data ?? []))
    .catch(() => setFeedback("Unable to load produce listings."));

  useEffect(() => { loadProduce(); }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setSaving(true);
    try {
      const response = await fetch("/api/produce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sellerId: user?.id, quantity: Number(form.quantity), price: Number(form.price) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save listing.");
      setFeedback("Listing saved successfully.");
      setForm({ commodityId: COMMODITIES[0].id, quantity: "", price: "", grade: "B" });
      setShowAddForm(false);
      await loadProduce();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to save listing.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="My Produce" subtitle="Manage your produce listings">
      <div style={{ marginBottom: "20px" }}>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>+ Add New Listing</button>
      </div>

      {feedback && <p role="status" style={{ color: feedback.includes("success") ? "var(--royal-green)" : "#a33a2a", fontSize: "13px" }}>{feedback}</p>}

      {showAddForm && (
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>New Produce Listing</h3>
          <form onSubmit={handleSave}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Commodity</label>
              <select value={form.commodityId} onChange={event => setForm(current => ({ ...current, commodityId: event.target.value }))} style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                {COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Quantity</label>
              <input required min="0.01" step="0.01" type="number" value={form.quantity} onChange={event => setForm(current => ({ ...current, quantity: event.target.value }))} placeholder="e.g. 50" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Price (₦)</label>
              <input required min="0.01" step="0.01" type="number" value={form.price} onChange={event => setForm(current => ({ ...current, price: event.target.value }))} placeholder="e.g. 85000" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Grade</label>
              <select value={form.grade} onChange={event => setForm(current => ({ ...current, grade: event.target.value }))} style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
                <option value="export">Export Quality</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Listing"}</button>
            <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
          </form>
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
          {produce.filter(p => p.sellerId === user?.id).map(p => (
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
