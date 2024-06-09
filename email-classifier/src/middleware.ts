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
  const path = pathSegments[pathSegments.length - 1];
  if (
    !isAuthenticated &&
    (pathSegments[1] === "dashboard" || pathSegments[1] === "openAI-api-key")
  ) {
    const loginPath = `/`;
    const loginURL = new URL(loginPath, req.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }
  if (isAuthenticated) {
    const newURL = new URL("/openAI-api-key", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString());
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/:path*"],
};
