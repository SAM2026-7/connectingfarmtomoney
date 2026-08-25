import { NextResponse } from "next/server";
import { getVisitorSession } from "@/lib/auth";

export async function GET() {
  const session = await getVisitorSession();
  if (!session) return NextResponse.json({ signedIn: false });
  return NextResponse.json({
    signedIn: true,
    visitor: { id: session.id, name: session.name, email: session.email, phone: session.phone, role: session.role, visitDate: session.visitDate },
  });
}
