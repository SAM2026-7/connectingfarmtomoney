"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { COMMODITIES } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

type ExportRequest = { id: string; commodity: string; quantity: number; destination: string; deadline: string; status: string };

export default function ExporterRequests() {
  const [form, setForm] = useState({ commodity: "", quantity: "", destination: "", deadline: "", notes: "" });
  const [deliveryTerm, setDeliveryTerm] = useState("FOB");
  const [requests, setRequests] = useState<ExportRequest[]>([]);
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetch("/api/exporter/requests").then(response => response.ok ? response.json() : null).then(data => setRequests(data?.data ?? [])).catch(() => setFeedback("Unable to load export requests."));
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFeedback("");
    try {
      const response = await fetch("/api/exporter/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, quantity: Number(form.quantity), deliveryTerm }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to post request.");
      setRequests(current => [...current, data.data]);
      setFeedback("Export request posted successfully.");
      setForm({ commodity: "", quantity: "", destination: "", deadline: "", notes: "" });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to post request.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Export Requests" subtitle="Post produce requests for export markets">
      <div style={{ maxWidth: "700px" }}>
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "28px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>Post New Export Request</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div><label>Commodity</label><select required value={form.commodity} onChange={e => setForm({ ...form, commodity: e.target.value })} style={{ width: "100%", padding: "12px" }}><option value="">Select commodity</option>{COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}><div><label>Required Quantity (tonnes)</label><input required min="0.01" step="0.01" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500" style={{ width: "100%", padding: "12px" }} /></div><div><label>Destination Market</label><input required value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} placeholder="e.g. Europe" style={{ width: "100%", padding: "12px" }} /></div></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}><div><label>Delivery Requirement</label><select value={deliveryTerm} onChange={e => setDeliveryTerm(e.target.value)} style={{ width: "100%", padding: "12px" }}><option>FOB</option><option>CIF</option><option>EXW</option><option>DDP</option></select></div><div><label>Deadline</label><input required type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} style={{ width: "100%", padding: "12px" }} /></div></div>
            <div><label>Additional Notes</label><textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={4} placeholder="Specify quality requirements, packaging, etc." style={{ width: "100%", padding: "12px" }} /></div>
            <div style={{ display: "flex", gap: "12px" }}><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Posting..." : "Post Export Request"}</button><button type="button" className="btn btn-outline" onClick={() => setForm({ commodity: "", quantity: "", destination: "", deadline: "", notes: "" })}>Reset</button></div>
            {feedback && <p role="status" style={{ margin: 0, color: feedback.includes("successfully") ? "var(--royal-green)" : "#a33a2a" }}>{feedback}</p>}
          </form>
        </div>
      </div>
      {requests.length > 0 && <div style={{ marginTop: "30px" }}><div className="section-heading"><h2>Your Posted Requests</h2></div>{requests.map(request => <div key={request.id} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px", marginBottom: "8px" }}>{request.commodity} · {request.quantity}t · {request.destination} · {request.status}</div>)}</div>}
    </DashboardLayout>
  );
}
