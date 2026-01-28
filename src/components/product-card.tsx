"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Share2, Star, Leaf, Sparkles, ShoppingCart } from "lucide-react";
import { Product, ProductPrice } from "@/types/product";
import { orderProductViaWhatsApp } from "@/lib/whatsapp";
import { formatCurrency } from "@/config/currency";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
  showQuickAdd?: boolean;
  showDescription?: boolean;
}

export function ProductCard({
  product,
  variant = "default",
  showQuickAdd = true,
  showDescription = true,
}: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductPrice | null>(
    product.productPrices?.[0] || null,
  );
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const displayCategory =
    product.subcategory?.name || product.category?.name || "General";

  const prices = product.productPrices || [];
  const lowestPrice =
    prices.length > 0 ? Math.min(...prices.map((p) => p.price)) : 0;

  const handleOrderViaWhatsApp = () => {
    const priceToUse = selectedVariant?.price || lowestPrice;
    const variantInfo = selectedVariant ? ` (${selectedVariant.variant})` : "";
    orderProductViaWhatsApp(product.name + variantInfo, priceToUse, product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const variant = selectedVariant || prices[0];
    if (!variant) {
      toast.error("No variant available");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      selectedVariant: {
        variant: variant.variant,
        price: variant.price,
      },
      category: displayCategory,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with Layered Shadow Effect */}
        <div className="relative bg-gradient-to-b from-white to-stone-50/80 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border border-stone-200/60 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15),0_8px_20px_-8px_rgba(0,0,0,0.08)]">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50/80 to-transparent pointer-events-none" />

          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Price Badge - Top Right */}
              {prices.length > 0 && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl" />
                    <div className="relative px-2.5 py-1.5 sm:px-4 sm:py-2 flex flex-col items-end">
                      <span className="text-[8px] sm:text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                        From
                      </span>
                      <span className="text-sm sm:text-lg font-bold text-emerald-600 tracking-tight">
                        {formatCurrency(
                          selectedVariant?.price || prices[0]?.price || 0,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Badge - Top Left */}
              {product.badge && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide shadow-lg shadow-emerald-500/25">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span className="truncate max-w-[80px] sm:max-w-none">{product.badge}</span>
                  </div>
                </div>
              )}

              {/* Rating Badge - Bottom Left (on image) */}
              {product.rating > 0 && (
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10">
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-stone-700">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviews > 0 && (
                      <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
                        ({product.reviews})
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-3 sm:p-5 pt-3 sm:pt-4 overflow-hidden">
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-600 min-w-0">
                <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate">
                  {displayCategory}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h4 className="text-sm sm:text-lg font-semibold text-stone-800 tracking-tight mb-3 sm:mb-4 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors duration-300">
              {product.name}
            </h4>

            {/* Variant Selection */}
            {prices.length > 1 && (
              <div className="mb-3 sm:mb-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {prices.map((priceVariant, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(priceVariant);
                      }}
                      className={`relative px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-lg sm:rounded-xl transition-all duration-300 ${
                        selectedVariant?.variant === priceVariant.variant
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25"
                          : "bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                    >
                      {priceVariant.variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Single variant price display */}
            {prices.length === 1 && (
              <div className="mb-3 sm:mb-4">
                <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-lg sm:rounded-xl bg-stone-100 text-stone-600">
                  {prices[0].variant}
                </span>
              </div>
            )}

            {prices.length === 0 && (
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm text-stone-400 italic">
                  Price on request
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-center gap-1.5 sm:gap-2.5 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Add to Cart</span>
              </button>
              <button
                className="w-full relative overflow-hidden flex items-center justify-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:shadow-xl group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrderViaWhatsApp();
                }}
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
                <span className="truncate">Order via WhatsApp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] sm:max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-stone-50 border-0 p-0 gap-0 rounded-2xl sm:rounded-3xl shadow-2xl">
          <div className="flex flex-col md:grid md:grid-cols-2 max-h-[90vh] sm:max-h-[90vh] overflow-y-auto md:overflow-hidden">
            {/* Product Image Section */}
            <div className="relative h-48 sm:h-64 md:h-full md:min-h-[450px] bg-gradient-to-br from-stone-100 to-stone-50 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

              {/* Badge on Dialog Image */}
              {product.badge && (
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/30">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    {product.badge}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col md:overflow-y-auto md:max-h-[90vh]">
              {/* Category */}
              <div className="flex items-center gap-2 mb-2 sm:mb-4">
                <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                  <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    {displayCategory}
                  </span>
                </div>
              </div>

              {/* Title */}
              <DialogTitle className="text-lg sm:text-2xl md:text-3xl font-bold text-stone-800 mb-2 sm:mb-4 leading-tight tracking-tight">
                {product.name}
              </DialogTitle>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${
                          star <= Math.round(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-stone-700">
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviews > 0 && (
                    <span className="text-xs sm:text-sm text-stone-400">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {product.description}
                </p>
              )}

              {/* Variant Selector */}
              {prices.length > 0 && (
                <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                  <label className="text-xs sm:text-sm font-semibold text-stone-700 uppercase tracking-wider">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {prices.map((priceVariant, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedVariant(priceVariant)}
                        className={`px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          selectedVariant?.variant === priceVariant.variant
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25"
                            : "bg-white text-stone-700 border-stone-200 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {priceVariant.variant}
                      </button>
                    ))}
                  </div>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-2 pt-1 sm:pt-2">
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tracking-tight">
                      {formatCurrency(
                        selectedVariant?.price || prices[0]?.price || 0,
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3 mt-auto pt-3 sm:pt-4 border-t border-stone-100">
                <Button
                  variant="outline"
                  className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl sm:rounded-2xl h-11 sm:h-14 font-semibold transition-all duration-300 text-sm sm:text-base"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold h-12 sm:h-16 rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 group text-sm sm:text-base"
                  onClick={handleOrderViaWhatsApp}
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-transform group-hover:scale-110" />
                  Order via WhatsApp
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-2 border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-emerald-700 hover:border-emerald-200 rounded-xl sm:rounded-2xl h-11 sm:h-14 font-semibold transition-all duration-300 text-sm sm:text-base"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out this amazing Ayurvedic product: ${product.name}`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                  Share Product
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
