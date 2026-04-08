import { defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

// Renders inside app/[locale]/layout.tsx which already provides <html>/<body>
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[#faf7f2] px-4 text-center">
      <p className="text-6xl font-bold text-green-600">404</p>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">
        {t("title")}
      </h2>
      <p className="mt-2 text-gray-500">{t("description")}</p>
      <Link
        href={`/${defaultLocale}/`}
        className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}
