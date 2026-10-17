"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  MessageCircle,
  Share2,
  Star,
  Leaf,
  Sparkles,
  ShoppingCart,
  Stethoscope,
} from "lucide-react";
import { Product, ProductPrice } from "@/types/product";
import {
  askAboutProductViaWhatsApp,
  orderProductViaWhatsApp,
} from "@/lib/whatsapp";
import { formatCurrency } from "@/config/currency";
import { useCart } from "@/contexts/cart-context";
import {
  getRichTextPreview,
  hasVisibleRichTextContent,
  sanitizeRichText,
} from "@/lib/rich-text";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
  showQuickAdd?: boolean;
  showDescription?: boolean;
  /** Open the details dialog on mount (used for ?product= deep links). */
  defaultOpen?: boolean;
  /** Render only the details dialog, not the card (deep link to a product not on this page). */
  dialogOnly?: boolean;
  onDialogClose?: () => void;
}

export function ProductCard({
  product,
  showDescription = true,
  defaultOpen = false,
  dialogOnly = false,
  onDialogClose,
}: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpen);
  const [selectedVariant, setSelectedVariant] = useState<ProductPrice | null>(
    product.productPrices?.[0] || null,
  );
  const { addItem, openCart } = useCart();
  const sizeLabelId = useId();
  const displayCategory =
    product.subcategory?.name || product.category?.name || "General";
  const safeDescriptionHtml = useMemo(
    () => sanitizeRichText(product.description),
    [product.description],
  );
  const hasDescription = hasVisibleRichTextContent(safeDescriptionHtml);
  const previewDescription = useMemo(
    () => getRichTextPreview(product.description, 120, "...."),
    [product.description],
  );

  const prices = product.productPrices || [];
  const hasPrice = prices.length > 0;
  const lowestPrice = hasPrice ? Math.min(...prices.map((p) => p.price)) : 0;
  // "From" is only honest when the sizes actually cost different amounts.
  const hasPriceRange =
    prices.length > 1 && new Set(prices.map((p) => p.price)).size > 1;
  const currentVariant = selectedVariant || prices[0] || null;
  const currentPrice = currentVariant?.price ?? lowestPrice;

  const handleOrderViaWhatsApp = () => {
    const variantInfo = currentVariant ? ` (${currentVariant.variant})` : "";
    orderProductViaWhatsApp(product.name + variantInfo, currentPrice);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentVariant) return;
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      selectedVariant: {
        variant: currentVariant.variant,
        price: currentVariant.price,
      },
      category: displayCategory,
    });
    toast.success(`${product.name} (${currentVariant.variant}) added`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/products?product=${product.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // Share sheet dismissed; nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied", { description: product.name });
    } catch {
      toast.error("Couldn't copy the link", { description: url });
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) onDialogClose?.();
  };

  const variantButton = (
    priceVariant: ProductPrice,
    index: number,
    size: "card" | "dialog",
  ) => {
    const isSelected = currentVariant?.variant === priceVariant.variant;
    return (
      <button
        key={index}
        type="button"
        aria-pressed={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedVariant(priceVariant);
        }}
        className={`min-h-10 px-3 font-medium rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1 ${
          size === "card" ? "text-xs sm:text-sm" : "text-sm px-4"
        } ${
          isSelected
            ? "bg-emerald-700 text-white border-emerald-700"
            : "bg-white text-stone-700 border-stone-200 hover:border-emerald-400 hover:bg-stone-50"
        }`}
      >
        {priceVariant.variant}
      </button>
    );
  };

  const askPriceButton = (className: string) => (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        askAboutProductViaWhatsApp(product.name, "price");
      }}
    >
      <MessageCircle className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">Ask price on WhatsApp</span>
    </button>
  );

  return (
    <>
      {!dialogOnly && (
        <div
          className="group relative cursor-pointer h-full"
          onClick={() => setIsDialogOpen(true)}
        >
          {/* Card Container with Layered Shadow Effect */}
          <div className="relative h-full flex flex-col bg-gradient-to-b from-white to-stone-50/80 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border border-stone-200/60 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15),0_8px_20px_-8px_rgba(0,0,0,0.08)]">
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Price - Top Right */}
              {hasPrice && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 rounded-xl sm:rounded-2xl bg-white/95 px-2.5 py-1.5 sm:px-4 sm:py-2 flex flex-col items-end shadow-sm">
                  {hasPriceRange && (
                    <span className="text-[11px] sm:text-xs font-medium text-stone-500 uppercase tracking-wider">
                      From
                    </span>
                  )}
                  <span className="text-sm sm:text-lg font-bold text-stone-800 tracking-tight tabular-nums">
                    {formatCurrency(hasPriceRange ? lowestPrice : currentPrice)}
                  </span>
                </div>
              )}

              {/* Badge - Top Left */}
              {product.badge && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center gap-1 sm:gap-1.5 bg-emerald-700 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate max-w-[80px] sm:max-w-none">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Rating - Bottom Left */}
              {product.rating > 0 && (
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10 flex items-center gap-1 sm:gap-1.5 bg-white/95 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                  <Star
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-stone-700">
                    <span className="sr-only">Rated </span>
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviews > 0 && (
                    <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                      ({product.reviews})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="relative flex flex-1 flex-col p-3 sm:p-5 pt-3 sm:pt-4">
              {/* Category Tag */}
              <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-700 min-w-0 mb-2 sm:mb-3">
                <Leaf className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                  {displayCategory}
                </span>
              </div>

              {/* Product Name: a real button so keyboard users can open details */}
              <h3 className="mb-3 sm:mb-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                  }}
                  className="text-left text-sm sm:text-lg font-semibold text-stone-800 tracking-tight line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors duration-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                >
                  {product.name}
                </button>
              </h3>

              {/* Sizes */}
              {prices.length > 1 && (
                <div
                  className="mb-3 sm:mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2"
                  role="group"
                  aria-label="Size"
                  onClick={(e) => e.stopPropagation()}
                >
                  {prices.map((p, i) => variantButton(p, i, "card"))}
                  {hasPriceRange && (
                    <span className="ml-auto text-sm font-semibold text-stone-800 tabular-nums">
                      {formatCurrency(currentPrice)}
                    </span>
                  )}
                </div>
              )}

              {prices.length === 1 && (
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-xl bg-stone-100 text-stone-700">
                    {prices[0].variant}
                  </span>
                </div>
              )}

              {!hasPrice && (
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-stone-500 italic">
                  Price on request
                </p>
              )}

              {showDescription && hasDescription && (
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {previewDescription}
                </p>
              )}

              {/* Actions: WhatsApp is the till, the cart collects for later */}
              <div className="mt-auto space-y-2">
                {hasPrice ? (
                  <>
                    <button
                      type="button"
                      className="w-full min-h-11 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderViaWhatsApp();
                      }}
                    >
                      <MessageCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Order on WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      className="w-full min-h-11 flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Add to Cart</span>
                    </button>
                  </>
                ) : (
                  askPriceButton(
                    "w-full min-h-11 flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="w-[95vw] max-w-3xl h-[85dvh] sm:h-auto sm:max-h-[85vh] bg-white border-0 p-0 gap-0 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2 h-full md:h-auto md:max-h-[85vh] overflow-hidden">
            {/* Product Image */}
            <div className="relative h-[180px] sm:h-[220px] md:h-auto md:min-h-[400px] bg-stone-100 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 95vw, 384px"
                className="object-cover"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-1.5 bg-emerald-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  {product.badge}
                </div>
              )}
            </div>

            {/* Details: scrolls, with a visible scrollbar */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col md:max-h-[85vh]">
              {/* Category */}
              <div className="flex items-center gap-1.5 self-start text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full mb-3 sm:mb-4">
                <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  {displayCategory}
                </span>
              </div>

              <DialogTitle className="text-2xl sm:text-3xl font-serif font-semibold text-stone-800 mb-2 sm:mb-4 leading-tight">
                {product.name}
              </DialogTitle>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-0.5 sm:gap-1" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          star <= Math.round(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-stone-700">
                    <span className="sr-only">Rated </span>
                    {product.rating.toFixed(1)}
                    <span className="sr-only"> out of 5</span>
                  </span>
                  {product.reviews > 0 && (
                    <span className="text-xs sm:text-sm text-stone-500">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {hasDescription && (
                <div
                  className="text-stone-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-stone-800 [&_h2]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-300 [&_blockquote]:pl-3 [&_blockquote]:italic"
                  dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                />
              )}

              {/* Size and price */}
              {hasPrice ? (
                <div className="mb-5 sm:mb-6">
                  <p
                    id={sizeLabelId}
                    className="text-xs sm:text-sm font-semibold text-stone-700 uppercase tracking-wider mb-2"
                  >
                    Size
                  </p>
                  <div
                    role="group"
                    aria-labelledby={sizeLabelId}
                    className="flex flex-wrap gap-2"
                  >
                    {prices.map((p, i) => variantButton(p, i, "dialog"))}
                  </div>
                  <p className="pt-3 text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight tabular-nums">
                    {formatCurrency(currentPrice)}
                  </p>
                </div>
              ) : (
                <p className="mb-5 text-sm text-stone-500 italic">
                  Price on request
                </p>
              )}

              {/* Actions */}
              <div className="space-y-2 sm:space-y-3 mt-auto pt-4 border-t border-stone-100">
                {hasPrice ? (
                  <>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base"
                      onClick={handleOrderViaWhatsApp}
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Order on WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl sm:rounded-2xl h-11 sm:h-12 font-semibold text-sm sm:text-base"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </>
                ) : (
                  askPriceButton(
                    "w-full h-12 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                  )
                )}

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      askAboutProductViaWhatsApp(product.name, "doctor")
                    }
                    className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-emerald-800 underline-offset-4 hover:underline rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <Stethoscope className="h-4 w-4" aria-hidden="true" />
                    Ask our doctor about this
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-800 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
