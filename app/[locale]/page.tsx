"use client";

import { useCart, type Product } from "@/app/components/CartProvider";
import { HeroSection } from "@/app/components/HeroSection";
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
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
  "bg-[#d4fae8]",
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
    <div className="relative flex flex-col rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white shadow-[rgba(0,0,0,0.03)_0px_2px_4px] overflow-hidden transition-all duration-200 hover:border-[rgba(0,0,0,0.08)] hover:shadow-[rgba(0,0,0,0.06)_0px_4px_12px]">
      <div className={`h-28 ${accent} flex items-center justify-center`}>
        <ShoppingCartIcon className="h-10 w-10 text-[#0fa76e]/40" />
      </div>
      {product.tag && (
        <span className="absolute top-3 right-3 rounded-full bg-[#d4fae8] px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.6px] text-[#0fa76e]">
          {product.tag}
        </span>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold tracking-[-0.2px] text-[#0d0d0d]">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm leading-[1.5] text-[#666666] flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-semibold tracking-[-0.2px] text-[#0d0d0d]">
            R$ {product.price.toLocaleString("pt-BR")}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-all duration-150 ${
              justAdded || inCart
                ? "bg-[#d4fae8] text-[#0fa76e]"
                : "bg-[#0d0d0d] text-white hover:opacity-90"
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
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <HeroSection />

      <div id="plans" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.65px] text-[#888888]">
              {t("subtitle")}
            </span>
            <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-[#0d0d0d]">
              {t("title")}
            </h2>
          </div>
          {itemCount > 0 && (
            <Link
              href={`/${locale}/cart`}
              className="inline-flex items-center gap-2 rounded-full bg-[#0d0d0d] px-5 py-2.5 text-sm font-medium text-white shadow-[rgba(0,0,0,0.06)_0px_1px_2px] transition-opacity hover:opacity-90"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              {t("viewCart", { count: itemCount })}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
