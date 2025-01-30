import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth(async (request: NextAuthRequest) => {
  const session = request.auth;
  const pathname = request.nextUrl.pathname;

  if (session && ["/sign-up", "/sign-in"].includes(pathname)) {
    return Response.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/sign-up", "/sign-in"],
};
