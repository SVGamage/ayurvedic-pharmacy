"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";

export function CartIcon() {
  const { openCart, totalItems } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-stone-600 hover:text-emerald-700 hover:bg-stone-100 rounded-full transition-colors"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 && (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center",
            "bg-emerald-600 text-white text-[10px] font-bold rounded-full px-1",
            "animate-in zoom-in-50 duration-200"
          )}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
