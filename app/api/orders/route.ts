import { NextResponse } from "next/server";
import { MOCK_ORDERS } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_ORDERS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produceId, buyerId, sellerId, quantity, price, deliveryLocation } = body;

    if (!produceId || !buyerId || !sellerId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = {
      id: `AGN-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`,
      produceId,
      buyerId,
      sellerId,
      quantity: Number(quantity),
      price: Number(price),
      deliveryLocation: deliveryLocation || "",
      status: "requested" as const,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({ success: true, data: newOrder, message: "Order placed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
