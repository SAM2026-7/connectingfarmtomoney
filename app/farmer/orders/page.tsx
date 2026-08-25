"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_ORDERS, MOCK_PRODUCE } from "@/lib/data";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";

export default function FarmerOrders() {
  return (
    <DashboardLayout title="My Orders" subtitle="Track and manage your orders">
      <table className="produce-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_ORDERS.map(o => (
            <tr key={o.id}>
              <td className="commodity-name">{o.id}</td>
              <td>Buyer #{o.buyerId}</td>
              <td>{getCommodityName(MOCK_PRODUCE.find(p => p.id === o.produceId)?.commodityId || "")}</td>
              <td>{o.quantity.toLocaleString()}</td>
              <td>{formatPrice(o.price)}</td>
              <td>{o.deliveryLocation}</td>
              <td><span className={`badge ${o.status === "completed" || o.status === "delivered" ? "badge-green" : o.status === "cancelled" ? "badge-red" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
              <td>{formatDate(o.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
