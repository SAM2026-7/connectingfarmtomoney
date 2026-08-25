import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getAggregations, getOrders, getPrices, getProduce, getUsers } from "@/lib/database";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  return NextResponse.json({ success: true, data: { users: getUsers(), produce: getProduce(), orders: getOrders(), prices: getPrices(), aggregations: getAggregations() } });
}
