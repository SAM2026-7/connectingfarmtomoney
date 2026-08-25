const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function registerUser(data: {
  name: string;
  email: string;
  phone?: string;
  role: string;
  state?: string;
  lga?: string;
}) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Registration failed");
  return res.json();
}

export async function loginUser(data: { email?: string; phone?: string }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Login failed");
  return res.json();
}

export async function getProduce() {
  const res = await fetch(`${API_BASE}/api/produce`);
  if (!res.ok) throw new Error("Failed to fetch produce");
  return res.json();
}

export async function createProduce(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/produce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Failed to create produce");
  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${API_BASE}/api/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createOrder(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Failed to create order");
  return res.json();
}

export async function getMessages(userId?: string) {
  const url = userId ? `${API_BASE}/api/messages?userId=${userId}` : `${API_BASE}/api/messages`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function sendMessage(data: { senderId: string; receiverId: string; content: string }) {
  const res = await fetch(`${API_BASE}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Failed to send message");
  return res.json();
}

export async function getPrices() {
  const res = await fetch(`${API_BASE}/api/prices`);
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}

export async function updatePrice(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/prices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Failed to update price");
  return res.json();
}
