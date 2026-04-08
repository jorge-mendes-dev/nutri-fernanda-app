"use client";

import { AuthGuard } from "@/app/components/AuthGuard";
import { useCart } from "@/app/components/CartProvider";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

function CartContent() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <ShoppingBagIcon className="h-16 w-16 text-gray-300" />
        <p className="text-xl font-medium text-gray-500">{t("empty")}</p>
        <Link
          href={`/${locale}/`}
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          {t("backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#faf7f2] py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("title")}</h1>
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="rounded-md p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label={t("decreaseQty")}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-medium text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                  aria-label={t("increaseQty")}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <span className="w-24 text-right font-bold text-green-700 text-sm">
                R$ {(product.price * quantity).toLocaleString("pt-BR")}
              </span>
              <button
                onClick={() => removeItem(product.id)}
                className="rounded-md p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label={t("remove")}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between text-base font-semibold text-gray-900">
            <span>{t("subtotal")}</span>
            <span className="text-green-700 text-xl">
              R$ {total.toLocaleString("pt-BR")}
            </span>
          </div>
          <Link
            href={`/${locale}/checkout`}
            className="mt-5 flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
          >
            {t("checkout")}
          </Link>
          <Link
            href={`/${locale}/`}
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-colors"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <AuthGuard>
      <CartContent />
    </AuthGuard>
  );
}
