import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // If the path starts with /admin, check if the user is authenticated and has admin role
  if (path.startsWith('/admin')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If the user is not authenticated, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has admin role
    if (token.role !== 'ADMIN') {
      // Redirect to homepage or show error for unauthorized access
      return new NextResponse(null, { 
        status: 403,
        statusText: "Unauthorized: Admin access required"
      });
    }

    // User is authenticated and has admin role, allow access
    return NextResponse.next();
  }

  // For non-admin routes, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 