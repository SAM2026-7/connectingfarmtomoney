import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getOrders, getProduce, getUsers } from "@/lib/database";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Admin authentication required" }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    data: {
      users: getUsers(),
      produce: getProduce(),
      orders: getOrders(),
    },
  });
}
