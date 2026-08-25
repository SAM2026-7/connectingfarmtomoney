"use client";

import DashboardLayout from "@/components/DashboardLayout";

const AI_FEATURES = [
  {
    title: "AI Price Prediction",
    icon: "📈",
    desc: "Predict likely price movement using historical transaction data, seasonality, and market trends.",
    status: "In Development",
    color: "#2d654d",
  },
  {
    title: "AI Buyer-Seller Matching",
    icon: "🤝",
    desc: "Automatically match buyer requirements with the best suppliers. Example: \"Buyer needs 50 tonnes of cocoa\" → finds optimal suppliers.",
    status: "Planned",
    color: "#1e4d8c",
  },
  {
    title: "AI Demand Forecasting",
    icon: "📊",
    desc: "Predict which commodities may experience higher demand based on export data, seasonality, and buyer patterns.",
    status: "Planned",
    color: "#7a4e1e",
  },
  {
    title: "AI Fraud Detection",
    icon: "🛡️",
    desc: "Identify unusual transactions and suspicious accounts using pattern recognition and anomaly detection.",
    status: "Research",
    color: "#5e1e4d",
  },
  {
    title: "AI Agricultural Assistant",
    icon: "🌱",
    desc: "Farmers can ask: \"Where can I sell my 20 tonnes of maize?\" The system responds using live marketplace data.",
    status: "In Development",
    color: "#4a5e1e",
  },
];

export default function AIFeatures() {
  return (
    <DashboardLayout title="AI Features" subtitle="Artificial Intelligence capabilities for the marketplace">
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
        <p style={{ margin: "0", color: "#708077", fontSize: "14px", lineHeight: "1.6" }}>
          AI features will be added after sufficient transaction and marketplace data is collected. These features are designed to enhance matching, pricing, and security across the platform.
        </p>
      </div>

      <div style={{ display: "grid", gap: "20px", marginBottom: "40px" }}>
        {AI_FEATURES.map((feature, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "12px", padding: "24px", display: "flex", gap: "20px", alignItems: "start" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: feature.color, color: "white", display: "grid", placeItems: "center", fontSize: "24px", flexShrink: 0 }}>
              {feature.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "17px" }}>{feature.title}</h3>
                <span className={`badge ${feature.status === "In Development" ? "badge-green" : feature.status === "Planned" ? "badge-yellow" : "badge-blue"}`}>{feature.status}</span>
              </div>
              <p style={{ margin: 0, color: "#708077", fontSize: "13px", lineHeight: "1.6" }}>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">ROADMAP</span>
          <h2>AI Implementation Timeline</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px" }}>
        <div style={{ display: "grid", gap: "16px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#2d654d", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>Phase 1: Data Collection</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>Gather 6+ months of transaction data</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#d9a441", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>Phase 2: Model Development</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>Build price prediction and matching algorithms</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1e4d8c", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>Phase 3: Integration</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>Deploy AI features across farmer, buyer, and agent dashboards</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#5e1e4d", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>Phase 4: Advanced Features</div>
              <div style={{ color: "#708077", fontSize: "12px" }}>Fraud detection, demand forecasting, agricultural assistant</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
