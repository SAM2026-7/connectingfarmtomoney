"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";
import { Order, ProduceListing } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";

export default function AgentOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  useEffect(() => { if (user) fetch("/api/catalog").then(response => response.ok ? response.json() : null).then(data => { const catalog = data?.data; setOrders((catalog?.orders ?? []).filter((order: Order) => order.sellerId === user.id)); setProduce(catalog?.produce ?? []); }).catch(() => undefined); }, [user]);
  return (
    <DashboardLayout title="My Orders" subtitle="Track orders from your aggregated produce">
      <table className="produce-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Buyer</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td className="commodity-name">{o.id}</td>
              <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
              <td>Buyer #{o.buyerId}</td>
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
