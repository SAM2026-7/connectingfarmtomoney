import { NextResponse } from "next/server";
import { MOCK_FARMERS, MOCK_BUYERS, MOCK_AGENTS, MOCK_EXPORTERS } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone } = body;

    if (!email && !phone) {
      return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
    }

    const users = [...MOCK_FARMERS, ...MOCK_BUYERS, ...MOCK_AGENTS, ...MOCK_EXPORTERS];
    const user = users.find(u => u.email === email || u.phone === phone);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = `token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, verificationLevel: user.verificationLevel },
      message: "Login successful",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
