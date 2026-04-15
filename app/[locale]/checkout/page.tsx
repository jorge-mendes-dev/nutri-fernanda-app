"use client";

import { AuthGuard } from "@/app/components/AuthGuard";
import { useCart } from "@/app/components/CartProvider";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CheckoutContent() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      router.replace(`/${locale}/cart`);
    }
  }, [items.length, submitted, router, locale]);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d4fae8]">
          <CheckCircleIcon className="h-12 w-12 text-[#18E299]" />
        </div>
        <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d]">
          {t("successTitle")}
        </h2>
        <p className="max-w-sm text-[#666666] leading-[1.5]">
          {t("successMessage")}
        </p>
        <Link
          href={`/${locale}/`}
          className="rounded-full bg-[#0d0d0d] px-6 py-2.5 text-sm font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
        >
          {t("backToHome")}
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d] mb-8">
          {t("title")}
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Payment form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[rgba(0,0,0,0.03)_0px_2px_4px]">
              <h2 className="text-[15px] font-semibold tracking-[-0.2px] text-[#0d0d0d] mb-5">
                {t("paymentDetails")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#333333] mb-1"
                  >
                    {t("nameOnCard")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="João Silva"
                    className="block w-full rounded-full border border-[rgba(0,0,0,0.08)] px-4 py-2.5 text-sm text-[#0d0d0d] placeholder:text-[#888888] focus:border-[#18E299] focus:outline-[#18E299] focus:outline-1 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-[#333333] mb-1"
                  >
                    {t("cardNumber")}
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    required
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    className="block w-full rounded-full border border-[rgba(0,0,0,0.08)] px-4 py-2.5 text-sm text-[#0d0d0d] placeholder:text-[#888888] focus:border-[#18E299] focus:outline-[#18E299] focus:outline-1 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-[#333333] mb-1"
                    >
                      {t("expiry")}
                    </label>
                    <input
                      id="expiry"
                      name="expiry"
                      type="text"
                      required
                      maxLength={5}
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      className="block w-full rounded-full border border-[rgba(0,0,0,0.08)] px-4 py-2.5 text-sm text-[#0d0d0d] placeholder:text-[#888888] focus:border-[#18E299] focus:outline-[#18E299] focus:outline-1 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-[#333333] mb-1"
                    >
                      {t("cvv")}
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      required
                      maxLength={3}
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className="block w-full rounded-full border border-[rgba(0,0,0,0.08)] px-4 py-2.5 text-sm text-[#0d0d0d] placeholder:text-[#888888] focus:border-[#18E299] focus:outline-[#18E299] focus:outline-1 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#0d0d0d] px-5 py-3 text-sm font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
            >
              {t("placeOrder")}
            </button>
          </form>

          {/* Order summary */}
          <div className="rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[rgba(0,0,0,0.03)_0px_2px_4px] h-fit">
            <h2 className="text-[15px] font-semibold tracking-[-0.2px] text-[#0d0d0d] mb-5">
              {t("orderSummary")}
            </h2>
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-[#666666]">
                    {product.name}
                    {quantity > 1 && (
                      <span className="text-[#888888]"> ×{quantity}</span>
                    )}
                  </span>
                  <span className="font-medium text-[#0d0d0d]">
                    R$ {(product.price * quantity).toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-[rgba(0,0,0,0.05)] pt-4 flex justify-between items-center">
              <span className="font-semibold text-[#0d0d0d]">{t("total")}</span>
              <span className="text-xl font-semibold tracking-[-0.2px] text-[#0d0d0d]">
                R$ {total.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <CheckoutContent />
    </AuthGuard>
  );
}
