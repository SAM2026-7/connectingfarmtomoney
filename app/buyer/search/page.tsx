"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { NIGERIAN_STATES, COMMODITIES } from "@/lib/data";
import { ProduceListing } from "@/lib/types";
import { formatPrice, getCommodityName } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

export default function BuyerSearch() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const { user } = useAuth();
  const [requestId, setRequestId] = useState<string | null>(null);
  const [requestForm, setRequestForm] = useState({ quantity: "", deliveryLocation: "" });
  const [feedback, setFeedback] = useState("");
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetch("/api/produce")
      .then(response => response.ok ? response.json() : null)
      .then(data => setProduce(data?.data ?? []))
      .catch(() => setProduce([]));
  }, []);

  const filtered = produce.filter(p => {
    const matchesSearch = !search || getCommodityName(p.commodityId).toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesState = !selectedState || p.state === selectedState;
    const matchesCommodity = !selectedCommodity || p.commodityId === selectedCommodity;
    return matchesSearch && matchesState && matchesCommodity && p.status === "active";
  });

  const handleRequest = async (listing: ProduceListing) => {
    setFeedback("");
    setRequesting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produceId: listing.id, buyerId: user?.id, sellerId: listing.sellerId, quantity: Number(requestForm.quantity), price: listing.price, deliveryLocation: requestForm.deliveryLocation }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to place request.");
      setFeedback("Order request sent successfully.");
      setRequestId(null);
      setRequestForm({ quantity: "", deliveryLocation: "" });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to place request.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <DashboardLayout title="Find Produce" subtitle="Search available produce from verified sellers">
      <div style={{ display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search produce or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: "1 1 250px", padding: "12px 16px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "14px" }}
        />
        <select value={selectedCommodity} onChange={e => setSelectedCommodity(e.target.value)} style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px", minWidth: "180px" }}>
          <option value="">All Commodities</option>
          {COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)} style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px", minWidth: "180px" }}>
          <option value="">All States</option>
          {NIGERIAN_STATES.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
        </select>
      </div>
      {feedback && <p role="status" style={{ color: feedback.includes("successfully") ? "var(--royal-green)" : "#a33a2a", fontSize: "13px" }}>{feedback}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ height: "140px", background: "linear-gradient(135deg, #e8f0e3, #d4e4c8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#708077", fontSize: "12px" }}>
              Produce Image
            </div>
            <div style={{ padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "16px" }}>{getCommodityName(p.commodityId)} <span style={{ color: "#708077", fontWeight: 400, fontSize: "13px" }}>{p.variety}</span></h3>
                <span className={`grade ${p.grade.toLowerCase()}`} style={{ fontSize: "10px" }}>{p.grade}</span>
              </div>
              <p style={{ margin: "0 0 12px", color: "#708077", fontSize: "12px" }}>{p.location}, {p.state}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #f0f2ed" }}>
                <div>
                  <strong style={{ fontSize: "15px" }}>{formatPrice(p.price)}</strong>
                  <span style={{ color: "#9aa49f", fontSize: "11px", marginLeft: "4px" }}>/ {p.packaging.split(" ")[0]}{p.packaging.split(" ").slice(1).join(" ")}</span>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setRequestId(requestId === p.id ? null : p.id)}>Request</button>
              </div>
              {requestId === p.id && (
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #f0f2ed" }}>
                  <input required min="0.01" max={p.quantity} step="0.01" type="number" value={requestForm.quantity} onChange={event => setRequestForm(current => ({ ...current, quantity: event.target.value }))} placeholder={`Quantity (max ${p.quantity})`} style={{ width: "100%", padding: "9px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "12px", marginBottom: "8px" }} />
                  <input required type="text" value={requestForm.deliveryLocation} onChange={event => setRequestForm(current => ({ ...current, deliveryLocation: event.target.value }))} placeholder="Delivery location" style={{ width: "100%", padding: "9px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "12px", marginBottom: "8px" }} />
                  <button className="btn btn-primary btn-sm" disabled={requesting || !requestForm.quantity || !requestForm.deliveryLocation} onClick={() => handleRequest(p)}>{requesting ? "Sending..." : "Send Request"}</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px", color: "#708077" }}>
            <p style={{ margin: "0 0 8px", fontWeight: 600, color: "var(--ink)" }}>No produce found</p>
            <p style={{ margin: 0, fontSize: "13px" }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
