import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { addOrder, getOrders, getProduce, updateOrder, updateProduce } from "@/lib/database";
import { Order } from "@/lib/types";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const orders = getOrders();
  const data = user.role === "admin" ? orders : orders.filter(order => order.buyerId === user.id || order.sellerId === user.id);
  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getSessionUser();
    if (!user || !["buyer", "exporter"].includes(user.role)) return NextResponse.json({ error: "Buyer authentication required" }, { status: 401 });
    const { produceId, buyerId, sellerId, quantity, price, deliveryLocation } = body;
    const listing = getProduce().find(produce => produce.id === produceId && produce.status === "active");
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);

    if (!listing || buyerId !== user.id || sellerId !== listing.sellerId || !Number.isFinite(numericQuantity) || numericQuantity <= 0 || numericQuantity > listing.quantity || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = {
      id: `AGN-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`,
      produceId,
      buyerId,
      sellerId,
      quantity: numericQuantity,
      price: numericPrice,
      deliveryLocation: deliveryLocation || "",
      status: "requested" as const,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    addOrder(newOrder);
    const remainingQuantity = listing.quantity - numericQuantity;
    updateProduce({ ...listing, quantity: remainingQuantity, status: remainingQuantity === 0 ? "sold" : listing.status });
    return NextResponse.json({ success: true, data: newOrder, message: "Order placed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const body = await request.json() as { orderId?: string; status?: Order["status"] };
    const order = getOrders().find(candidate => candidate.id === body.orderId);
    if (!order || (user.role !== "admin" && order.buyerId !== user.id && order.sellerId !== user.id)) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    const transitions: Record<Order["status"], Order["status"][]> = {
      requested: ["negotiating", "confirmed", "cancelled"], negotiating: ["confirmed", "cancelled"], confirmed: ["payment_pending", "cancelled"], payment_pending: ["paid", "cancelled"], paid: ["processing", "cancelled"], processing: ["dispatched", "cancelled"], dispatched: ["delivered"], delivered: ["completed"], completed: [], cancelled: [],
    };
    if (!body.status || !transitions[order.status].includes(body.status)) return NextResponse.json({ error: "Invalid order transition" }, { status: 409 });
    if (body.status === "completed" && user.role !== "buyer") return NextResponse.json({ error: "Only the buyer can complete delivery" }, { status: 403 });
    const updatedOrder = { ...order, status: body.status, updatedAt: new Date().toISOString().split("T")[0] };
    updateOrder(updatedOrder);
    if (body.status === "cancelled") {
      const listing = getProduce().find(produce => produce.id === order.produceId);
      if (listing) updateProduce({ ...listing, quantity: listing.quantity + order.quantity, status: "active" });
    }
    return NextResponse.json({ success: true, data: updatedOrder });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
