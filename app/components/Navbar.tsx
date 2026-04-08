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
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/src/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSession } from "./SessionProvider";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const { session } = useSession();
  const router = useRouter();
  const prevSession = useRef(session);

  // Refresh the router when session changes from null to a value (login)
  useEffect(() => {
    if (!prevSession.current && session) {
      router.refresh();
    }
    prevSession.current = session;
  }, [session, router]);
  return (
    <Disclosure as="nav" className="relative bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">
                {t("navbar.openMenu", { default: "Open main menu" })}
              </span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                alt="Logo"
                src="/logo.svg"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={`/${locale}/dashboard`}
                className="inline-flex items-center border-b-2 border-indigo-600 px-1 pt-1 text-sm font-medium text-gray-900"
              >
                {t("navbar.dashboard", { default: "Dashboard" })}
              </Link>
              <Link
                href={`/${locale}/team`}
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                {t("navbar.team", { default: "Team" })}
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {session ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">
                    {t("navbar.notifications", {
                      default: "View notifications",
                    })}
                  </span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">
                      {t("navbar.openUserMenu", { default: "Open user menu" })}
                    </span>
                    <Image
                      alt="User avatar"
                      src="/avatar.png"
                      width={32}
                      height={32}
                      className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                    />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <Link
                        href={`/${locale}/patient`}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        {t("navbar.profile", { default: "Your profile" })}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href={`/${locale}/settings`}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        {t("navbar.settings", { default: "Settings" })}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        onClick={async () => {
                          await supabase.auth.signOut();
                          router.refresh();
                          router.replace(`/${locale}/login`);
                        }}
                      >
                        {t("navbar.signOut", { default: "Sign out" })}
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
              >
                {t("navbar.login", { default: "Login" })}
              </Link>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-4">
          <DisclosureButton
            as={Link}
            href={`/${locale}/dashboard`}
            className="block border-l-4 border-indigo-600 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
          >
            {t("navbar.dashboard", { default: "Dashboard" })}
          </DisclosureButton>
          <DisclosureButton
            as={Link}
            href={`/${locale}/team`}
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            {t("navbar.team", { default: "Team" })}
          </DisclosureButton>
          <DisclosureButton
            as={Link}
            href={`/${locale}/projects`}
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            {t("navbar.projects", { default: "Projects" })}
          </DisclosureButton>
          <DisclosureButton
            as={Link}
            href={`/${locale}/calendar`}
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            {t("navbar.calendar", { default: "Calendar" })}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
