"use client";

import { useSession } from "@/app/components/SessionProvider";
import { supabase } from "@/src/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const providers: { id: Provider; label: string }[] = [
  { id: "google", label: "Google" },
];

function getSafeRedirect(value: string | null, locale: string): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return `/${locale}/dashboard`;
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

  // Redirect already-authenticated users away from login
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
            window.location.origin +
            "/auth/callback?next=" +
            encodeURIComponent(redirectTo),
        },
      });
      if (error) {
        setError(error.message);
        setLoading(null);
      }
      // On success, Supabase will redirect, so no further action needed
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        {t("title", { default: "Login" })}
      </h1>
      <p className="mb-6 text-zinc-600">
        {t("choose", { default: "Choose a social provider to login:" })}
      </p>
      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded w-64 text-center"
        >
          {error}
        </div>
      )}
      <div className="flex flex-col gap-4 w-64">
        {providers.map((p) => (
          <button
            key={p.id}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow disabled:opacity-60`}
            onClick={() => handleLogin(p.id)}
            disabled={!!loading}
          >
            {loading === p.id
              ? t("loading", { default: "Loading..." })
              : t(p.id, { default: p.label })}
          </button>
        ))}
      </div>
    </div>
  );
}
