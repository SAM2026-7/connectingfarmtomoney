import { NextResponse } from "next/server";
import { MOCK_MESSAGES } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  let messages = MOCK_MESSAGES;
  if (userId) {
    messages = messages.filter(m => m.senderId === userId || m.receiverId === userId);
  }

  return NextResponse.json({ success: true, data: messages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderId, receiverId, content } = body;

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = {
      id: `m_${Date.now()}`,
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    return NextResponse.json({ success: true, data: newMessage, message: "Message sent" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
