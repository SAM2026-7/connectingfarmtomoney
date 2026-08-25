import { NextResponse } from "next/server";
import { getAllUsers, getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  const data = getAllUsers()
    .filter(candidate => candidate.id !== user.id && ["farmer", "buyer"].includes(candidate.role) && candidate.role !== user.role)
    .map(({ id, name, role, state, verificationLevel }) => ({ id, name, role, state, verificationLevel }));

  return NextResponse.json({ success: true, data });
}
