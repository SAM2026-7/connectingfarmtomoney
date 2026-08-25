import { NextResponse } from "next/server";
import { MOCK_PRODUCE } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_PRODUCE });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sellerId, sellerRole, commodityId, variety, quantity, price, grade, location, state, minOrder, packaging } = body;

    if (!commodityId || !quantity || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProduce = {
      id: `p_${Date.now()}`,
      sellerId: sellerId || "anonymous",
      sellerRole: sellerRole || "farmer",
      commodityId,
      variety: variety || "",
      quantity: Number(quantity),
      price: Number(price),
      currency: "NGN",
      negotiable: true,
      grade: grade || "B",
      location: location || "",
      state: state || "",
      availableDate: new Date().toISOString().split("T")[0],
      harvestDate: new Date().toISOString().split("T")[0],
      minOrder: Number(minOrder) || 1,
      packaging: packaging || "50kg bags",
      storageCondition: "",
      status: "active" as const,
      createdAt: new Date().toISOString().split("T")[0],
      photos: [],
      description: "",
    };

    return NextResponse.json({ success: true, data: newProduce, message: "Produce listed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
