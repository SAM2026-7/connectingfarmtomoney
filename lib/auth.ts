import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { User, UserRole, VisitorUserClass } from "@/lib/types";
import { getUsers } from "@/lib/database";

export const SESSION_COOKIE = "farmtomoney_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export const VISITOR_SESSION_COOKIE = "farmtomoney_visitor";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set to at least 32 characters");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(user: Pick<User, "id" | "role">) {
  const payload = Buffer.from(JSON.stringify({ sub: user.id, role: user.role, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const validSignature = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!validSignature) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { sub: string; role: UserRole; exp: number };
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

type VisitorSession = { id: string; role: VisitorUserClass; name: string; email: string; phone: string; visitDate: string; exp: number };

export function createVisitorSession(visitor: { id: string; role: VisitorUserClass; name: string; email: string; phone: string; visitDate: string }) {
  const payload = Buffer.from(JSON.stringify({ ...visitor, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyVisitorSession(token: string | undefined): VisitorSession | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const validSignature = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!validSignature) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as VisitorSession;
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getVisitorSession() {
  const token = (await cookies()).get(VISITOR_SESSION_COOKIE)?.value;
  return verifyVisitorSession(token);
}

export function getAllUsers(): User[] {
  return getUsers();
}

export function findUser(identifier: { email?: string; phone?: string; role?: UserRole }) {
  const users = getAllUsers();
  if (identifier.role && !identifier.email && !identifier.phone) return users.find(user => user.role === identifier.role);
  return users.find(user => (identifier.email && user.email === identifier.email) || (identifier.phone && user.phone === identifier.phone));
}

export async function getSessionUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) return null;
  const user = getAllUsers().find(candidate => candidate.id === session.sub);
  return user?.role === session.role ? user : null;
}

export const sessionCookie = {
  name: SESSION_COOKIE,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export const visitorSessionCookie = {
  name: VISITOR_SESSION_COOKIE,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};
