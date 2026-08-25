import { NextResponse } from "next/server";
import { createSessionToken, findUser, sessionCookie } from "@/lib/auth";
import { UserRole } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, role } = body as { email?: string; phone?: string; role?: UserRole };

    if (!email && !phone && !role) {
      return NextResponse.json({ error: "Email, phone, or role required" }, { status: 400 });
    }

    const user = findUser({ email, phone, role });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createSessionToken(user);
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, verificationLevel: user.verificationLevel },
      message: "Login successful",
    });
    response.cookies.set(sessionCookie.name, token, sessionCookie);

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
