import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales } from "../../i18n";
import Navbar from "../components/Navbar";
import { SessionProvider } from "../components/SessionProvider";
import "../globals.css";

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { children, params } = props;
  const { locale } = await params;
  let messages;
  if (!locales.includes(locale)) notFound();
  try {
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
