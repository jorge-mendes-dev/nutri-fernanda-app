"use client";

import { AuthGuard } from "@/app/components/AuthGuard";
import { useTranslations } from "next-intl";

export default function PatientPage() {
  const t = useTranslations("patient");
  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          {t("title", { default: "Patient Area" })}
        </h1>
        <p className="text-lg text-zinc-600">
          {t("welcome", { default: "Welcome to your patient area." })}
        </p>
      </div>
    </AuthGuard>
  );
}
