import { NextResponse } from "next/server";
import { getWantedRequests } from "@/lib/database";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const wantedRequest = getWantedRequests().find(r => r.id === id);
    if (!wantedRequest) return NextResponse.json({ error: "Request not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: wantedRequest });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
