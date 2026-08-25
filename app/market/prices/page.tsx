"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_PRICES, COMMODITIES, NIGERIAN_STATES } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/data";

export default function MarketPrices() {
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const filtered = MOCK_PRICES.filter(p => {
    const matchesCommodity = !selectedCommodity || p.commodityId === selectedCommodity;
    const matchesState = !selectedState || p.state === selectedState;
    return matchesCommodity && matchesState;
  });

  const avgPrice = filtered.length > 0 ? filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length : 0;
  const avgChange = filtered.length > 0 ? filtered.reduce((sum, p) => sum + p.changePercent, 0) / filtered.length : 0;

  return (
    <DashboardLayout title="Market Prices" subtitle="Real-time commodity prices across Nigeria">
      <div style={{ display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap", alignItems: "end" }}>
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Commodity</label>
          <select value={selectedCommodity} onChange={e => setSelectedCommodity(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px" }}>
            <option value="">All Commodities</option>
            {COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>State</label>
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px" }}>
            <option value="">All States</option>
            {NIGERIAN_STATES.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <button className="btn btn-outline" onClick={() => { setSelectedCommodity(""); setSelectedState(""); }}>Clear</button>
      </div>

      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Average Price</div>
          <div className="stat-value" style={{ fontSize: "24px" }}>{formatPrice(Math.round(avgPrice))}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Change</div>
          <div className={`stat-value ${avgChange >= 0 ? "positive" : "negative"}`} style={{ fontSize: "24px" }}>{avgChange >= 0 ? "+" : ""}{avgChange.toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Listings</div>
          <div className="stat-value">{filtered.length}</div>
        </div>
      </div>

      <table className="produce-table">
        <thead>
          <tr>
            <th>Commodity</th>
            <th>State</th>
            <th>Price</th>
            <th>Change</th>
            <th>% Change</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p, i) => (
            <tr key={i}>
              <td className="commodity-name">{p.commodityId.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}</td>
              <td>{p.state}</td>
              <td><strong>{formatPrice(p.price)}</strong></td>
              <td className={p.change >= 0 ? "positive" : "negative"} style={{ color: p.change >= 0 ? "#2d654d" : "#c74b3a" }}>
                {p.change >= 0 ? "+" : ""}{formatPrice(p.change)}
              </td>
              <td className={p.changePercent >= 0 ? "positive" : "negative"} style={{ color: p.changePercent >= 0 ? "#2d654d" : "#c74b3a" }}>
                {p.changePercent >= 0 ? "+" : ""}{p.changePercent.toFixed(2)}%
              </td>
              <td>{formatDate(p.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
