// middleware.ts - Root level for Next.js 14 App Router
import { NextResponse } from \"next/server\";
import type { NextRequest } from \"next/server\";

// Custom middleware that allows public access to login page
export async function middleware(request: NextRequest) {
  // Allow access to the root page (login page) and auth error page without authentication
  if (request.nextUrl.pathname === \"/\" || request.nextUrl.pathname === \"/auth/error\") {
    return NextResponse.next();
  }

  // For all other routes, we'll check if the user has a session in the client-side
  // since server-side session checking requires additional setup
  // For now, let the client-side logic handle authentication checks
  return NextResponse.next();
}

// Configure matcher to run middleware on all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static (static files)
     */
    \"/((?!api|_next/static|_next/image|favicon.ico|static|.*\\\\..*|_vercel).*)\",
  ],
};