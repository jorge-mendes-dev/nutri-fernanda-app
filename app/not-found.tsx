import { defaultLocale } from "@/i18n";
import Link from "next/link";

// Root-level fallback — must include <html>/<body> because app/layout.tsx
// does not provide them (locale layout does, but only inside [locale] routes).
// No i18n context is available here, so we load the default locale JSON directly.
export default async function RootNotFound() {
  const messages = (await import(`../locales/${defaultLocale}.json`))
    .default as {
    notFound: { title: string; description: string; goHome: string };
  };
  const t = messages.notFound;

  return (
    <html lang={defaultLocale}>
      <body className="flex flex-col items-center justify-center min-h-screen bg-[#faf7f2] px-4 text-center">
        <p className="text-6xl font-bold text-green-600">404</p>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-500">{t.description}</p>
        <Link
          href={`/${defaultLocale}/`}
          className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          {t.goHome}
        </Link>
      </body>
    </html>
  );
}
