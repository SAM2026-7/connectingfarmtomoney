import { NextResponse } from "next/server";
import { addUser, getUsers } from "@/lib/database";
import { UserRole } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, state, lga } = body as { name?: string; email?: string; phone?: string; role?: UserRole; state?: string; lga?: string };

    if (!name?.trim() || !email?.trim() || !role || !["farmer", "buyer", "agent", "exporter"].includes(role)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const users = getUsers();
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

    addUser(newUser);
    return NextResponse.json({ success: true, user: newUser, message: "Registration successful" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
