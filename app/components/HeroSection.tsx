"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Atmospheric gradient — soft green-to-white cloud wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(24,226,153,0.18) 0%, rgba(212,250,232,0.12) 40%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(24,226,153,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[88vh] items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-0">
          {/* ── LEFT: Text ── */}
          <div className="order-2 space-y-7 lg:order-1">
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.05)] bg-[#d4fae8] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.65px] text-[#0fa76e]">
              <span className="text-[#18E299]">✦</span>
              {t("hero.eyebrow")}
            </span>

            {/* Headline */}
            <h1 className="text-5xl font-semibold leading-[1.1] tracking-[-1.28px] text-[#0d0d0d] sm:text-6xl lg:text-[64px]">
              {t("hero.headingLine1")}
              <span className="mt-1 block text-[#18E299]">
                {t("hero.headingLine2")}
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-md text-lg leading-[1.5] text-[#666666]">
              {t("hero.description")}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d0d0d] px-7 py-3.5 text-[15px] font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
              >
                {t("hero.cta")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.22 3.22a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L14.94 10.5H3.75a.75.75 0 010-1.5h11.19L10.22 4.28a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-7 py-3.5 text-[15px] font-medium text-[#0d0d0d] transition-opacity hover:opacity-90"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 border-t border-[rgba(0,0,0,0.05)] pt-6">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.2px] text-[#18E299]">
                  +500
                </p>
                <p className="mt-0.5 text-sm text-[#888888]">
                  {t("hero.statPatients")}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-[-0.2px] text-[#18E299]">
                  8+
                </p>
                <p className="mt-0.5 text-sm text-[#888888]">
                  {t("hero.statYears")}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-[-0.2px] text-[#18E299]">
                  100%
                </p>
                <p className="mt-0.5 text-sm text-[#888888]">
                  {t("hero.statPersonalized")}
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative order-1 flex justify-center lg:order-2 lg:justify-end">
            {/* Main image card */}
            <div className="relative aspect-4/5 w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-[rgba(0,0,0,0.05)] shadow-[rgba(0,0,0,0.06)_0px_16px_48px] sm:max-w-md">
              <Image
                src="/header.jpeg"
                alt="Fernanda, Nutricionista"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating credential badge */}
            <div className="absolute bottom-8 left-0 z-10 rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-3.5 shadow-[rgba(0,0,0,0.06)_0px_8px_24px] lg:-left-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4fae8] text-lg text-[#18E299]">
                  ✦
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.65px] text-[#888888]">
                    {t("hero.badgeLabel")}
                  </p>
                  <p className="text-sm font-semibold text-[#0d0d0d]">
                    {t("hero.badgeValue")}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative ring accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full border-[14px] border-[#d4fae8]/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
