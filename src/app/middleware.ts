import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = await clerkClient.sessions.getSession(
    req.headers.get('cookie') || ''
  );

  if (pathname === '/dashboard' && !isAuthenticated) {
    // Redirect to login if trying to access /dashboard and not authenticated
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (pathname === '/login' && isAuthenticated) {
    // Redirect to dashboard if the user is authenticated and tries to access /login
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
