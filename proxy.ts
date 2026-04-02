import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n';

const protectedPrefixes = ['/dashboard', '/patient'];

function getLocaleFromPath(pathname: string): string {
  const match = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );
  return match || defaultLocale;
}

function isProtectedRoute(pathname: string): boolean {
  // Strip locale prefix, then check against protected paths
  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/(${locales.join('|')})`),
    ''
  );
  return protectedPrefixes.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + '/')
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ensure locale prefix is present
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // 2. Protect private routes with verified Supabase auth
  if (isProtectedRoute(pathname)) {
    const response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const locale = getLocaleFromPath(pathname);
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and the auth callback
    '/((?!_next|auth/callback|api|favicon.ico|.*\\..*).*)',
  ],
};