"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { formatDate, getCommodityName } from "@/lib/data";
import { ProduceListing } from "@/lib/types";

export default function Quality() {
  const [inspection, setInspection] = useState({ produceId: "", moisture: "", condition: "", notes: "" });
  const [feedback, setFeedback] = useState("");
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [reports, setReports] = useState<ProduceListing[]>([]);
  useEffect(() => { fetch("/api/produce").then(response => response.ok ? response.json() : null).then(data => setProduce(data?.data ?? [])).catch(() => setProduce([])); }, []);

  const submitInspection = () => {
    const moisture = Number(inspection.moisture);
    if (!inspection.produceId || !Number.isFinite(moisture) || moisture < 0 || moisture > 100 || !inspection.condition) {
      setFeedback("Produce, moisture level, and physical condition are required.");
      return;
    }
    const selected = produce.find(item => item.id === inspection.produceId);
    if (selected) setReports(current => [selected, ...current]);
    setFeedback("Inspection submitted successfully.");
    setInspection({ produceId: "", moisture: "", condition: "", notes: "" });
  };

  return (
    <DashboardLayout title="Quality Assurance" subtitle="Inspect and grade produce quality">
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-label">Inspections This Month</div>
          <div className="stat-value">24</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Grade A</div>
          <div className="stat-value">62%</div>
          <div className="stat-change positive">+5%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Export Quality</div>
          <div className="stat-value">18%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Rejected</div>
          <div className="stat-value">3%</div>
          <div className="stat-change negative">-2%</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">INSPECTION</span>
          <h2>New Inspection</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Produce</label>
            <select value={inspection.produceId} onChange={e => setInspection({ ...inspection, produceId: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
              <option value="">Select produce</option>
              {produce.map(p => <option key={p.id} value={p.id}>{getCommodityName(p.commodityId)} - {p.variety}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Moisture Level (%)</label>
            <input type="number" value={inspection.moisture} onChange={e => setInspection({ ...inspection, moisture: e.target.value })} placeholder="e.g. 12" style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Physical Condition</label>
            <select value={inspection.condition} onChange={e => setInspection({ ...inspection, condition: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Assigned Grade</label>
            <select style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
              <option value="export">Export Quality</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#708077", marginBottom: "6px" }}>Notes</label>
          <textarea value={inspection.notes} onChange={e => setInspection({ ...inspection, notes: e.target.value })} rows={3} placeholder="Inspection notes..." style={{ width: "100%", padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px", resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button className="btn btn-primary" onClick={submitInspection}>Submit Inspection</button>
          <button className="btn btn-outline" onClick={() => setInspection({ produceId: "", moisture: "", condition: "", notes: "" })}>Reset</button>
        </div>
        {feedback && <p role="status" style={{ margin: "14px 0 0", color: feedback.includes("successfully") ? "var(--royal-green)" : "#a33a2a", fontSize: "13px" }}>{feedback}</p>}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">RECENT INSPECTIONS</span>
          <h2>Inspection Reports</h2>
        </div>
      </div>
      <table className="produce-table">
        <thead>
          <tr>
            <th>Produce</th>
            <th>Moisture</th>
            <th>Condition</th>
            <th>Grade</th>
            <th>Inspector</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {[...reports, ...produce.filter(item => !reports.some(report => report.id === item.id)).slice(0, 5)].map((p, i) => (
            <tr key={p.id}>
              <td className="commodity-name">{getCommodityName(p.commodityId)}</td>
              <td>{i < reports.length ? "Recorded" : "Pending"}</td>
              <td>Good</td>
              <td><span className={`grade ${p.grade.toLowerCase()}`}>{p.grade}</span></td>
              <td>Field Inspector</td>
              <td>{formatDate(p.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
