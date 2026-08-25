"use client";

import DashboardLayout from "@/components/DashboardLayout";

const NEWS = [
  { title: "Rainfall planning: protect harvested crops during wet-season showers", date: "2026-08-25", category: "Weather" },
  { title: "Check official notices before applying for agricultural finance", date: "2026-08-25", category: "Finance" },
  { title: "Exporters should confirm destination and phytosanitary requirements", date: "2026-08-25", category: "Export" },
  { title: "Use local forecasts for planting, spraying, and transport decisions", date: "2026-08-25", category: "Advisory" },
  { title: "Compare storage and aggregation options before harvest peaks", date: "2026-08-25", category: "Infrastructure" },
];

const WEATHER = [
  { region: "South-West", outlook: "Wet-season showers", advice: "Improve drainage and keep harvested produce covered." },
  { region: "South-East", outlook: "Cloudy with rain risk", advice: "Avoid field operations during storms and ventilate storage." },
  { region: "North-Central", outlook: "Mixed showers", advice: "Monitor soil moisture and plan transport around rainfall." },
  { region: "North-West", outlook: "Warm with isolated showers", advice: "Prioritise water access and inspect crops for heat stress." },
  { region: "North-East", outlook: "Warm and seasonally variable", advice: "Use local forecasts before irrigation and harvest planning." },
];

const POLICY_UPDATES = [
  { policy: "National Agricultural Growth Scheme – Agro-Pocket (NAGS-AP)", period: "2023–2025 programme cycle", impact: "Supports input access and production finance through participating channels.", action: "Confirm eligibility and active application windows with official programme contacts." },
  { policy: "Presidential Accelerated Stabilisation and Advancement Plan (PASAP)", period: "2024 policy response", impact: "Includes measures intended to improve food production, supply, and affordability.", action: "Check current implementation notices before relying on a support measure." },
  { policy: "National Livestock Transformation Plan (NLTP)", period: "Ongoing national framework", impact: "Focuses on livestock productivity, value chains, conflict reduction, and investment.", action: "Livestock users should confirm state-level programmes and extension contacts." },
  { policy: "ACReSAL climate-resilience programme", period: "Ongoing multi-year programme", impact: "Supports climate-smart agriculture, watershed management, and resilient livelihoods.", action: "Look for participating state or community projects before registering interest." },
];

const TRAINING = [
  { title: "Post-Harvest Handling Best Practices", duration: "45 min", level: "Beginner" },
  { title: "Quality Grading for Export", duration: "1 hr 20 min", level: "Advanced" },
  { title: "Digital Marketing for Farmers", duration: "30 min", level: "Beginner" },
  { title: "Contract Farming Guide", duration: "55 min", level: "Intermediate" },
];

export default function InfoCentre() {
  return (
    <DashboardLayout title="Agricultural Information" subtitle="Market news, weather, and training resources">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px" }}>
          <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>Weather Outlook</h3>
          <p style={{ margin: "0 0 16px", color: "#708077", fontSize: "11px" }}>Regional planning guidance · 25 Aug 2026</p>
          <div style={{ display: "grid", gap: "12px" }}>
            {WEATHER.map((item, index) => <div key={item.region} style={{ padding: "10px 0", borderBottom: index < WEATHER.length - 1 ? "1px solid #f0f2ed" : "0" }}><div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "#708077", fontSize: "13px" }}>{item.region}</span><span style={{ fontSize: "13px", fontWeight: 600, textAlign: "right" }}>{item.outlook}</span></div><div style={{ color: "#708077", fontSize: "11px", marginTop: "4px" }}>{item.advice}</div></div>)}
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Market Opportunities</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <div style={{ padding: "12px", background: "#f5f7f3", borderRadius: "8px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>Sesame Export Demand</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>Europe buyers seeking 500t+ this quarter</div>
            </div>
            <div style={{ padding: "12px", background: "#f5f7f3", borderRadius: "8px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>Rice Processing Contracts</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>3 processors seeking paddy rice in Kwara</div>
            </div>
            <div style={{ padding: "12px", background: "#f5f7f3", borderRadius: "8px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>Cassava Aggregate</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>Lagos buyer needs 200t cassava monthly</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">NEWS</span>
          <h2>Agricultural News</h2>
        </div>
      </div>
      <table className="produce-table" style={{ marginBottom: "40px" }}>
        <thead>
          <tr>
            <th>Headline</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {NEWS.map((n, i) => (
            <tr key={i}>
              <td className="commodity-name">{n.title}</td>
              <td><span className="badge badge-blue">{n.category}</span></td>
              <td>{n.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-heading">
        <div>
          <span className="section-kicker">POLICY WATCH</span>
          <h2>Recent Nigerian Agricultural Policies</h2>
        </div>
      </div>
      <p style={{ color: "#708077", fontSize: "12px", margin: "-8px 0 16px" }}>Programme status and funding windows can change. Confirm details with the responsible ministry, agency, or state office.</p>
      <table className="produce-table" style={{ marginBottom: "40px" }}>
        <thead><tr><th>Policy / Programme</th><th>Period</th><th>What it means</th><th>Recommended action</th></tr></thead>
        <tbody>{POLICY_UPDATES.map(item => <tr key={item.policy}><td className="commodity-name">{item.policy}</td><td><span className="badge badge-blue">{item.period}</span></td><td style={{ color: "#708077", fontSize: "12px" }}>{item.impact}</td><td style={{ color: "#708077", fontSize: "12px" }}>{item.action}</td></tr>)}</tbody>
      </table>

      <div className="section-heading">
        <div>
          <span className="section-kicker">TRAINING</span>
          <h2>Learning Resources</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {TRAINING.map((t, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "20px" }}>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>{t.title}</div>
            <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#708077" }}>
              <span>{t.duration}</span>
              <span className={`badge ${t.level === "Beginner" ? "badge-green" : t.level === "Advanced" ? "badge-red" : "badge-yellow"}`}>{t.level}</span>
            </div>
            <button className="btn btn-outline btn-sm" style={{ marginTop: "14px", width: "100%" }}>Start Learning</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
