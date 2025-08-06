/**
 * Next.js Middleware for route protection in KeyNest
 * - Only allows unauthenticated users to access home, login, and signup
 * - Redirects authenticated users away from login and signup to dashboard
 * - Redirects unauthenticated users to login for protected routes
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!token;

  // Define public routes
  const PUBLIC_ROUTES = ['/', '/login', '/signup'];

  // Redirect authenticated users away from login and signup
  if (isAuthenticated && ['/login', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Matcher config for protected routes
export const config = {
  matcher: [
    '/((?!_next|favicon.ico|logo|logo.svg|PNG.png|api|public|login|signup).*)',
    '/login',
    '/signup',
    '/dashboard/:path*',
  ],
};
