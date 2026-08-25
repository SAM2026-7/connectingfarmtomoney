import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

const rolePaths = new Set(["admin", "agent", "buyer", "exporter", "farmer"]);

export function proxy(request: NextRequest) {
  const session = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  const segment = request.nextUrl.pathname.split("/")[1];
  if (rolePaths.has(segment) && segment !== session.role) {
    return NextResponse.redirect(new URL(`/${session.role}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/agent/:path*",
    "/buyer/:path*",
    "/exporter/:path*",
    "/farmer/:path*",
    "/payments/:path*",
    "/logistics/:path*",
    "/quality/:path*",
    "/market/:path*",
    "/messages/:path*",
    "/disputes/:path*",
    "/info/:path*",
    "/ai/:path*",
    "/pilot/:path*",
    "/expansion/:path*",
    "/architecture/:path*",
    "/roadmap/:path*",
  ],
};
