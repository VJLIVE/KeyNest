// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isAuth = !!token;

  // Public routes
  const publicRoutes = ['/', '/login', '/signup'];

  // If authenticated, block access to login and signup
  if (isAuth && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If not authenticated, block access to any route except publicRoutes
  if (!isAuth && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except home, login, signup
export const config = {
  matcher: [
    '/((?!_next|favicon.ico|logo|logo.svg|PNG.png|api|public|login|signup).*)',
    '/login',
    '/signup',
    '/dashboard/:path*',
  ],
};
