import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/auth";
import { getProduce, getReviews } from "@/lib/database";
import { getCommodityName, COMMODITIES } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const seller = getAllUsers().find(u => u.id === id);
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    const produce = getProduce().filter(p => p.sellerId === seller.id && p.status === "active");
    const reviews = getReviews().filter(r => r.revieweeId === seller.id);
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : seller.rating || 0;

    const tags: string[] = [];
    produce.forEach(p => {
      if (p.commodityId) tags.push(getCommodityName(p.commodityId));
    });
    tags.push(...COMMODITIES.filter(c => produce.some(p => p.commodityId === c.id)).map(c => c.name).slice(0, 5));
    if (seller.role === "farmer") tags.push("Farmer");
    if (seller.role === "agent") tags.push("Agent");
    if (seller.role === "exporter") tags.push("Exporter");

    const profile = {
      id: seller.id,
      role: seller.role,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      state: seller.state,
      lga: seller.lga,
      verificationLevel: seller.verificationLevel,
      rating: avgRating,
      reviewCount: reviews.length,
      joinedDate: seller.joinedDate,
      produceCount: produce.length,
      tags: Array.from(new Set(tags)),
      produce,
      reviews,
    };

    return NextResponse.json({ success: true, data: profile });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
