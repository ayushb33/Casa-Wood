import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Paths that require authentication
const PROTECTED_PREFIXES = ["/dashboard"];
// Paths that should redirect to dashboard if already authenticated
const AUTH_PATHS = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPath = AUTH_PATHS.some((path) => pathname === path);

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page
  if (isAuthPath && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth (Better Auth routes)
     * - _next/static, _next/image
     * - favicon.ico
     * - public files
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|brand|images).*)",
  ],
};
