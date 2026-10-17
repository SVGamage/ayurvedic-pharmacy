"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/cart-context";
import type { CartItem as CartItemType } from "@/types/product";
import { CartItem } from "./cart-item";
import { formatCurrency } from "@/config/currency";
import {
  orderCartViaWhatsApp,
  type OrderCustomerDetails,
} from "@/lib/whatsapp";
import { toast } from "sonner";

// Remembered so repeat buyers don't retype their name and town.
const DETAILS_KEY = "rathnadeepa-order-details";

export function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    clearCart,
    restoreItems,
    totalItems,
    totalPrice,
  } = useCart();
  const [details, setDetails] = useState<OrderCustomerDetails>({});
  // Kept so "Clear cart" can be undone inside the sheet (it's modal, so a toast can't be clicked).
  const [clearedItems, setClearedItems] = useState<CartItemType[] | null>(
    null,
  );

  useEffect(() => {
    if (items.length > 0) setClearedItems(null);
  }, [items.length]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DETAILS_KEY);
      if (saved) setDetails(JSON.parse(saved));
    } catch {
      // Storage unavailable: the fields simply start empty.
    }
  }, []);

  const updateDetails = (field: keyof OrderCustomerDetails, value: string) => {
    setDetails((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem(DETAILS_KEY, JSON.stringify(next));
      } catch {
        // Not critical; the order still sends.
      }
      return next;
    });
  };

  const handleClearCart = () => {
    setClearedItems(items);
    clearCart();
  };

  const handleUndoClear = () => {
    if (clearedItems) restoreItems(clearedItems);
    setClearedItems(null);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    orderCartViaWhatsApp(items, details);
    closeCart();
    toast.success("Your order is ready in WhatsApp", {
      description:
        "Press send there. We'll reply to confirm stock and delivery.",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-[92vw] sm:w-[85vw] sm:max-w-md flex flex-col p-0 h-[100dvh] max-h-[100dvh]"
      >
        {/* Header */}
        <SheetHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-100 flex-shrink-0">
          <SheetTitle className="text-lg sm:text-xl font-serif font-semibold text-stone-800">
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
                {clearedItems ? "Cart cleared" : "Your cart is empty"}
              </h3>
              {clearedItems ? (
                <Button
                  variant="outline"
                  onClick={handleUndoClear}
                  className="mt-1 rounded-full border-stone-300 px-5"
                >
                  Undo
                </Button>
              ) : (
                <p className="text-xs sm:text-sm text-stone-500 max-w-[220px]">
                  Add remedies from the shop, then send the list to us on
                  WhatsApp.
                </p>
              )}
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedVariant.variant}`}
                  item={item}
                />
              ))}

              {/* Optional details that go into the WhatsApp message */}
              <div className="mt-2 mb-4 grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="order-name" className="text-xs text-stone-600">
                    Your name <span className="text-stone-400">(optional)</span>
                  </Label>
                  <Input
                    id="order-name"
                    autoComplete="name"
                    value={details.name ?? ""}
                    onChange={(e) => updateDetails("name", e.target.value)}
                    className="h-11 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="order-town" className="text-xs text-stone-600">
                    Town for delivery{" "}
                    <span className="text-stone-400">(optional)</span>
                  </Label>
                  <Input
                    id="order-town"
                    autoComplete="address-level2"
                    value={details.town ?? ""}
                    onChange={(e) => updateDetails("town", e.target.value)}
                    className="h-11 bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Sticky */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 space-y-3 flex-shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600">
                Subtotal
              </span>
              <span className="text-lg font-bold text-stone-800 tabular-nums">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* How ordering works */}
            <div className="rounded-xl bg-emerald-50 px-3 py-2.5 text-xs text-emerald-900 leading-relaxed">
              <p>
                No payment now. We&apos;ll reply on WhatsApp to confirm stock
                and delivery anywhere in Sri Lanka. Closed on Poya days.
              </p>
              <p lang="si" className="mt-1 text-emerald-800">
                දැන් ගෙවීමක් අවශ්‍ය නැත. තොගය සහ බෙදාහැරීම WhatsApp හරහා අපි
                තහවුරු කරමු. පෝය දිනවල වසා ඇත.
              </p>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 sm:h-14 rounded-xl text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Send order on WhatsApp
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleClearCart}
                className="inline-flex min-h-10 items-center px-3 text-xs font-medium text-stone-500 underline-offset-4 hover:text-red-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
