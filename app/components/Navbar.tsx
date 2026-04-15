"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/src/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { useSession } from "./SessionProvider";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const { session } = useSession();
  const { itemCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const prevSession = useRef(session);

  useEffect(() => {
    if (!prevSession.current && session) {
      router.refresh();
    }
    prevSession.current = session;
  }, [session, router]);

  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  if (!session) {
    return (
      <nav className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.05)] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={`/${locale}/`}
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              alt="Logo"
              src="/logo.png"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Right side: language select + login */}
          <div className="flex items-center gap-3">
            {/* Language select */}
            <select
              value={locale}
              onChange={(e) =>
                router.push(`/${e.target.value}${pathWithoutLocale}`)
              }
              className="cursor-pointer rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 text-sm font-medium text-[#0d0d0d] transition-colors hover:border-[#18E299] focus:border-[#18E299] focus:outline-[#18E299] focus:outline-1"
              aria-label="Language"
            >
              <option value="pt">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
            </select>

            {/* Login button */}
            <Link
              href={`/${locale}/login`}
              className="rounded-full bg-[#0d0d0d] px-5 py-2 text-sm font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
            >
              {t("navbar.login", { default: "Login" })}
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.05)] bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-lg p-2 text-[#666666] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] focus:outline-none">
              <span className="sr-only">
                {t("navbar.openMenu", { default: "Open main menu" })}
              </span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-5 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-5 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <Link
            href={`/${locale}/`}
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              alt="Logo"
              src="/logo.png"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:flex sm:items-center sm:gap-1">
            <Link
              href={`/${locale}/`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#0d0d0d] transition-colors hover:text-[#18E299]"
            >
              {t("navbar.home", { default: "Home" })}
            </Link>
            <Link
              href={`/${locale}/cart`}
              className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#0d0d0d] transition-colors hover:text-[#18E299]"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              {t("navbar.cart", { default: "Cart" })}
              {itemCount > 0 && (
                <span className="ml-0.5 rounded-full bg-[#18E299] px-1.5 py-0.5 text-[10px] font-bold text-[#0d0d0d] leading-none">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Right: language + avatar */}
          <div className="flex items-center gap-3">
            <select
              value={locale}
              onChange={(e) =>
                router.push(`/${e.target.value}${pathWithoutLocale}`)
              }
              className="hidden cursor-pointer rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 text-sm font-medium text-[#0d0d0d] transition-colors hover:border-[#18E299] focus:border-[#18E299] focus:outline-[#18E299] focus:outline-1 sm:block"
              aria-label="Language"
            >
              <option value="pt">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
            </select>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18E299]">
                <span className="sr-only">
                  {t("navbar.openUserMenu", { default: "Open user menu" })}
                </span>
                <Image
                  alt="User avatar"
                  src={
                    session.user.user_metadata?.avatar_url ??
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.email ?? "U")}&background=18E299&color=0d0d0d`
                  }
                  width={32}
                  height={32}
                  className="size-8 rounded-full ring-1 ring-[rgba(0,0,0,0.08)]"
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white py-1.5 shadow-[rgba(0,0,0,0.06)_0px_4px_16px] transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
              >
                <MenuItem>
                  <Link
                    href={`/${locale}/profile`}
                    className="block px-4 py-2 text-sm text-[#333333] transition-colors hover:bg-[#f5f5f5] hover:text-[#0d0d0d]"
                  >
                    {t("navbar.profile", { default: "Your profile" })}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-[#333333] transition-colors hover:bg-[#f5f5f5] hover:text-[#0d0d0d]"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.refresh();
                      router.replace(`/${locale}/`);
                    }}
                  >
                    {t("navbar.signOut", { default: "Sign out" })}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 border-t border-[rgba(0,0,0,0.05)] px-4 py-3">
          <DisclosureButton
            as={Link}
            href={`/${locale}/`}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-[#0d0d0d] hover:bg-[#f5f5f5] hover:text-[#18E299]"
          >
            {t("navbar.home", { default: "Home" })}
          </DisclosureButton>
          <DisclosureButton
            as={Link}
            href={`/${locale}/cart`}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#0d0d0d] hover:bg-[#f5f5f5] hover:text-[#18E299]"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            {t("navbar.cart", { default: "Cart" })}
            {itemCount > 0 && (
              <span className="rounded-full bg-[#18E299] px-1.5 py-0.5 text-[10px] font-bold text-[#0d0d0d] leading-none">
                {itemCount}
              </span>
            )}
          </DisclosureButton>
          <div className="pt-2">
            <select
              value={locale}
              onChange={(e) =>
                router.push(`/${e.target.value}${pathWithoutLocale}`)
              }
              className="w-full cursor-pointer rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 text-sm font-medium text-[#0d0d0d]"
              aria-label="Language"
            >
              <option value="pt">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
