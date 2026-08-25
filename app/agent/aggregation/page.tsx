"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_AGGREGATIONS, MOCK_PRODUCE, MOCK_FARMERS } from "@/lib/data";
import { formatDate, getCommodityName } from "@/lib/data";

export default function AgentAggregation() {
  return (
    <DashboardLayout title="Aggregation" subtitle="Manage aggregated produce from connected farmers">
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Aggregation Summary</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Total Farmers</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>3</div>
          </div>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Total Volume</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>470t</div>
          </div>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Active Lots</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>{MOCK_AGGREGATIONS.length}</div>
          </div>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Est. Value</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>₦2.1M</div>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">AGGREGATED LOTS</span>
          <h2>Current Aggregations</h2>
        </div>
        <button className="btn btn-primary btn-sm">+ New Aggregation</button>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {MOCK_AGGREGATIONS.map((agg, i) => {
          const farmer = MOCK_FARMERS.find(f => f.id === agg.farmerId);
          const produce = MOCK_PRODUCE.find(p => p.id === agg.produceId);
          return (
            <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="avatar" style={{ width: "44px", height: "44px", fontSize: "14px", background: "#d9e8c9", color: "#2d5a1e" }}>
                  {farmer?.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "15px" }}>{farmer?.name}</div>
                  <div style={{ color: "#708077", fontSize: "12px" }}>{produce ? getCommodityName(produce.commodityId) : "N/A"} - {agg.quantity.toLocaleString()} tonnes</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span className={`grade ${agg.grade.toLowerCase()}`}>{agg.grade}</span>
                <span style={{ color: "#708077", fontSize: "12px" }}>{formatDate(agg.date)}</span>
                <button className="btn btn-outline btn-sm">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
