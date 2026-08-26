"use client";

const STAR_COLORS = {
  filled: "#e6a23c",
  empty: "#e0e0e0",
};

export default function RatingBadge({ rating, size = "sm", showValue = true, reviewCount }: { rating: number; size?: "sm" | "md"; showValue?: boolean; reviewCount?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const stars = Array(fullStars).fill("full").concat(hasHalf ? ["half"] : []).concat(Array(emptyStars).fill("empty"));

  const starSize = size === "md" ? 16 : 13;

  return (
    <div className={`rating-badge rating-${size}`}>
      <div className="rating-stars">
        {stars.map((s, i) => (
          <span key={i} className={`star star-${s}`} style={{ fontSize: starSize, color: s === "full" ? STAR_COLORS.filled : STAR_COLORS.empty }}>
            {s === "half" ? "★" : "★"}
          </span>
        ))}
      </div>
      {showValue && (
        <span className="rating-value">
          {rating.toFixed(1)}
          {reviewCount !== undefined && <span className="rating-count">({reviewCount})</span>}
        </span>
      )}
    </div>
  );
}
