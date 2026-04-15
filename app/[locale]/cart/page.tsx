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
        <ShoppingBagIcon className="h-16 w-16 text-[#e5e5e5]" />
        <p className="text-xl font-medium text-[#888888]">{t("empty")}</p>
        <Link
          href={`/${locale}/`}
          className="rounded-full bg-[#0d0d0d] px-5 py-2.5 text-sm font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
        >
          {t("backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d] mb-8">
          {t("title")}
        </h1>
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-5 shadow-[rgba(0,0,0,0.03)_0px_2px_4px]"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#0d0d0d] truncate">
                  {product.name}
                </p>
                <p className="text-sm text-[#666666] mt-0.5 line-clamp-1 leading-[1.5]">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="rounded-full p-1.5 text-[#888888] border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.15)] hover:text-[#0d0d0d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label={t("decreaseQty")}
                >
                  <MinusIcon className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center font-medium text-[#0d0d0d]">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="rounded-full p-1.5 text-[#888888] border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.15)] hover:text-[#0d0d0d] transition-colors"
                  aria-label={t("increaseQty")}
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="w-24 text-right font-semibold text-[#0d0d0d] text-sm tracking-[-0.2px]">
                R$ {(product.price * quantity).toLocaleString("pt-BR")}
              </span>
              <button
                onClick={() => removeItem(product.id)}
                className="rounded-full p-1.5 text-[#888888] hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label={t("remove")}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[rgba(0,0,0,0.03)_0px_2px_4px]">
          <div className="flex items-center justify-between text-base font-semibold text-[#0d0d0d]">
            <span>{t("subtotal")}</span>
            <span className="text-xl font-semibold tracking-[-0.2px]">
              R$ {total.toLocaleString("pt-BR")}
            </span>
          </div>
          <Link
            href={`/${locale}/checkout`}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-[#0d0d0d] px-5 py-3 text-sm font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
          >
            {t("checkout")}
          </Link>
          <Link
            href={`/${locale}/`}
            className="mt-3 flex w-full items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-5 py-2.5 text-sm font-medium text-[#0d0d0d] transition-opacity hover:opacity-90"
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
