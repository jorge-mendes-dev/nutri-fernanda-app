"use client";

import { useSession } from "@/app/components/SessionProvider";
import { supabase } from "@/src/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const providers: { id: Provider; label: string }[] = [
  { id: "google", label: "Google" },
];

function getSafeRedirect(value: string | null, locale: string): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return `/${locale}/`;
  }
  return value;
}

export default function LoginPage() {
  const t = useTranslations("login");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading: sessionLoading } = useSession();
  const locale = useLocale();

  const redirectTo = getSafeRedirect(searchParams?.get("redirect"), locale);

  useEffect(() => {
    if (!sessionLoading && session) {
      router.replace(redirectTo);
    }
  }, [session, sessionLoading, router, redirectTo]);

  const handleLogin = async (provider: Provider) => {
    setLoading(provider);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin) +
            "/auth/callback?next=" +
            encodeURIComponent(redirectTo),
        },
      });
      if (error) {
        setError(error.message);
        setLoading(null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left panel */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto"
              width={40}
              height={40}
            />
            <h2 className="mt-8 text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d]">
              {t("signInTitle")}
            </h2>
            <p className="mt-2 text-sm leading-[1.5] text-[#666666]">
              {t("choose")}
            </p>
          </div>

          <div className="mt-10">
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {providers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleLogin(p.id)}
                  disabled={!!loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-5 py-3 text-sm font-medium text-[#0d0d0d] shadow-[rgba(0,0,0,0.03)_0px_2px_4px] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18E299] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {p.id === "google" && (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                  )}
                  <span className="text-sm font-medium">
                    {loading === p.id
                      ? t("loading")
                      : t(p.id, { default: p.label })}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right image panel */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          alt=""
          src="/perfil.jpeg"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
