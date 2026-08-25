import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { store } from "@/lib/store";

export type ExportRequest = {
  id: string;
  exporterId: string;
  commodity: string;
  quantity: number;
  destination: string;
  deliveryTerm: string;
  deadline: string;
  notes: string;
  status: "open";
  createdAt: string;
};

const requests = (store as typeof store & { exportRequests?: ExportRequest[] }).exportRequests ?? [];
(store as typeof store & { exportRequests?: ExportRequest[] }).exportRequests = requests;

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "exporter") return NextResponse.json({ error: "Exporter authentication required" }, { status: 403 });
  return NextResponse.json({ success: true, data: requests.filter(request => request.exporterId === user.id) });
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "exporter") return NextResponse.json({ error: "Exporter authentication required" }, { status: 403 });
    const body = await request.json() as Partial<ExportRequest>;
    const quantity = Number(body.quantity);
    if (!body.commodity || !Number.isFinite(quantity) || quantity <= 0 || !body.destination?.trim() || !body.deadline) {
      return NextResponse.json({ error: "Commodity, quantity, destination, and deadline are required" }, { status: 400 });
    }
    const newRequest: ExportRequest = {
      id: `EXR-${Date.now()}`,
      exporterId: user.id,
      commodity: body.commodity,
      quantity,
      destination: body.destination.trim(),
      deliveryTerm: body.deliveryTerm || "FOB",
      deadline: body.deadline,
      notes: body.notes?.trim() || "",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    requests.push(newRequest);
    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
