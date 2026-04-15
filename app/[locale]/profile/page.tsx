"use client";

import { AuthGuard } from "@/app/components/AuthGuard";
import { useSession } from "@/app/components/SessionProvider";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

function ProfileContent() {
  const t = useTranslations("profile");
  const locale = useLocale();
  const { session } = useSession();
  const user = session?.user;
  const meta = user?.user_metadata ?? {};

  const name = meta.full_name ?? meta.name ?? user?.email ?? "—";
  const email = user?.email ?? "—";
  const avatarUrl =
    meta.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4ade80&color=fff&size=128`;

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
      })
    : "—";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white py-10">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d] mb-8">
          {t("title")}
        </h1>
        <div className="rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-8 shadow-[rgba(0,0,0,0.03)_0px_2px_4px] flex flex-col items-center text-center gap-4">
          <Image
            src={avatarUrl}
            alt={name}
            width={80}
            height={80}
            className="rounded-full ring-4 ring-[#d4fae8]"
          />
          <h2 className="text-[24px] font-medium leading-[1.3] tracking-[-0.24px] text-[#0d0d0d]">
            {name}
          </h2>
          <dl className="w-full mt-2 divide-y divide-[rgba(0,0,0,0.05)] text-sm text-left">
            <div className="flex justify-between py-3">
              <dt className="font-medium text-[#888888]">{t("name")}</dt>
              <dd className="text-[#0d0d0d]">{name}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-medium text-[#888888]">{t("email")}</dt>
              <dd className="text-[#0d0d0d]">{email}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-medium text-[#888888]">{t("memberSince")}</dt>
              <dd className="text-[#0d0d0d]">{memberSince}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
