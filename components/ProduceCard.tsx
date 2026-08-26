"use client";

import Link from "next/link";
import { ProduceListing } from "@/lib/types";
import { formatPrice, getCommodityName } from "@/lib/data";

const GRADE_LABELS: Record<string, string> = {
  A: "Grade A",
  B: "Grade B",
  C: "Grade C",
  export: "Export",
};

export default function ProduceCard({ listing }: { listing: ProduceListing }) {
  const photo = listing.photos?.[0];
  const commodityName = getCommodityName(listing.commodityId);

  return (
    <Link href={`/market/${listing.id}`} className="produce-card card-link">
      <div className="card-image">
        {photo ? (
          <img src={photo} alt={commodityName} className="card-img" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div className="card-image-placeholder" />
        )}
        <span className={`card-grade ${listing.grade.toLowerCase()}`}>{GRADE_LABELS[listing.grade] || listing.grade}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{commodityName}</h3>
        {listing.variety && <p className="card-variety">{listing.variety}</p>}
        <div className="card-location">{listing.location}, {listing.state}</div>
        <div className="card-price-row">
          <strong className="card-price">{formatPrice(listing.price, listing.currency)}</strong>
          <span className="card-unit">per {listing.packaging.split(" ")[0]}{listing.packaging.split(" ").slice(1).join(" ")}</span>
        </div>
        <div className="card-meta">
          <span className="card-qty">{listing.quantity.toLocaleString()} {listing.packaging.split(" ")[1] || "units"} available</span>
          {listing.negotiable && <span className="card-negotiable">Negotiable</span>}
        </div>
      </div>
    </Link>
  );
}
