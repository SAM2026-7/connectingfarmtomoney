"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import RatingBadge from "@/components/RatingBadge";
import { ProduceListing, Review } from "@/lib/types";
import { formatPrice, getCommodityName } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

interface SellerProfileData {
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

const GRADE_LABELS: Record<string, string> = {
  A: "Grade A",
  B: "Grade B",
  C: "Grade C",
  export: "Export Quality",
};

function ProductDetailContent() {
  const params = useParams();
  const produceId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();
  const [listing, setListing] = useState<ProduceListing | null>(null);
  const [seller, setSeller] = useState<SellerProfileData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestQty, setRequestQty] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/produce/${produceId}`)
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (cancelled) return;
        const item = data?.data;
        if (item) {
          setListing(item);
          fetch(`/api/sellers/${item.sellerId}`)
            .then(response => response.ok ? response.json() : null)
            .then(sellerData => {
              if (!cancelled && sellerData?.data) {
                setSeller(sellerData.data);
                setReviews(sellerData.data.reviews || []);
              }
            })
            .catch(() => undefined);
        }
      })
      .catch(() => { if (!cancelled) setListing(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [produceId]);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !listing) return;
    setFeedback("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produceId: listing.id,
          buyerId: user.id,
          sellerId: listing.sellerId,
          quantity: Number(requestQty),
          price: listing.price,
          deliveryLocation,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to place request.");
      setFeedback("Order request sent successfully.");
      setRequestQty("");
      setDeliveryLocation("");
      setNotes("");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Unable to place request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <MarketplaceHeader />
        <div className="marketplace-shell">
          <div className="product-loading">
            <div className="loading-skeleton loading-skeleton-large" />
            <div className="loading-skeleton loading-skeleton-text" />
            <div className="loading-skeleton loading-skeleton-text" />
          </div>
        </div>
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <MarketplaceHeader />
        <div className="marketplace-shell">
          <div className="marketplace-empty">
            <div className="empty-icon">🔍</div>
            <h3>Listing not found</h3>
            <p>The produce you are looking for is no longer available.</p>
            <button className="btn btn-primary" onClick={() => router.push("/market")}>Back to marketplace</button>
          </div>
        </div>
      </>
    );
  }

  const photos = listing.photos && listing.photos.length > 0 ? listing.photos : [];

  return (
    <>
      <MarketplaceHeader />
      <main className="marketplace-shell">
        <div className="product-detail">
          <div className="product-gallery">
            <div className="product-main-photo">
              {photos.length > 0 ? (
                <img src={photos[selectedPhoto]} alt={getCommodityName(listing.commodityId)} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              ) : (
                <div className="card-image-placeholder">No image available</div>
              )}
              <span className={`product-grade ${listing.grade.toLowerCase()}`}>{GRADE_LABELS[listing.grade]}</span>
            </div>
            {photos.length > 1 && (
              <div className="product-thumbs">
                {photos.map((photo, i) => (
                  <button
                    key={i}
                    className={`product-thumb ${i === selectedPhoto ? "active" : ""}`}
                    onClick={() => setSelectedPhoto(i)}
                  >
                    <img src={photo} alt={`Photo ${i + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1 className="product-title">{getCommodityName(listing.commodityId)}</h1>
            {listing.variety && <p className="product-variety">{listing.variety}</p>}
            <div className="product-price">{formatPrice(listing.price, listing.currency)}</div>
            <div className="product-meta-row">
              <span className="meta-item"><strong>Package:</strong> {listing.packaging}</span>
              <span className="meta-item"><strong>Min Order:</strong> {listing.minOrder} {listing.packaging.split(" ")[1] || "units"}</span>
            </div>
            <div className="product-meta-row">
              <span className="meta-item"><strong>Available:</strong> {listing.quantity.toLocaleString()} {listing.packaging.split(" ")[1] || "units"}</span>
              <span className="meta-item"><strong>Available from:</strong> {new Date(listing.availableDate).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
            </div>
            <div className="product-meta-row">
              <span className="meta-item"><strong>Harvest date:</strong> {listing.harvestDate}</span>
              <span className="meta-item"><strong>Storage:</strong> {listing.storageCondition || "Not specified"}</span>
            </div>
            {listing.negotiable && <span className="negotiable-badge">Price negotiable</span>}
            {listing.description && <p className="product-description">{listing.description}</p>}
          </div>
        </div>

        {seller && (
          <div className="seller-section">
            <div className="seller-card">
              <div className="seller-card-header">
                <div className="seller-avatar">
                  {seller.avatar ? <img src={seller.avatar} alt={seller.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} /> : <span>{seller.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</span>}
                </div>
                <div className="seller-info">
                  <h3>{seller.name}</h3>
                  <RatingBadge rating={seller.rating || 0} size="md" showValue={true} reviewCount={reviews.length} />
                </div>
              </div>
              <p className="seller-location">{seller.state}, {seller.lga}</p>
              <div className="seller-stats">
                <span className="stat"><strong>{seller.produceCount}</strong> Active listings</span>
                <span className="stat"><strong>{seller.joinedDate}</strong> Joined</span>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => router.push(`/market/seller/${seller.id}`)}
              >
                View seller profile
              </button>
            </div>
          </div>
        )}

        <div className="order-section">
          <h2>Request this produce</h2>
          {user ? (
            user.role === "buyer" || user.role === "exporter" ? (
              <form className="order-form" onSubmit={handleRequest}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Quantity</label>
                    <input
                      type="number"
                      min="0.01"
                      max={listing.quantity}
                      step="0.01"
                      value={requestQty}
                      onChange={e => setRequestQty(e.target.value)}
                      placeholder={`Max ${listing.quantity.toLocaleString()}`}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Delivery location</label>
                    <input
                      type="text"
                      value={deliveryLocation}
                      onChange={e => setDeliveryLocation(e.target.value)}
                      placeholder="Enter delivery address"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Special requirements, preferred delivery date..."
                    rows={3}
                  />
                </div>
                {feedback && (
                  <p role="status" className={`form-feedback ${feedback.includes("successfully") ? "success" : "error"}`}>
                    {feedback}
                  </p>
                )}
                <button type="submit" className="btn btn-primary" disabled={submitting || !requestQty || !deliveryLocation}>
                  {submitting ? "Sending..." : "Send Order Request"}
                </button>
              </form>
            ) : (
              <div className="auth-prompt">
                <p>Only buyers and exporters can place order requests. <a href="/login">Switch role</a></p>
              </div>
            )
          ) : (
            <div className="auth-prompt">
              <p>You need to log in to request this produce.</p>
              <button className="btn btn-primary" onClick={() => router.push("/login")}>Login to Order</button>
            </div>
          )}
        </div>

        {reviews.length > 0 && (
          <div className="reviews-section">
            <h2>Reviews for {seller?.name}</h2>
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

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
