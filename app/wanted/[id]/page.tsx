"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import RatingBadge from "@/components/RatingBadge";
import { WantedRequest, Review, User } from "@/lib/types";
import { formatPrice, getCommodityName } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

export default function WantedDetailPage() {
  const params = useParams();
  const requestId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();
  const [request, setRequest] = useState<WantedRequest | null>(null);
  const [requester, setRequester] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [offerForm, setOfferForm] = useState({ quantity: "", price: "", message: "" });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/wanted/${requestId}`)
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (cancelled) return;
        if (data?.data) {
          setRequest(data.data);
          fetch(`/api/sellers/${data.data.requesterId}`)
            .then(response => response.ok ? response.json() : null)
            .then(sellerData => {
              if (!cancelled && sellerData?.data) {
                setRequester({
                  id: sellerData.data.id,
                  role: sellerData.data.role,
                  name: sellerData.data.name,
                  email: sellerData.data.email,
                  phone: sellerData.data.phone,
                  state: sellerData.data.state,
                  lga: sellerData.data.lga,
                  verificationLevel: sellerData.data.verificationLevel,
                  rating: sellerData.data.rating,
                  joinedDate: sellerData.data.joinedDate,
                });
                setReviews(sellerData.data.reviews || []);
              }
            })
            .catch(() => undefined);
        }
      })
      .catch(() => { if (!cancelled) setRequest(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [requestId]);

  const handleOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !request) return;
    setFeedback("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: request.requesterId,
          content: `I can supply ${offerForm.quantity} ${request.unit} of ${getCommodityName(request.commodityId)} at ${formatPrice(Number(offerForm.price))}. ${offerForm.message}`,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send offer.");
      setFeedback("Your offer has been sent to the buyer.");
      setOfferForm({ quantity: "", price: "", message: "" });
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Unable to send offer.");
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
          </div>
        </div>
      </>
    );
  }

  if (!request) {
    return (
      <>
        <MarketplaceHeader />
        <div className="marketplace-shell">
          <div className="marketplace-empty">
            <div className="empty-icon">🔍</div>
            <h3>Request not found</h3>
            <p>The request you are looking for does not exist or has been closed.</p>
            <button className="btn btn-primary" onClick={() => router.push("/wanted")}>Back to requests</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MarketplaceHeader />
      <main className="marketplace-shell">
        <div className="wanted-detail">
          <div className="wanted-detail-header">
            <h1>{getCommodityName(request.commodityId)}</h1>
            <span className={`wanted-status-badge status-${request.status}`}>{request.status}</span>
          </div>

          {request.variety && <p className="wanted-variety"><strong>Variety:</strong> {request.variety}</p>}

          <div className="wanted-detail-grid">
            <div className="wanted-detail-main">
              <div className="wanted-detail-section">
                <h3>Request Details</h3>
                <div className="detail-rows">
                  <div className="detail-row"><span>Quantity needed</span><strong>{request.quantity.toLocaleString()} {request.unit}</strong></div>
                  {request.budget && (
                    <div className="detail-row"><span>Budget</span><strong>{formatPrice(request.budget, request.budgetCurrency)}</strong></div>
                  )}
                  <div className="detail-row"><span>Negotiable</span><span>{request.negotiable ? "Yes" : "No"}</span></div>
                  <div className="detail-row"><span>Location</span><span>{request.location}, {request.state}</span></div>
                  <div className="detail-row"><span>Delivery method</span><span>{request.deliveryMethod}</span></div>
                  <div className="detail-row"><span>Date posted</span><span>{new Date(request.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</span></div>
                </div>
              </div>

              {request.notes && (
                <div className="wanted-detail-section">
                  <h3>Description</h3>
                  <p className="wanted-notes-full">{request.notes}</p>
                </div>
              )}

              {requester && (
                <div className="wanted-detail-section">
                  <h3>Buyer Information</h3>
                  <div className="seller-card">
                    <div className="seller-card-header">
                      <div className="seller-avatar">
                        <span>{requester.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div className="seller-info">
                        <h4>{requester.name}</h4>
                        <span className={`seller-role-badge seller-role-${requester.role}`}>{requester.role}</span>
                        <RatingBadge rating={requester.rating || 0} showValue={true} reviewCount={reviews.length} />
                      </div>
                    </div>
                    <p className="seller-location">{requester.state}, {requester.lga}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="wanted-detail-sidebar">
              {user && (user.role === "farmer" || user.role === "agent") && request.status === "open" ? (
                <div className="offer-form-card">
                  <h3>Make an Offer</h3>
                  <p>Supply what this buyer is looking for. They will contact you.</p>
                  <form className="offer-form" onSubmit={handleOffer}>
                    <div className="form-field">
                      <label>Quantity you can supply ({request.unit}) *</label>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={offerForm.quantity}
                        onChange={e => setOfferForm(f => ({ ...f, quantity: e.target.value }))}
                        placeholder={request.quantity.toString()}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Your price ({request.budgetCurrency}) *</label>
                      <input
                        type="number"
                        min="0"
                        value={offerForm.price}
                        onChange={e => setOfferForm(f => ({ ...f, price: e.target.value }))}
                        placeholder="e.g. 85000"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Additional details</label>
                      <textarea
                        value={offerForm.message}
                        onChange={e => setOfferForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Your message to the buyer..."
                        rows={3}
                      />
                    </div>
                    {feedback && (
                      <p role="status" className={`form-feedback ${feedback.includes("sent") ? "success" : "error"}`}>
                        {feedback}
                      </p>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={submitting}>
                      {submitting ? "Sending..." : "Send Offer"}
                    </button>
                  </form>
                </div>
              ) : user ? (
                <div className="offer-form-card">
                  <p style={{ fontSize: "13px", color: "#708077" }}>Only farmers and agents can make offers on buy requests.</p>
                </div>
              ) : (
                <div className="offer-form-card">
                  <h3>Contact the buyer</h3>
                  <p>Log in as a farmer or agent to make an offer on this request.</p>
                  <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => router.push("/login")}>
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
