// middleware.js (in your project root)
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request:NextRequest) {
  const session = await auth();
  
  if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
    const returnUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/signIn?returnUrl=${returnUrl}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};