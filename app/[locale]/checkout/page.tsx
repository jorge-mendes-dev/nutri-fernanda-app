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
        <CheckCircleIcon className="h-20 w-20 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          {t("successTitle")}
        </h2>
        <p className="max-w-sm text-gray-500">{t("successMessage")}</p>
        <Link
          href={`/${locale}/`}
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
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
    <div className="min-h-[calc(100vh-4rem)] bg-[#faf7f2] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("title")}</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Payment form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-base font-semibold text-gray-900 mb-5">
                {t("paymentDetails")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="block w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="block w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="block w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="block w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
            >
              {t("placeOrder")}
            </button>
          </form>

          {/* Order summary */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 h-fit">
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              {t("orderSummary")}
            </h2>
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {product.name}
                    {quantity > 1 && (
                      <span className="text-gray-400"> ×{quantity}</span>
                    )}
                  </span>
                  <span className="font-medium text-gray-900">
                    R$ {(product.price * quantity).toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="font-semibold text-gray-900">{t("total")}</span>
              <span className="text-xl font-bold text-green-700">
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
