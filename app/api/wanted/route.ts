import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { addWantedRequest, getWantedRequests } from "@/lib/database";
import { COMMODITIES } from "@/lib/data";
import { WantedRequest } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const commodity = searchParams.get("commodity");
    let requests = getWantedRequests();
    if (state) requests = requests.filter(r => r.state === state);
    if (commodity) requests = requests.filter(r => r.commodityId === commodity);
    return NextResponse.json({ success: true, data: requests });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user || !["buyer", "exporter"].includes(user.role)) {
      return NextResponse.json({ error: "Buyer or exporter authentication required" }, { status: 401 });
    }
    const body = await request.json();
    const { commodityId, variety, quantity, unit, budget, budgetCurrency, negotiable, location, state, deliveryMethod, notes } = body;

    const numericQuantity = Number(quantity);
    const numericBudget = budget ? Number(budget) : undefined;

    if (!commodityId || !COMMODITIES.some(c => c.id === commodityId) || !Number.isFinite(numericQuantity) || numericQuantity <= 0 || !location?.trim() || !state) {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    const newRequest: WantedRequest = {
      id: `w_${Date.now()}`,
      requesterId: user.id,
      requesterRole: user.role,
      commodityId,
      variety: variety || "",
      quantity: numericQuantity,
      unit: unit || COMMODITIES.find(c => c.id === commodityId)?.unit || "unit",
      budget: numericBudget && Number.isFinite(numericBudget) ? numericBudget : undefined,
      budgetCurrency: budgetCurrency || "NGN",
      negotiable: negotiable ?? true,
      location: location.trim(),
      state,
      deliveryMethod: deliveryMethod || "any",
      notes: notes || "",
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      photos: [],
    };

    addWantedRequest(newRequest);
    return NextResponse.json({ success: true, data: newRequest, message: "Request posted successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
