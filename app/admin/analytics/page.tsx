"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_PRODUCE, MOCK_ORDERS, MOCK_FARMERS, MOCK_AGENTS, MOCK_BUYERS, MOCK_EXPORTERS } from "@/lib/data";

export default function EnhancedAdmin() {
  const totalVolume = MOCK_PRODUCE.reduce((sum, p) => sum + p.quantity, 0);
  const totalValue = MOCK_ORDERS.reduce((sum, o) => sum + o.price, 0);

  return (
    <DashboardLayout title="Admin Analytics" subtitle="Platform-wide insights and management">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{MOCK_FARMERS.length + MOCK_AGENTS.length + MOCK_BUYERS.length + MOCK_EXPORTERS.length}</div>
          <div className="stat-change positive">+12 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Listings</div>
          <div className="stat-value">{MOCK_PRODUCE.filter(p => p.status === "active").length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{MOCK_ORDERS.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Platform Revenue</div>
          <div className="stat-value">₦{(totalValue * 0.02).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Volume</div>
          <div className="stat-value">{totalVolume.toLocaleString()}t</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">GMV</div>
          <div className="stat-value">₦{totalValue.toLocaleString()}</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">USERS</span>
          <h2>User Distribution</h2>
        </div>
      </div>
      <table className="produce-table" style={{ marginBottom: "40px" }}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Count</th>
            <th>Verified</th>
            <th>Avg Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="commodity-name">Farmers</td>
            <td>{MOCK_FARMERS.length}</td>
            <td>{MOCK_FARMERS.filter(f => f.verificationLevel !== "unverified").length}</td>
            <td>{(MOCK_FARMERS.reduce((s, f) => s + (f.rating || 0), 0) / MOCK_FARMERS.length).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
          <tr>
            <td className="commodity-name">Agents</td>
            <td>{MOCK_AGENTS.length}</td>
            <td>{MOCK_AGENTS.filter(a => a.verificationLevel !== "unverified").length}</td>
            <td>{(MOCK_AGENTS.reduce((s, a) => s + (a.rating || 0), 0) / MOCK_AGENTS.length).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
          <tr>
            <td className="commodity-name">Buyers</td>
            <td>{MOCK_BUYERS.length}</td>
            <td>{MOCK_BUYERS.filter(b => b.verificationLevel !== "unverified").length}</td>
            <td>{(MOCK_BUYERS.reduce((s, b) => s + (b.rating || 0), 0) / MOCK_BUYERS.length).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
          <tr>
            <td className="commodity-name">Exporters</td>
            <td>{MOCK_EXPORTERS.length}</td>
            <td>{MOCK_EXPORTERS.filter(e => e.verificationLevel !== "unverified").length}</td>
            <td>{(MOCK_EXPORTERS.reduce((s, e) => s + (e.rating || 0), 0) / MOCK_EXPORTERS.length).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
        </tbody>
      </table>

      <div className="section-heading">
        <div>
          <span className="section-kicker">GEOGRAPHY</span>
          <h2>Supply vs Demand</h2>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", marginBottom: "40px" }}>
        <p style={{ margin: "0 0 16px", color: "#708077", fontSize: "13px" }}>Map visualization showing supply hotspots and demand centres across Nigeria.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div style={{ padding: "16px", background: "#f5f7f3", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#708077", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>High Supply</div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Oyo, Kaduna, Kano</div>
          </div>
          <div style={{ padding: "16px", background: "#f5f7f3", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#708077", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>High Demand</div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Lagos, FCT, Rivers</div>
          </div>
          <div style={{ padding: "16px", background: "#f5f7f3", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#708077", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Opportunity</div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Connect Oyo to Lagos</div>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">ACTIVITY</span>
          <h2>Recent Activity</h2>
        </div>
      </div>
      <table className="produce-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="commodity-name">Adebayo Ogundimu</td>
            <td>Listed produce</td>
            <td>50t Cassava (TME 419)</td>
            <td>2 hours ago</td>
          </tr>
          <tr>
            <td className="commodity-name">Lagos Foods & Beverages</td>
            <td>Placed order</td>
            <td>20t Cassava - ₦85,000/t</td>
            <td>5 hours ago</td>
          </tr>
          <tr>
            <td className="commodity-name">Fatima Ibrahim</td>
            <td>Updated listing</td>
            <td>100t Sesame (White)</td>
            <td>Yesterday</td>
          </tr>
          <tr>
            <td className="commodity-name">West Africa Export Ltd</td>
            <td>Posted export request</td>
            <td>500t Cocoa - Europe</td>
            <td>2 days ago</td>
          </tr>
        </tbody>
      </table>
    </DashboardLayout>
  );
}
