import { NextResponse } from "next/server";
import { MOCK_PRICES } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_PRICES });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { commodityId, state, price, change, changePercent } = body;

    if (!commodityId || !state || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPrice = {
      commodityId,
      state,
      price: Number(price),
      change: Number(change) || 0,
      changePercent: Number(changePercent) || 0,
      date: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({ success: true, data: newPrice, message: "Price updated" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
