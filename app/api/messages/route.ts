import { NextResponse } from "next/server";
import { getAllUsers, getSessionUser } from "@/lib/auth";
import { addMessage, getMessages } from "@/lib/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (userId && userId !== user.id && user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let messages = getMessages();
  if (userId) {
    messages = messages.filter(m => m.senderId === userId || m.receiverId === userId);
  }

  return NextResponse.json({ success: true, data: messages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const { senderId, receiverId, content } = body;
    const receiver = getAllUsers().find(candidate => candidate.id === receiverId);

    if (senderId !== user.id || !receiver || typeof content !== "string" || !content.trim() || content.length > 2000) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const customerRoles = ["buyer", "agent", "exporter"];
    const canMessage =
      user.role === "admin" ||
      (user.role === "farmer" && receiver.role !== "farmer" && receiver.role !== "admin" && customerRoles.includes(receiver.role)) ||
      (customerRoles.includes(user.role) && receiver.role === "farmer");

    if (!canMessage) {
      return NextResponse.json({ error: "You are not allowed to message this user." }, { status: 403 });
    }

    const newMessage = {
      id: `m_${Date.now()}`,
      senderId,
      receiverId,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    addMessage(newMessage);
    return NextResponse.json({ success: true, data: newMessage, message: "Message sent" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
