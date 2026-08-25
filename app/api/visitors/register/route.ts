import { NextResponse } from "next/server";
import { createVisitorSession, visitorSessionCookie } from "@/lib/auth";
import { addVisitor } from "@/lib/database";
import { VisitorRecord, VisitorUserClass } from "@/lib/types";

const VALID_USER_CLASSES: VisitorUserClass[] = ["farmer", "buyer", "agent", "exporter", "admin"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, role, visitDate } = body as {
      name?: string;
      phone?: string;
      email?: string;
      role?: VisitorUserClass;
      visitDate?: string;
    };

    const cleanName = name?.trim();
    const cleanPhone = phone?.trim();
    const cleanEmail = email?.trim();

    if (!cleanName || !cleanPhone || !cleanEmail || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!VALID_USER_CLASSES.includes(role)) {
      return NextResponse.json({ error: "Invalid user class" }, { status: 400 });
    }

    const visit = visitDate && !isNaN(Date.parse(visitDate)) ? visitDate : new Date().toISOString().split("T")[0];

    const visitor: VisitorRecord = {
      id: `visitor_${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      role,
      visitDate: visit,
      createdAt: new Date().toISOString(),
    };

    addVisitor(visitor);

    const response = NextResponse.json({ success: true, visitor, message: "Login recorded" }, { status: 201 });
    response.cookies.set(visitorSessionCookie.name, createVisitorSession(visitor), visitorSessionCookie);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
