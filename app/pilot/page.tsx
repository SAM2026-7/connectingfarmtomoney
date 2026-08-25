"use client";

import DashboardLayout from "@/components/DashboardLayout";

const PILOT_STATES = [
  { name: "Oyo", farmers: 120, agents: 15, buyers: 8, exporters: 3, commodities: ["Maize", "Cassava", "Yam", "Tomato", "Sesame"], color: "#2d654d" },
  { name: "Kwara", farmers: 85, agents: 10, buyers: 5, exporters: 2, commodities: ["Rice", "Soybean", "Cassava", "Maize", "Yam"], color: "#1e4d8c" },
  { name: "Lagos", farmers: 95, agents: 18, buyers: 12, exporters: 5, commodities: ["Cassava", "Plantain", "Vegetables", "Fish", "Poultry"], color: "#7a4e1e" },
];

export default function PilotLaunch() {
  const totalFarmers = PILOT_STATES.reduce((s, st) => s + st.farmers, 0);
  const totalAgents = PILOT_STATES.reduce((s, st) => s + st.agents, 0);
  const totalBuyers = PILOT_STATES.reduce((s, st) => s + st.buyers, 0);
  const totalExporters = PILOT_STATES.reduce((s, st) => s + st.exporters, 0);

  return (
    <DashboardLayout title="Pilot Launch" subtitle="Phase 18: Initial rollout in Oyo, Kwara, and Lagos">
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Target Farmers</div>
          <div className="stat-value">{totalFarmers}</div>
          <div className="stat-change positive">100-300 range</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Target Agents</div>
          <div className="stat-value">{totalAgents}</div>
          <div className="stat-change positive">20-50 range</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Target Buyers</div>
          <div className="stat-value">{totalBuyers}</div>
          <div className="stat-change positive">20 range</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Target Exporters</div>
          <div className="stat-value">{totalExporters}</div>
          <div className="stat-change positive">5-20 range</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">PILOT STATES</span>
          <h2>Oyo + Kwara + Lagos</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {PILOT_STATES.map((state, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: state.color, color: "white", padding: "20px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>{state.name}</h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Pilot State {i + 1}</p>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Farmers</div>
                  <div style={{ fontSize: "22px", fontFamily: "'Playfair Display', serif", marginTop: "2px" }}>{state.farmers}</div>
                </div>
                <div>
                  <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Agents</div>
                  <div style={{ fontSize: "22px", fontFamily: "'Playfair Display', serif", marginTop: "2px" }}>{state.agents}</div>
                </div>
                <div>
                  <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Buyers</div>
                  <div style={{ fontSize: "22px", fontFamily: "'Playfair Display', serif", marginTop: "2px" }}>{state.buyers}</div>
                </div>
                <div>
                  <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Exporters</div>
                  <div style={{ fontSize: "22px", fontFamily: "'Playfair Display', serif", marginTop: "2px" }}>{state.exporters}</div>
                </div>
              </div>
              <div>
                <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Pilot Commodities</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {state.commodities.map(c => (
                    <span key={c} className="badge badge-green">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">TIMELINE</span>
          <h2>Pilot Timeline (8-12 weeks)</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px" }}>
        <div style={{ display: "grid", gap: "16px" }}>
          {[
            { week: "Week 1-2", task: "Onboard farmers and agents in Oyo State", status: "pending" },
            { week: "Week 3-4", task: "Launch buyer registration and first listings", status: "pending" },
            { week: "Week 5-6", task: "Onboard Kwara State participants", status: "pending" },
            { week: "Week 7-8", task: "Onboard Lagos participants", status: "pending" },
            { week: "Week 9-10", task: "First transactions and feedback collection", status: "pending" },
            { week: "Week 11-12", task: "Pilot review, bug fixes, and expansion planning", status: "pending" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center", padding: "14px 0", borderBottom: i < 5 ? "1px solid #f0f2ed" : "0" }}>
              <div style={{ width: "100px", fontSize: "12px", fontWeight: 600, color: "#708077", flexShrink: 0 }}>{item.week}</div>
              <div style={{ flex: 1, fontSize: "14px" }}>{item.task}</div>
              <span className={`badge ${item.status === "completed" ? "badge-green" : item.status === "in-progress" ? "badge-yellow" : "badge-blue"}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
