import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle Auth0 and protected routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow all /api/auth/* routes (Auth0 handles these)
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Allow public routes
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/features',
    '/about',
    '/contact',
    '/help',
    '/privacy',
    '/terms',
    '/cookies',
    '/security',
    '/changelog',
  ];

  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  // For now, allow all other routes (we'll add session checking later)
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

