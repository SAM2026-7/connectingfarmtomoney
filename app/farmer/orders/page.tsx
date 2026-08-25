"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice, formatDate, getCommodityName } from "@/lib/data";
import { Order, ProduceListing, User } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";

export default function FarmerOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [buyers, setBuyers] = useState<User[]>([]);
  useEffect(() => {
    if (!user) return;
    Promise.all([fetch("/api/orders"), fetch("/api/produce"), fetch("/api/users")])
      .then(async ([ordersResponse, produceResponse, usersResponse]) => {
        const ordersData = ordersResponse.ok ? await ordersResponse.json() : { data: [] };
        const produceData = produceResponse.ok ? await produceResponse.json() : { data: [] };
        const usersData = usersResponse.ok ? await usersResponse.json() : { data: [] };
        setOrders(ordersData.data ?? []);
        setProduce(produceData.data ?? []);
        setBuyers(usersData.data ?? []);
      }).catch(() => { setOrders([]); setProduce([]); setBuyers([]); });
  }, [user]);

  const buyerName = (id: string) => (buyers.find(b => b.id === id)?.name) || `Buyer #${id}`;

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
              <th>Contact</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td className="commodity-name">{o.id}</td>
              <td>{buyerName(o.buyerId)}</td>
              <td>{getCommodityName(produce.find(p => p.id === o.produceId)?.commodityId || "")}</td>
              <td>{o.quantity.toLocaleString()}</td>
              <td>{formatPrice(o.price)}</td>
              <td>{o.deliveryLocation}</td>
              <td><span className={`badge ${o.status === "completed" || o.status === "delivered" ? "badge-green" : o.status === "cancelled" ? "badge-red" : "badge-yellow"}`}>{o.status.replace("_", " ")}</span></td>
              <td><button className="btn btn-outline btn-sm" onClick={() => router.push(`/messages?chat=${o.buyerId}`)}>Message</button></td>
              <td>{formatDate(o.createdAt)}</td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan={9} style={{ textAlign: "center", color: "#708077" }}>No orders yet.</td></tr>}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
