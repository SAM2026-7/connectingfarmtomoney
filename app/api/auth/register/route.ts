import { NextResponse } from "next/server";
import { MOCK_FARMERS, MOCK_BUYERS, MOCK_AGENTS, MOCK_EXPORTERS } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, state, lga } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const users = [...MOCK_FARMERS, ...MOCK_BUYERS, ...MOCK_AGENTS, ...MOCK_EXPORTERS];
    const exists = users.find(u => u.email === email || u.phone === phone);
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const newUser = {
      id: `user_${Date.now()}`,
      role,
      name,
      email,
      phone: phone || "",
      state: state || "",
      lga: lga || "",
      verificationLevel: "unverified" as const,
      rating: 0,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({ success: true, user: newUser, message: "Registration successful" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
