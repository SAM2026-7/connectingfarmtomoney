import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { addPrice, getPrices } from "@/lib/database";

export async function GET() {
  return NextResponse.json({ success: true, data: getPrices() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getSessionUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Admin authentication required" }, { status: 403 });
    const { commodityId, state, price, change, changePercent } = body;

    const numericPrice = Number(price);
    if (!commodityId || !state || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPrice = {
      commodityId,
      state,
      price: numericPrice,
      change: Number(change) || 0,
      changePercent: Number(changePercent) || 0,
      date: new Date().toISOString().split("T")[0],
    };

    addPrice(newPrice);
    return NextResponse.json({ success: true, data: newPrice, message: "Price updated" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
