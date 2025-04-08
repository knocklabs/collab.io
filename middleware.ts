import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next();

  // Add CSP headers
  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      img-src 'self' data: blob: http: https:;
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      font-src 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim()
  );

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
