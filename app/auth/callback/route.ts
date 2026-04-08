import { defaultLocale } from "@/i18n";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? `/${defaultLocale}/dashboard`;

  // Validate the redirect target to prevent open redirect
  const safeNext =
    next.startsWith("/") && !next.startsWith("//")
      ? next
      : `/${defaultLocale}/dashboard`;

  if (code) {
    // Build the redirect response first so we can attach cookies directly to it.
    // Using next/headers cookies() here risks the Set-Cookie headers not being
    // merged into a custom NextResponse.redirect(), so we manage cookies
    // explicitly on the response object instead.
    const response = NextResponse.redirect(new URL(safeNext, origin));

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }
  }

  // If code exchange fails or no code, redirect to login
  return NextResponse.redirect(new URL(`/${defaultLocale}/login`, origin));
}
