"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Order, ProduceListing, User, VisitorRecord } from "@/lib/types";

export default function EnhancedAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [visitorsError, setVisitorsError] = useState(false);
  useEffect(() => {
    fetch("/api/admin/summary")
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        setUsers(data?.data?.users ?? []);
        setProduce(data?.data?.produce ?? []);
        setOrders(data?.data?.orders ?? []);
      })
      .catch(() => { setUsers([]); setProduce([]); setOrders([]); });
    fetch("/api/admin/visitors")
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data?.data) {
          setVisitors(data.data);
        } else {
          setVisitorsError(true);
        }
      })
      .catch(() => { setVisitorsError(true); });
  }, []);
  const totalVolume = produce.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = orders.reduce((sum, order) => sum + order.price, 0);
  const roleUsers = (role: User["role"]) => users.filter(user => user.role === role);

  return (
    <DashboardLayout title="Admin Analytics" subtitle="Platform-wide insights and management">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-change positive">+12 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Listings</div>
          <div className="stat-value">{produce.filter(item => item.status === "active").length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{orders.length}</div>
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
            <td>{roleUsers("farmer").length}</td>
            <td>{roleUsers("farmer").filter(user => user.verificationLevel !== "unverified").length}</td>
            <td>{(roleUsers("farmer").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(roleUsers("farmer").length, 1)).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
          <tr>
            <td className="commodity-name">Agents</td>
            <td>{roleUsers("agent").length}</td>
            <td>{roleUsers("agent").filter(user => user.verificationLevel !== "unverified").length}</td>
            <td>{(roleUsers("agent").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(roleUsers("agent").length, 1)).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
          <tr>
            <td className="commodity-name">Buyers</td>
            <td>{roleUsers("buyer").length}</td>
            <td>{roleUsers("buyer").filter(user => user.verificationLevel !== "unverified").length}</td>
            <td>{(roleUsers("buyer").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(roleUsers("buyer").length, 1)).toFixed(1)}</td>
            <td><span className="badge badge-green">Active</span></td>
          </tr>
          <tr>
            <td className="commodity-name">Exporters</td>
            <td>{roleUsers("exporter").length}</td>
            <td>{roleUsers("exporter").filter(user => user.verificationLevel !== "unverified").length}</td>
            <td>{(roleUsers("exporter").reduce((sum, user) => sum + (user.rating || 0), 0) / Math.max(roleUsers("exporter").length, 1)).toFixed(1)}</td>
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

      <div className="section-heading" style={{ marginTop: "50px" }}>
        <div>
          <span className="section-kicker">VISITOR LOGINS</span>
          <h2>Visitor Records</h2>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#708077" }}>{visitors.length} recorded</span>
          <a
            href="/api/admin/visitors?format=csv"
            className="outline-button"
            style={{ borderBottom: "none" }}
            onClick={(e) => {
              if (visitorsError) {
                e.preventDefault();
              }
            }}
            aria-disabled={visitorsError}
          >
            <span>↓</span> Export CSV
          </a>
        </div>
      </div>

      {visitorsError ? (
        <div className="empty-state">
          <strong>Unable to load visitor records</strong>
          <span>Make sure you are logged in as an admin (manufacturer).</span>
        </div>
      ) : visitors.length === 0 ? (
        <div className="empty-state">
          <strong>No visitor records yet</strong>
          <span>Visitors who record a login on the front page will appear here.</span>
        </div>
      ) : (
        <table className="produce-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Date of Visit</th>
              <th>Recorded</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v) => (
              <tr key={v.id}>
                <td className="commodity-name">{v.name}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td>{v.role}</td>
                <td>{v.visitDate}</td>
                <td style={{ color: "#708077", fontSize: "12px" }}>{v.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
}
