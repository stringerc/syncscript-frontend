import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware - temporarily disabled to fix 401 errors
 */
export function middleware(request: NextRequest) {
  // Allow all routes for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};