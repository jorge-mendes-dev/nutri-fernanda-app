import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales } from "../../i18n";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import { SessionProvider } from "../components/SessionProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
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
    <html lang={locale} className={`h-full ${inter.variable}`}>
      <body className="h-full bg-white text-[#0d0d0d]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
