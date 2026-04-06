import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const isSignIn = request.nextUrl.pathname.startsWith("/sign-in");

  if (!(token || isSignIn)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && isSignIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/sign-in", "/dashboard/:path*"],
};
