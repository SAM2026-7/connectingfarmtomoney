import { NextResponse } from "next/server";
import { COMMODITIES } from "@/lib/data";
import { getSessionUser } from "@/lib/auth";
import { addProduce, getProduce } from "@/lib/database";

export async function GET() {
  return NextResponse.json({ success: true, data: getProduce() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getSessionUser();
    if (!user || !["farmer", "agent", "exporter"].includes(user.role)) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const { sellerId, commodityId, variety, quantity, price, grade, location, state, minOrder, packaging } = body;

    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    const numericMinOrder = Number(minOrder || 1);
    if (!commodityId || !COMMODITIES.some(commodity => commodity.id === commodityId) || !Number.isFinite(numericQuantity) || numericQuantity <= 0 || !Number.isFinite(numericPrice) || numericPrice <= 0 || !["A", "B", "C", "export"].includes(grade || "B") || !Number.isFinite(numericMinOrder) || numericMinOrder <= 0 || numericMinOrder > numericQuantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (sellerId && sellerId !== user.id) return NextResponse.json({ error: "Cannot create a listing for another user" }, { status: 403 });

    const newProduce = {
      id: `p_${Date.now()}`,
      sellerId: user.id,
      sellerRole: user.role,
      commodityId,
      variety: variety || "",
      quantity: numericQuantity,
      price: numericPrice,
      currency: "NGN",
      negotiable: true,
      grade: grade || "B",
      location: location || "",
      state: state || "",
      availableDate: new Date().toISOString().split("T")[0],
      harvestDate: new Date().toISOString().split("T")[0],
      minOrder: numericMinOrder,
      packaging: packaging || "50kg bags",
      storageCondition: "",
      status: "active" as const,
      createdAt: new Date().toISOString().split("T")[0],
      photos: [],
      description: "",
    };

    addProduce(newProduce);
    return NextResponse.json({ success: true, data: newProduce, message: "Produce listed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
