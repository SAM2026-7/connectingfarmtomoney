"use client";

import DashboardLayout from "@/components/DashboardLayout";

const EXPANSION_STAGES = [
  {
    stage: "Stage 1",
    title: "South-West",
    states: ["Oyo", "Osun", "Ogun", "Ondo", "Ekiti", "Lagos"],
    description: "Production areas, agricultural agents, major markets, large consumer market, logistics routes",
    color: "#2d654d",
  },
  {
    stage: "Stage 2",
    title: "North-Central",
    states: ["Kwara", "Kogi", "Niger", "Benue", "Nasarawa", "Plateau"],
    description: "Middle belt agricultural hub with strong cereal and root crop production",
    color: "#1e4d8c",
  },
  {
    stage: "Stage 3",
    title: "Northern Nigeria",
    states: ["Kaduna", "Kano", "Katsina", "Sokoto", "Kebbi", "Zamfara", "Jigawa"],
    description: "Northern agricultural belt with grains, legumes, and export commodities",
    color: "#7a4e1e",
  },
  {
    stage: "Stage 4",
    title: "South-East / South-South",
    states: ["Expand according to commodity and market opportunities"],
    description: "Oil palm, cocoa, cassava, and coastal agricultural products",
    color: "#5e1e4d",
  },
];

export default function Expansion() {
  return (
    <DashboardLayout title="Nigeria Expansion" subtitle="Phase 19: Geographic expansion across Nigeria">
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
        <p style={{ margin: "0", color: "#708077", fontSize: "14px", lineHeight: "1.6" }}>
          After the pilot succeeds in Oyo, Kwara, and Lagos, expand geographically in stages. Each stage builds on the infrastructure, user base, and logistics networks established in previous stages.
        </p>
      </div>

      <div style={{ display: "grid", gap: "20px", marginBottom: "40px" }}>
        {EXPANSION_STAGES.map((stage, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: stage.color, color: "white", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.8 }}>{stage.stage}</span>
                  <h3 style={{ margin: "4px 0 0", fontSize: "22px" }}>{stage.title}</h3>
                </div>
                <div style={{ fontSize: "12px", background: "rgba(255,255,255,0.2)", padding: "6px 12px", borderRadius: "20px" }}>
                  {Array.isArray(stage.states) ? stage.states.length + " States" : "TBD"}
                </div>
              </div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <p style={{ margin: "0 0 16px", color: "#708077", fontSize: "13px" }}>{stage.description}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {stage.states.map(s => (
                  <span key={s} className="badge" style={{ background: "#f0f2ed", color: "#556058", padding: "6px 12px", fontSize: "12px" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">TIMELINE</span>
          <h2>Expansion Timeline</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px" }}>
        <div style={{ display: "grid", gap: "16px" }}>
          {[
            { quarter: "Q1 2027", stage: "Stage 1", region: "South-West", status: "planned" },
            { quarter: "Q2 2027", stage: "Stage 2", region: "North-Central", status: "planned" },
            { quarter: "Q3-Q4 2027", stage: "Stage 3", region: "Northern Nigeria", status: "planned" },
            { quarter: "2028+", stage: "Stage 4", region: "South-East / South-South", status: "planned" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? "1px solid #f0f2ed" : "0" }}>
              <div style={{ width: "100px", fontSize: "12px", fontWeight: 600, color: "#708077", flexShrink: 0 }}>{item.quarter}</div>
              <div style={{ width: "80px", fontSize: "13px", fontWeight: 600, color: "var(--green)" }}>{item.stage}</div>
              <div style={{ flex: 1, fontSize: "14px" }}>{item.region}</div>
              <span className={`badge ${item.status === "completed" ? "badge-green" : item.status === "in-progress" ? "badge-yellow" : "badge-blue"}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
