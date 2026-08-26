"use client";

import Link from "next/link";
import { WantedRequest } from "@/lib/types";
import { formatPrice, getCommodityName } from "@/lib/data";

const STATUS_COLORS: Record<string, string> = {
  open: "#2d654d",
  matched: "#7a4e1e",
  closed: "#6b7280",
};

const DELIVERY_LABELS: Record<string, string> = {
  pickup: "Pickup",
  delivery: "Delivery",
  courier: "Courier",
  any: "Any method",
};

export default function WantedCard({ request }: { request: WantedRequest }) {
  const commodityName = getCommodityName(request.commodityId);
  const statusColor = STATUS_COLORS[request.status] || STATUS_COLORS.open;

  return (
    <Link href={`/wanted/${request.id}`} className="wanted-card card-link">
      <div className="wanted-card-header">
        <span className="wanted-commodity">{commodityName}</span>
        <span className="wanted-status" style={{ color: statusColor }}>{request.status}</span>
      </div>
      <div className="wanted-card-body">
        {request.variety && <p className="wanted-variety">{request.variety}</p>}
        <div className="wanted-qty">{request.quantity.toLocaleString()} {request.unit} needed</div>
        {request.budget && (
          <div className="wanted-budget">
            Budget: <strong>{formatPrice(request.budget, request.budgetCurrency)}</strong>
            {request.negotiable && <span className="wanted-negotiable"> (negotiable)</span>}
          </div>
        )}
        <div className="wanted-location">{request.location}, {request.state}</div>
        <div className="wanted-delivery">{DELIVERY_LABELS[request.deliveryMethod]}</div>
      </div>
      <div className="wanted-card-footer">
        <span className="wanted-date">{new Date(request.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
        {request.notes && <p className="wanted-notes">{request.notes.slice(0, 80)}{request.notes.length > 80 ? "…" : ""}</p>}
      </div>
    </Link>
  );
}
