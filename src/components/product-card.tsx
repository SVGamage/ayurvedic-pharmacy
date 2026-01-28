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
        className="group relative cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with Layered Shadow Effect */}
        <div className="relative bg-gradient-to-b from-white to-stone-50/80 rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border border-stone-200/60 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15),0_8px_20px_-8px_rgba(0,0,0,0.08)]">
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
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-2xl" />
                    <div className="relative px-4 py-2 flex flex-col items-end">
                      <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                        From
                      </span>
                      <span className="text-lg font-bold text-emerald-600 tracking-tight">
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
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg shadow-emerald-500/25">
                    <Sparkles className="w-3 h-3" />
                    {product.badge}
                  </div>
                </div>
              )}

              {/* Rating Badge - Bottom Left (on image) */}
              {product.rating > 0 && (
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-stone-700">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviews > 0 && (
                      <span className="text-xs text-stone-400 font-medium">
                        ({product.reviews})
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-5 pt-4">
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Leaf className="w-3 h-3" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  {displayCategory}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h4 className="text-lg font-semibold text-stone-800 tracking-tight mb-4 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors duration-300">
              {product.name}
            </h4>

            {/* Variant Selection */}
            {prices.length > 1 && (
              <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-wrap gap-2">
                  {prices.map((priceVariant, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(priceVariant);
                      }}
                      className={`relative px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${
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
              <div className="mb-4">
                <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-xl bg-stone-100 text-stone-600">
                  {prices[0].variant}
                </span>
              </div>
            )}

            {prices.length === 0 && (
              <div className="mb-4">
                <span className="text-sm text-stone-400 italic">
                  Price on request
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-center gap-2.5 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-3 rounded-2xl text-sm font-semibold transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:shadow-xl group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrderViaWhatsApp();
                }}
              >
                <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Order via WhatsApp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-stone-50 border-0 p-0 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Product Image Section */}
            <div className="relative h-72 md:h-full min-h-[400px] bg-gradient-to-br from-stone-100 to-stone-50">
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
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/30">
                    <Sparkles className="w-4 h-4" />
                    {product.badge}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="p-8 md:p-10 flex flex-col">
              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <Leaf className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {displayCategory}
                  </span>
                </div>
              </div>

              {/* Title */}
              <DialogTitle className="text-2xl md:text-3xl font-bold text-stone-800 mb-4 leading-tight tracking-tight">
                {product.name}
              </DialogTitle>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-base font-semibold text-stone-700">
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviews > 0 && (
                    <span className="text-sm text-stone-400">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-stone-600 text-base leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
              )}

              {/* Variant Selector */}
              {prices.length > 0 && (
                <div className="space-y-4 mb-6">
                  <label className="text-sm font-semibold text-stone-700 uppercase tracking-wider">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {prices.map((priceVariant, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedVariant(priceVariant)}
                        className={`px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
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
                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-3xl font-bold text-emerald-600 tracking-tight">
                      {formatCurrency(
                        selectedVariant?.price || prices[0]?.price || 0,
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mt-auto pt-4 border-t border-stone-100">
                <Button
                  variant="outline"
                  className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-2xl py-6 font-semibold transition-all duration-300"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2.5" />
                  Add to Cart
                </Button>

                <Button
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-7 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 group"
                  onClick={handleOrderViaWhatsApp}
                >
                  <MessageCircle className="h-5 w-5 mr-2.5 transition-transform group-hover:scale-110" />
                  Order via WhatsApp
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-2 border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-emerald-700 hover:border-emerald-200 rounded-2xl py-6 font-semibold transition-all duration-300"
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
                  <Share2 className="h-4 w-4 mr-2" />
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
