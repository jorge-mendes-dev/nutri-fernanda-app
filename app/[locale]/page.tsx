"use client";

import { useCart, type Product } from "@/app/components/CartProvider";
import { CheckIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const PRODUCTS: Product[] = [
  {
    id: "plano-emagrecimento",
    name: "Plano Emagrecimento",
    description:
      "Protocolo personalizado para perda de peso com acompanhamento mensal e cardápios semanais.",
    price: 290,
    tag: "Popular",
  },
  {
    id: "plano-ganho-massa",
    name: "Plano Ganho de Massa",
    description:
      "Estratégia nutricional para hipertrofia com foco em performance e recuperação muscular.",
    price: 320,
  },
  {
    id: "plano-vegetariano",
    name: "Plano Vegetariano",
    description:
      "Dieta balanceada 100% plant-based, garantindo todos os micronutrientes essenciais.",
    price: 270,
  },
  {
    id: "plano-manutencao",
    name: "Plano Manutenção",
    description:
      "Equilíbrio nutricional para manter resultados e adotar hábitos alimentares saudáveis.",
    price: 250,
  },
  {
    id: "consulta-online",
    name: "Consulta Online",
    description:
      "Primeira consulta nutricional personalizada via videochamada com avaliação completa.",
    price: 180,
    tag: "Novo",
  },
  {
    id: "retorno-online",
    name: "Retorno Online",
    description:
      "Consulta de retorno para ajustes no plano e acompanhamento de evolução.",
    price: 120,
  },
  {
    id: "plano-gestante",
    name: "Plano Gestante",
    description:
      "Nutrição especializada para gestantes e lactantes com suporte trimestral.",
    price: 310,
  },
  {
    id: "plano-low-carb",
    name: "Plano Low Carb",
    description:
      "Protocolo low carb adaptado ao seu ritmo de vida, sem restrições extremas.",
    price: 280,
  },
];

const CARD_ACCENTS = [
  "from-green-100 to-emerald-50",
  "from-lime-100 to-green-50",
  "from-teal-100 to-cyan-50",
  "from-emerald-100 to-green-50",
  "from-green-100 to-lime-50",
  "from-yellow-50 to-lime-50",
  "from-pink-50 to-rose-50",
  "from-amber-50 to-yellow-50",
];

function ProductCard({
  product,
  accent,
}: {
  product: Product;
  accent: string;
}) {
  const t = useTranslations("home");
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.product.id === product.id);

  const handleAdd = () => {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="relative flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div
        className={`h-28 bg-linear-to-br ${accent} flex items-center justify-center`}
      >
        <ShoppingCartIcon className="h-10 w-10 text-green-600/30" />
      </div>
      {product.tag && (
        <span className="absolute top-3 right-3 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
          {product.tag}
        </span>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-700">
            R$ {product.price.toLocaleString("pt-BR")}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150 ${
              justAdded || inCart
                ? "bg-green-50 text-green-700 ring-1 ring-green-300"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-4 w-4" />
                {t("added")}
              </>
            ) : (
              <>
                <ShoppingCartIcon className="h-4 w-4" />
                {t("addToCart")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale();
  const { itemCount } = useCart();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#faf7f2]">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            {t("subtitle")}
          </p>
          {itemCount > 0 && (
            <Link
              href={`/${locale}/cart`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              {t("viewCart", { count: itemCount })}
            </Link>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              accent={CARD_ACCENTS[i % CARD_ACCENTS.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
