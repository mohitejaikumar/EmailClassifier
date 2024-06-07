import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = token ? true : false;
  const pathSegments = req.nextUrl.pathname.split("/");

  if (!isAuthenticated && pathSegments[1] == "dashboard") {
    const loginPath = `/auth/login/`;
    const loginURL = new URL(loginPath, req.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }
  if (isAuthenticated && pathSegments[2] == "login") {
    const newURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString());
  }
  return NextResponse.next();
}
