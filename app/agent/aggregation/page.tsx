"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { formatDate, getCommodityName } from "@/lib/data";
import { useEffect, useState } from "react";
import type { AgentAggregation, ProduceListing, User } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";

export default function AgentAggregation() {
  const { user } = useAuth();
  const [aggregations, setAggregations] = useState<AgentAggregation[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [farmers, setFarmers] = useState<User[]>([]);
  useEffect(() => { if (user) fetch("/api/catalog").then(response => response.ok ? response.json() : null).then(data => { const catalog = data?.data; setAggregations((catalog?.aggregations ?? []).filter((item: AgentAggregation) => item.agentId === user.id)); setProduce(catalog?.produce ?? []); setFarmers((catalog?.users ?? []).filter((candidate: User) => candidate.role === "farmer")); }).catch(() => undefined); }, [user]);
  return (
    <DashboardLayout title="Aggregation" subtitle="Manage aggregated produce from connected farmers">
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>Aggregation Summary</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Total Farmers</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>{new Set(aggregations.map(item => item.farmerId)).size}</div>
          </div>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Total Volume</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>{aggregations.reduce((sum, item) => sum + item.quantity, 0)}t</div>
          </div>
          <div>
            <div style={{ color: "#708077", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Active Lots</div>
            <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>{aggregations.length}</div>
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
        {aggregations.map((agg, i) => {
          const farmer = farmers.find(candidate => candidate.id === agg.farmerId);
          const produceItem = produce.find(item => item.id === agg.produceId);
          return (
            <div key={i} style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="avatar" style={{ width: "44px", height: "44px", fontSize: "14px", background: "#d9e8c9", color: "#2d5a1e" }}>
                  {farmer?.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "15px" }}>{farmer?.name}</div>
                  <div style={{ color: "#708077", fontSize: "12px" }}>{produceItem ? getCommodityName(produceItem.commodityId) : "N/A"} - {agg.quantity.toLocaleString()} tonnes</div>
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
