"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_FARMERS } from "@/lib/data";

export default function AgentFarmers() {
  return (
    <DashboardLayout title="Farmers" subtitle="Manage your connected farmers">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {MOCK_FARMERS.map(f => (
          <div key={f.id} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div className="avatar" style={{ width: "48px", height: "48px", fontSize: "14px" }}>{f.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "15px" }}>{f.name}</div>
                <div style={{ color: "#708077", fontSize: "12px" }}>{f.state}, {f.lga}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
              <span className={`badge ${f.verificationLevel === "trusted" ? "badge-green" : f.verificationLevel === "trade_verified" ? "badge-blue" : "badge-yellow"}`}>{f.verificationLevel.replace("_", " ")}</span>
              <span className="badge" style={{ background: "#f0f2ed", color: "#556058" }}>⭐ {f.rating}/5</span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Message</button>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Produce</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
