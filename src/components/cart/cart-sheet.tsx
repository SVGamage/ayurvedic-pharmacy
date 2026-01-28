"use client";

import { ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { CartItem } from "./cart-item";
import { formatCurrency } from "@/config/currency";
import { orderCartViaWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";

export function CartSheet() {
  const { items, isOpen, closeCart, clearCart, totalItems, totalPrice } =
    useCart();

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    orderCartViaWhatsApp(items);
    closeCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-[92vw] sm:w-[85vw] sm:max-w-md flex flex-col p-0 h-[100dvh] max-h-[100dvh]"
      >
        {/* Header */}
        <SheetHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-100 flex-shrink-0">
          <SheetTitle className="text-base sm:text-lg font-semibold text-stone-800">
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm text-stone-500">
            {totalItems === 0
              ? "Your cart is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-100 flex items-center justify-center mb-3 sm:mb-4">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-stone-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-stone-700 mb-1.5 sm:mb-2">
                Your cart is empty
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-[200px]">
                Browse our products and add items to your cart
              </p>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedVariant.variant}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer - Sticky */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 space-y-3 sm:space-y-4 flex-shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-stone-600">
                Subtotal
              </span>
              <span className="text-base sm:text-lg font-bold text-emerald-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleCheckout}
                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold h-12 sm:h-14 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 group text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform group-hover:scale-110" />
                Order via WhatsApp
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>

              <Button
                onClick={handleClearCart}
                variant="outline"
                className="w-full border-2 border-stone-200 text-stone-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl h-10 sm:h-12 font-medium transition-all duration-300 text-xs sm:text-sm"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
