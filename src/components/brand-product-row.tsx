"use client";

import { useState } from "react";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { BrandProduct, PriceVariant } from "@/types/company";
import { formatCurrency } from "@/config/currency";
import { useCart } from "@/contexts/cart-context";
import {
  askAboutProductViaWhatsApp,
  orderProductViaWhatsApp,
} from "@/lib/whatsapp";
import { splitBilingualName } from "@/lib/brand";

interface BrandProductRowProps {
  product: BrandProduct;
  /** Brand name as shoppers say it (English part), used in messages and the cart. */
  brandName: string;
  brandImage?: string | null;
}

export function BrandProductRow({
  product,
  brandName,
  brandImage,
}: BrandProductRowProps) {
  const prices = product.prices;
  const [selected, setSelected] = useState<PriceVariant | null>(
    prices[0] ?? null,
  );
  const { addItem, openCart } = useCart();
  const fullName = `${brandName} ${product.name}`;
  const names = splitBilingualName(product.name);

  const handleOrder = () => {
    if (!selected) return;
    orderProductViaWhatsApp(`${fullName} (${selected.variant})`, selected.price);
  };

  const handleAddToCart = () => {
    if (!selected) return;
    addItem({
      id: product.id,
      name: fullName,
      image: brandImage || "/placeholder.svg",
      selectedVariant: { variant: selected.variant, price: selected.price },
      category: brandName,
    });
    toast.success(`${product.name} (${selected.variant}) added`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  return (
    <li className="flex flex-col gap-3 p-4 sm:p-5 md:flex-row md:items-center md:gap-6">
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-snug text-stone-800">
          {names.primary}
          {names.sinhala && (
            <span lang="si" className="block text-sm font-normal text-stone-600">
              {names.sinhala}
            </span>
          )}
        </h3>
        {product.subCategory?.name && (
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-emerald-700">
            {product.subCategory.name}
          </p>
        )}

        {prices.length > 1 && (
          <div
            role="group"
            aria-label={`Size for ${names.primary}`}
            className="mt-3 flex flex-wrap gap-2"
          >
            {prices.map((p) => {
              const isSelected = selected?.variant === p.variant;
              return (
                <button
                  key={p.variant}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(p)}
                  className={`min-h-10 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1 ${
                    isSelected
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-emerald-400 hover:bg-stone-50"
                  }`}
                >
                  {p.variant}
                </button>
              );
            })}
          </div>
        )}
        {prices.length === 1 && (
          <p className="mt-2 text-sm text-stone-600">{prices[0].variant}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:justify-end">
        {selected ? (
          <>
            <span className="mr-auto text-lg font-bold text-stone-800 tabular-nums md:mr-2">
              {formatCurrency(selected.price)}
            </span>
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-emerald-600 px-4 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleOrder}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Order on WhatsApp
            </button>
          </>
        ) : (
          <>
            <span className="mr-auto text-sm italic text-stone-500 md:mr-2">
              Price on request
            </span>
            <button
              type="button"
              onClick={() => askAboutProductViaWhatsApp(fullName, "price")}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-emerald-600 px-4 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask price on WhatsApp
            </button>
          </>
        )}
      </div>
    </li>
  );
}
