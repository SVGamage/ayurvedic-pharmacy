"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/config/currency";
import type { CartItem as CartItemType } from "@/types/product";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.selectedVariant.variant, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.selectedVariant.variant, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id, item.selectedVariant.variant);
  };

  return (
    <div className="flex gap-2.5 sm:gap-3 py-3 sm:py-4 border-b border-stone-100 last:border-b-0 animate-in slide-in-from-right-5 duration-200">
      {/* Product Image */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-stone-100">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-medium text-stone-800 line-clamp-2 pr-1 leading-tight">
          {item.name}
        </h4>
        <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5">
          {item.selectedVariant.variant}
        </p>
        <p className="text-xs sm:text-sm font-semibold text-emerald-600 mt-0.5 sm:mt-1">
          {formatCurrency(item.selectedVariant.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
          <div className="flex items-center border border-stone-200 rounded-md sm:rounded-lg">
            <button
              onClick={handleDecrement}
              className="p-1 sm:p-1.5 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-l-md sm:rounded-l-lg transition-colors active:bg-emerald-100"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <span className="px-2 sm:px-3 text-xs sm:text-sm font-medium text-stone-700 min-w-[24px] sm:min-w-[32px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1 sm:p-1.5 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-r-md sm:rounded-r-lg transition-colors active:bg-emerald-100"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="p-1 sm:p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md sm:rounded-lg transition-colors ml-auto active:bg-red-100"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
