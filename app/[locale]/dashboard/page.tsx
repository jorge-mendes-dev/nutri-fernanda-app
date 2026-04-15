"use client";

import { AuthGuard } from "@/app/components/AuthGuard";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white px-4">
        <div className="rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-10 shadow-[rgba(0,0,0,0.03)_0px_2px_4px] text-center max-w-md w-full">
          <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d] mb-3">
            {t("title", { default: "Admin Dashboard" })}
          </h1>
          <p className="text-base leading-[1.5] text-[#666666]">
            {t("welcome", { default: "Welcome to the admin dashboard." })}
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
