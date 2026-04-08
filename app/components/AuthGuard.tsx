"use client";

import { useSession } from "@/app/components/SessionProvider";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { session, loading } = useSession();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!loading && !session) {
      router.replace(`/${locale}/login`);
    }
  }, [session, loading, router, locale]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-zinc-400 text-lg">Loading…</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
