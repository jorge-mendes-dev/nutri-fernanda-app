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
    <div className="min-h-[calc(100vh-4rem)] bg-[#faf7f2] py-10">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("title")}</h1>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 flex flex-col items-center text-center gap-4">
          <Image
            src={avatarUrl}
            alt={name}
            width={80}
            height={80}
            className="rounded-full ring-4 ring-green-100"
          />
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <dl className="w-full mt-2 divide-y divide-gray-100 text-sm text-left">
            <div className="flex justify-between py-3">
              <dt className="font-medium text-gray-500">{t("name")}</dt>
              <dd className="text-gray-900">{name}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-medium text-gray-500">{t("email")}</dt>
              <dd className="text-gray-900">{email}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-medium text-gray-500">{t("memberSince")}</dt>
              <dd className="text-gray-900">{memberSince}</dd>
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
