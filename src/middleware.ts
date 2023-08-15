import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.includes("/app") || path.includes("/auth")) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtected = path.includes("/backoffice") || path.includes("/api");
  const isForOrderApp = path === "/api/orderCreate";

  if (!session && isProtected) {
    if (!isForOrderApp) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }
  return NextResponse.next();
}
