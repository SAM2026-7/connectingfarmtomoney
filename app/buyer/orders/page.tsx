"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";
import { Order, ProduceListing } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";

export default function BuyerOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  useEffect(() => {
    if (!user) return;
    Promise.all([fetch("/api/orders"), fetch("/api/produce")]).then(async ([ordersResponse, produceResponse]) => {
      const ordersData = ordersResponse.ok ? await ordersResponse.json() : { data: [] };
      const produceData = produceResponse.ok ? await produceResponse.json() : { data: [] };
      setOrders(ordersData.data ?? []);
      setProduce(produceData.data ?? []);
    }).catch(() => { setOrders([]); setProduce([]); });
  }, [user]);

  return (
    <DashboardLayout title="My Orders" subtitle="Track and manage your purchases">
      <table className="produce-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Seller</th>
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
              <td>Seller #{o.sellerId}</td>
              <td>{o.quantity.toLocaleString()}</td>
              <td>{formatPrice(o.price)}</td>
              <td>{o.deliveryLocation}</td>
              <td><span className={`badge ${o.status === "completed" || o.status === "delivered" ? "badge-green" : o.status === "cancelled" ? "badge-red" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
              <td>{formatDate(o.createdAt)}</td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan={8} style={{ textAlign: "center", color: "#708077" }}>No orders yet.</td></tr>}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
