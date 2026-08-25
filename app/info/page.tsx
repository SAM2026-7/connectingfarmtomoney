"use client";

import DashboardLayout from "@/components/DashboardLayout";

const NEWS = [
  { title: "FG launches ₦500B agricultural transformation programme", date: "2026-08-24", category: "Policy" },
  { title: "CBN approves new loans for smallholder farmers", date: "2026-08-22", category: "Finance" },
  { title: "Nigeria signs new export deal with EU for sesame", date: "2026-08-20", category: "Export" },
  { title: "Weather alert: Heavy rainfall expected in South-West", date: "2026-08-19", category: "Weather" },
  { title: "New storage facility opens in Kaduna", date: "2026-08-18", category: "Infrastructure" },
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
          <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Weather Outlook</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f2ed" }}>
              <span style={{ color: "#708077", fontSize: "13px" }}>Lagos</span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>28°C / Rain</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f2ed" }}>
              <span style={{ color: "#708077", fontSize: "13px" }}>Ibadan</span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>27°C / Cloudy</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f2ed" }}>
              <span style={{ color: "#708077", fontSize: "13px" }}>Kano</span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>32°C / Sunny</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
              <span style={{ color: "#708077", fontSize: "13px" }}>Enugu</span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>26°C / Light Rain</span>
            </div>
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
