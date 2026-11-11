import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'tb_session';

/** Sends signed-out visitors of the dashboard to the login page, and signed-in ones away from it. */
export function proxy(request: NextRequest) {
  const signedIn = request.cookies.has(SESSION_COOKIE);
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/app') && !signedIn) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }
  if ((pathname === '/login' || pathname === '/signup') && signedIn) {
    return NextResponse.redirect(new URL('/app', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/login', '/signup'],
};
