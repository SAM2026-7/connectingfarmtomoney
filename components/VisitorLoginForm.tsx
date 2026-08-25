"use client";

import { useState, type FormEvent } from "react";
import { VisitorUserClass } from "@/lib/types";

const USER_CLASSES: { value: VisitorUserClass; label: string; desc: string }[] = [
  { value: "farmer", label: "Farmer", desc: "Growing crops or rearing livestock" },
  { value: "buyer", label: "Buyer", desc: "Procuring produce for business" },
  { value: "agent", label: "Marketing Agent", desc: "Aggregating produce for buyers" },
  { value: "exporter", label: "Exporter", desc: "Buying export-quality commodities" },
  { value: "admin", label: "Manufacturer / Admin", desc: "Platform manufacturer access" },
];

export default function VisitorLoginForm({ onRegistered }: { onRegistered?: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<VisitorUserClass | "">("");
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/visitors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim(), role, visitDate }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      setFeedback({ type: "success", text: "Login recorded. Thank you for visiting FarmToMoney." });
      setName("");
      setPhone("");
      setEmail("");
      setRole("");
      setVisitDate(new Date().toISOString().split("T")[0]);
      onRegistered?.();
    } catch (err) {
      setFeedback({ type: "error", text: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="visitor-login-wrapper">
      <div className="visitor-login-card">
        <div className="visitor-login-header">
          <span className="leaf-mark">✦</span>
          <h2>Visitor Login</h2>
          <p>Record your visit to FarmToMoney</p>
        </div>

        <form className="visitor-login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="vl-name">Full Name</label>
            <input
              id="vl-name"
              type="text"
              placeholder="Adebayo Ogundimu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="vl-phone">Phone Number</label>
            <input
              id="vl-phone"
              type="tel"
              placeholder="+234 803 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="vl-email">Email Address</label>
            <input
              id="vl-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="vl-role">Class of User</label>
            <select
              id="vl-role"
              value={role}
              onChange={(e) => setRole(e.target.value as VisitorUserClass)}
              required
            >
              <option value="" disabled>
                Select a class
              </option>
              {USER_CLASSES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="vl-date">Date of Visit</label>
            <input
              id="vl-date"
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              required
            />
          </div>

          {feedback && (
            <div className={`visitor-feedback ${feedback.type}`}>
              {feedback.text}
            </div>
          )}

          <button type="submit" className="visitor-submit" disabled={submitting || !name.trim() || !phone.trim() || !email.trim() || !role}>
            {submitting ? "Recording..." : "Record Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
