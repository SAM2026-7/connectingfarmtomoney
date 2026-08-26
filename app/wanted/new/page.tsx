"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import { useAuth } from "@/components/AuthProvider";
import { COMMODITIES, NIGERIAN_STATES } from "@/lib/data";
import { DeliveryMethod } from "@/lib/types";

export default function NewWantedPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    commodityId: "",
    variety: "",
    quantity: "",
    unit: "tonne",
    budget: "",
    budgetCurrency: "NGN",
    negotiable: true,
    location: "",
    state: "",
    deliveryMethod: "any",
    notes: "",
  });
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "buyer" && user.role !== "exporter") {
      router.replace("/market");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (user.role !== "buyer" && user.role !== "exporter") {
    return (
      <>
        <MarketplaceHeader />
        <main className="marketplace-shell">
          <div className="marketplace-empty">
            <div className="empty-icon">🔒</div>
            <h3>Authentication required</h3>
            <p>You need to be logged in as a buyer or exporter to post a wanted request.</p>
            <button className="btn btn-primary" onClick={() => router.push("/login")}>Go to Login</button>
          </div>
        </main>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFeedback("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/wanted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          budget: form.budget ? Number(form.budget) : undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to post request.");
      setFeedback("Request posted successfully. Redirecting...");
      setTimeout(() => router.push("/wanted"), 1500);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Unable to post request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user || (user.role !== "buyer" && user.role !== "exporter")) {
    return (
      <>
        <MarketplaceHeader />
        <main className="marketplace-shell">
          {feedback && <p className="form-feedback error">{feedback}</p>}
          <div className="marketplace-empty">
            <div className="empty-icon">🔒</div>
            <h3>Authentication required</h3>
            <p>You need to be logged in as a buyer or exporter to post a wanted request.</p>
            <button className="btn btn-primary" onClick={() => router.push("/login")}>Go to Login</button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <MarketplaceHeader />
      <main className="marketplace-shell">
        <div className="wanted-form-page">
          <h1>Post a Buy Request</h1>
          <p>Let sellers know what you need. Verified sellers will contact you directly.</p>

          <form className="wanted-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label>Commodity *</label>
                <select
                  value={form.commodityId}
                  onChange={e => setForm(f => ({ ...f, commodityId: e.target.value }))}
                  required
                >
                  <option value="">Select a commodity</option>
                  {COMMODITIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>Variety (optional)</label>
                <input
                  type="text"
                  value={form.variety}
                  onChange={e => setForm(f => ({ ...f, variety: e.target.value }))}
                  placeholder="e.g. TME 419, FARO 44"
                />
              </div>
              <div className="form-field">
                <label>Quantity *</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.quantity}
                  onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                  placeholder="e.g. 100"
                  required
                />
              </div>
              <div className="form-field">
                <label>Unit *</label>
                <select
                  value={form.unit}
                  onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                  required
                >
                  <option value="tonne">Tonne</option>
                  <option value="kg">kg</option>
                  <option value="litre">Litre</option>
                  <option value="crate">Crate</option>
                  <option value="bag">Bag</option>
                  <option value="head">Head</option>
                  <option value="bird">Bird</option>
                  <option value="piece">Piece</option>
                </select>
              </div>
              <div className="form-field">
                <label>Budget (optional)</label>
                <input
                  type="number"
                  min="0"
                  value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  placeholder="e.g. 500000"
                />
              </div>
              <div className="form-field">
                <label>Location *</label>
                <select
                  value={form.state}
                  onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                  required
                >
                  <option value="">Select a state</option>
                  {NIGERIAN_STATES.map(s => (
                    <option key={s.code} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>Delivery location / City *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="Enter city or delivery address"
                  required
                />
              </div>
              <div className="form-field">
                <label>Delivery method *</label>
                <select
                  value={form.deliveryMethod}
                  onChange={e => setForm(f => ({ ...f, deliveryMethod: e.target.value as DeliveryMethod }))}
                  required
                >
                  <option value="any">Any method</option>
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                  <option value="courier">Courier</option>
                </select>
              </div>
              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={form.negotiable}
                    onChange={e => setForm(f => ({ ...f, negotiable: e.target.checked }))}
                  />
                  Price is negotiable
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Describe your requirements, quality grade, delivery timeframe..."
                rows={4}
              />
            </div>

            {feedback && (
              <p role="status" className={`form-feedback ${feedback.includes("successfully") ? "success" : "error"}`}>
                {feedback}
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Posting..." : "Post Request"}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => router.push("/wanted")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
