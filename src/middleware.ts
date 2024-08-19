import { NextResponse } from 'next/server';
import { authMiddleware, clerkClient } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/', '/login'],
  async afterAuth(auth, req, evt) {
    // Handle routing for public routes
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
      return;
    }

    // If the user is not signed in and the route is not public, redirect to login
    if (!auth.userId) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // If the user is signed in and tries to access login, redirect to dashboard
    if (auth.userId && req.nextUrl.pathname === '/login') {
      const dashboardUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  },
});

// Export the config
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
