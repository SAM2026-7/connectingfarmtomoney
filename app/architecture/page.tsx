"use client";

import DashboardLayout from "@/components/DashboardLayout";

const TECH_STACK = [
  { layer: "Mobile", tech: "Flutter", desc: "Single codebase for Android and iOS. Android-first for Nigerian market.", icon: "📱" },
  { layer: "Backend", tech: "Node.js / NestJS", desc: "Scalable API server with TypeScript. Alternative: Django or Laravel.", icon: "⚙️" },
  { layer: "Database", tech: "PostgreSQL", desc: "Relational database for users, listings, orders, and transactions.", icon: "🗄️" },
  { layer: "Web Admin", tech: "React / Next.js", desc: "Current stack. Server-side rendering for SEO and performance.", icon: "🌐" },
  { layer: "Cloud", tech: "AWS / GCP / Azure", desc: "Scalable cloud infrastructure with API server, database, file storage, backup, and monitoring.", icon: "☁️" },
  { layer: "Maps", tech: "Mapbox / Google Maps", desc: "Farm locations, pickup points, markets, delivery routes, distance calculations.", icon: "🗺️" },
];

const SYSTEM_COMPONENTS = [
  { name: "Farmers", desc: "Registration, profiles, produce listings, photos, pricing, availability" },
  { name: "Agricultural Marketing Agents", desc: "Farmer management, produce aggregation, bulk listings, buyer enquiries" },
  { name: "Buyers / Processors", desc: "Search, filters, contact sellers, request quotations, place orders" },
  { name: "Exporters", desc: "Search export-quality produce, submit requirements, contact agents, bulk supply" },
  { name: "Marketplace", desc: "Listings, search, matching, orders, negotiations, payments" },
  { name: "Logistics", desc: "Transporter registration, vehicle management, delivery tracking, proof of delivery" },
  { name: "Payment", desc: "Bank transfer, card payments, mobile payments, escrow, receipts" },
  { name: "Administration", desc: "User verification, transaction monitoring, dispute resolution, analytics" },
];

export default function Architecture() {
  return (
    <DashboardLayout title="Technology Architecture" subtitle="Recommended system structure and tech stack">
      <div className="section-heading">
        <div>
          <span className="section-kicker">TECH STACK</span>
          <h2>Recommended Technology</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {TECH_STACK.map((item, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "20px" }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#708077", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{item.layer}</div>
            <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{item.tech}</div>
            <p style={{ margin: 0, color: "#708077", fontSize: "12px", lineHeight: "1.5" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">SYSTEM STRUCTURE</span>
          <h2>Agricultural Marketplace</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {["Farmers", "Agents", "Buyers"].map((group, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              {[group].map(item => (
                <div key={item} style={{ padding: "10px 20px", background: "#f5f7f3", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px", fontWeight: 600, minWidth: "120px", textAlign: "center" }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
          <div style={{ width: "2px", height: "30px", background: "var(--line)" }} />
          <div style={{ padding: "12px 32px", background: "var(--green)", color: "white", borderRadius: "8px", fontSize: "14px", fontWeight: 700 }}>
            MARKETPLACE
          </div>
          <div style={{ width: "2px", height: "30px", background: "var(--line)" }} />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {["Processors", "Exporters"].map(item => (
              <div key={item} style={{ padding: "10px 20px", background: "#f5f7f3", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px", fontWeight: 600, minWidth: "120px", textAlign: "center" }}>
                {item}
              </div>
            ))}
          </div>
          <div style={{ width: "2px", height: "30px", background: "var(--line)" }} />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {["Logistics", "Payment", "Admin"].map(item => (
              <div key={item} style={{ padding: "10px 20px", background: "#f5f7f3", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px", fontWeight: 600, minWidth: "120px", textAlign: "center" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">COMPONENTS</span>
          <h2>Core Components</h2>
        </div>
      </div>
      <table className="produce-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Functionality</th>
          </tr>
        </thead>
        <tbody>
          {SYSTEM_COMPONENTS.map((c, i) => (
            <tr key={i}>
              <td className="commodity-name" style={{ width: "200px" }}>{c.name}</td>
              <td style={{ color: "#708077", fontSize: "13px" }}>{c.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
