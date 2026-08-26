import { NextResponse } from "next/server";
import { getProduce } from "@/lib/database";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const produce = getProduce().find(p => p.id === id);

    if (!produce) return NextResponse.json({ error: "Produce not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: produce });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
