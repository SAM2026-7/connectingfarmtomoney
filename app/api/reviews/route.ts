import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { addReview, getReviews } from "@/lib/database";
import { Review } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get("sellerId");
    let reviews = getReviews();
    if (sellerId) reviews = reviews.filter(r => r.revieweeId === sellerId);
    return NextResponse.json({ success: true, data: reviews });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const body = await request.json();
    const { orderId, revieweeId, rating, comment } = body;
    const numericRating = Number(rating);

    if (!orderId || !revieweeId || !Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    const newReview: Review = {
      id: `r_${Date.now()}`,
      orderId,
      reviewerId: user.id,
      revieweeId,
      rating: numericRating,
      comment: comment || "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    addReview(newReview);
    return NextResponse.json({ success: true, data: newReview, message: "Review added" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
