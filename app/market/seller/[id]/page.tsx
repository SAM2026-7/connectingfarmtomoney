"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import ProduceCard from "@/components/ProduceCard";
import RatingBadge from "@/components/RatingBadge";
import { ProduceListing, Review } from "@/lib/types";

interface SellerProfile {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  verificationLevel: string;
  rating: number;
  joinedDate: string;
  produceCount: number;
  avatar?: string;
}

export default function SellerProfilePage() {
  const params = useParams();
  const sellerId = params.id as string;
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/sellers/${sellerId}`)
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (cancelled) return;
        const profile = data?.data;
        if (profile) {
          setSeller(profile);
        }
      })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [sellerId]);

  if (loading) {
    return (
      <>
        <MarketplaceHeader />
        <div className="marketplace-shell">
          <div className="seller-loading">
            <div className="loading-skeleton loading-skeleton-large" />
          </div>
        </div>
      </>
    );
  }

  if (!seller) {
    return (
      <>
        <MarketplaceHeader />
        <div className="marketplace-shell">
          <div className="marketplace-empty">
            <div className="empty-icon">🔍</div>
            <h3>Seller not found</h3>
            <p>The seller you are looking for does not exist.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MarketplaceHeader />
      <main className="marketplace-shell">
        <div className="seller-profile-header">
          <div className="seller-profile-avatar">
            {seller.id && (
              <span className="seller-initials">
                {seller.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="seller-profile-info">
            <h1 className="seller-profile-name">{seller.name}</h1>
            <span className={`seller-role-badge seller-role-${seller.role}`}>{seller.role}</span>
            <RatingBadge rating={seller.rating || 0} size="md" showValue={true} reviewCount={reviews.length} />
            <p className="seller-location">{seller.state}, {seller.lga}</p>
            <div className="seller-meta-row">
              <span className="meta-item"><strong>Joined:</strong> {new Date(seller.joinedDate).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}</span>
              <span className="meta-item"><strong>Verification:</strong> <span className={`badge badge-${seller.verificationLevel === "trusted" ? "green" : seller.verificationLevel === "business_verified" || seller.verificationLevel === "trade_verified" || seller.verificationLevel === "identity_verified" ? "blue" : "yellow"}`}>{seller.verificationLevel.replace("_", " ")}</span></span>
            </div>
          </div>
        </div>

        <div className="seller-section">
          <h2>Available Produce</h2>
          {produce.length > 0 ? (
            <div className="marketplace-grid">
              {produce.map(listing => (
                <ProduceCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="marketplace-empty" style={{ gridColumn: "1 / -1" }}>
              <p>No active listings.</p>
            </div>
          )}
        </div>

        {reviews.length > 0 && (
          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <RatingBadge rating={review.rating} showValue={false} />
                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
