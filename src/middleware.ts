// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req: any) {
  const mode = process.env.NODE_ENV;

  if (
    req.nextUrl.pathname.startsWith("/components") &&
    mode !== "development"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    console.log("Redirect đến trang đăng nhập nếu chưa đăng nhập");
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/components/:path*",
};
