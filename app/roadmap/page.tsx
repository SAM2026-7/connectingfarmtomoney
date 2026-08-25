"use client";

import DashboardLayout from "@/components/DashboardLayout";

const VERSION_PHASES = [
  {
    version: "MVP — Version 1",
    period: "Months 1-3",
    color: "#2d654d",
    features: [
      { category: "Farmer", items: ["Registration", "Profile", "Add produce", "Upload photos", "Quantity", "Price", "Location", "Availability"] },
      { category: "Marketing Agent", items: ["Registration", "Farmer management", "Produce aggregation", "Bulk listings", "Buyer enquiries"] },
      { category: "Buyer", items: ["Registration", "Search produce", "Filter products", "Contact seller/agent", "Request quotation", "Place order"] },
      { category: "Exporter", items: ["Registration", "Search export-quality produce", "Submit requirements", "Contact agents", "Request bulk supply"] },
      { category: "Platform", items: ["Verification", "Messaging", "Notifications", "Orders", "Basic payments", "Admin dashboard"] },
    ],
  },
  {
    version: "Version 2",
    period: "Months 4-6",
    color: "#1e4d8c",
    features: [
      { category: "Enhanced Platform", items: ["Escrow payments", "Logistics management", "Transporter marketplace", "Quality grading", "Ratings & reviews", "Market prices", "Advanced analytics", "Agent commissions", "Digital receipts"] },
    ],
  },
  {
    version: "Version 3",
    period: "Months 7-12",
    color: "#7a4e1e",
    features: [
      { category: "Advanced Ecosystem", items: ["Export management", "Export documentation", "AI matching", "Price forecasting", "Demand forecasting", "Digital warehouse management", "Warehouse receipts", "Financing partnerships", "Insurance partnerships", "Agricultural input marketplace", "Farmer financing", "Advanced market intelligence"] },
    ],
  },
];

export default function Roadmap() {
  return (
    <DashboardLayout title="Product Roadmap" subtitle="MVP, Version 2, and Version 3 feature plans">
      <div style={{ display: "grid", gap: "24px", marginBottom: "40px" }}>
        {VERSION_PHASES.map((phase, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: phase.color, color: "white", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.8, marginBottom: "4px" }}>{phase.period}</div>
                  <h3 style={{ margin: 0, fontSize: "20px" }}>{phase.version}</h3>
                </div>
                <div style={{ fontSize: "12px", background: "rgba(255,255,255,0.2)", padding: "6px 14px", borderRadius: "20px" }}>
                  {phase.features.reduce((s, f) => s + f.items.length, 0)} Features
                </div>
              </div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                {phase.features.map((group, j) => (
                  <div key={j}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#708077", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>{group.category}</div>
                    <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: "13px", color: "var(--ink)", lineHeight: "1.8" }}>
                      {group.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">LONG-TERM</span>
          <h2>Business Ecosystem</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px" }}>
        <p style={{ margin: "0 0 20px", color: "#708077", fontSize: "14px", lineHeight: "1.6" }}>
          Eventually, the platform can evolve from a produce marketplace into a complete agricultural commerce ecosystem:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
          {["Farmers", "Agricultural Marketing Agents", "Aggregation", "Quality Verification", "Marketplace", "Processors / Wholesalers / Retailers / Exporters", "Logistics", "Payment", "Market Intelligence"].map((item, i) => (
            <span key={i} className="badge badge-green" style={{ padding: "8px 14px", fontSize: "12px" }}>{item}</span>
          ))}
        </div>
        <p style={{ margin: 0, color: "#708077", fontSize: "14px", lineHeight: "1.6" }}>
          And alongside this: <strong>Finance + Insurance + Inputs + Extension + Storage</strong> — creating a much stronger business than simply allowing farmers to post adverts.
        </p>
      </div>
    </DashboardLayout>
  );
}
