"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Share2, Star } from "lucide-react";
import { Product, ProductPrice } from "@/types/product";
import { orderProductViaWhatsApp } from "@/lib/whatsapp";
import { formatCurrency } from "@/config/currency";

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
  const isCompact = variant === "featured";
  const displayCategory =
    product.subcategory?.name || product.category?.name || "General";

  const prices = product.productPrices || [];
  const lowestPrice =
    prices.length > 0 ? Math.min(...prices.map((p) => p.price)) : 0;
  const highestPrice =
    prices.length > 0 ? Math.max(...prices.map((p) => p.price)) : 0;

  const handleAddToCart = () => {
    const priceToUse = selectedVariant?.price || lowestPrice;
    const variantInfo = selectedVariant ? ` (${selectedVariant.variant})` : "";
    orderProductViaWhatsApp(product.name + variantInfo, priceToUse, product.id);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        className="group relative bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-300 p-4 pb-6 cursor-pointer hover:border-emerald-300"
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-stone-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
              {product.badge}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-2 flex items-center justify-between">
          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
            {displayCategory}
          </span>
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-stone-600">
                {product.rating.toFixed(1)}
              </span>
              {product.reviews > 0 && (
                <span className="text-xs text-stone-400">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base font-semibold text-stone-900 tracking-tight mb-3 line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h4>

        {/* Variant Buttons & Price */}
        <div className="mb-4">
          {prices.length > 0 ? (
            <div className="space-y-2">
              {/* Variant Buttons */}
              <div
                className="flex flex-wrap gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                {prices.map((priceVariant, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariant(priceVariant);
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                      selectedVariant?.variant === priceVariant.variant
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-600"
                    }`}
                  >
                    {priceVariant.variant}
                  </button>
                ))}
              </div>
              {/* Price Display */}
              <div className="text-lg font-bold text-emerald-600">
                {formatCurrency(
                  selectedVariant?.price || prices[0]?.price || 0,
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm text-stone-400">Price not set</span>
          )}
        </div>

        {/* Button */}
        <button
          className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-emerald-200"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Order via WhatsApp</span>
        </button>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-stone-200 p-0 gap-0 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-64 md:h-full bg-stone-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                    {displayCategory}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-stone-900 mb-2">
                  {product.name}
                </DialogTitle>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-stone-600">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviews > 0 && (
                      <span className="text-sm text-stone-400">
                        ({product.reviews} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Variant Selector */}
                {prices.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-stone-700">
                      Select Size/Variant:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {prices.map((priceVariant, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedVariant(priceVariant)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all ${
                            selectedVariant?.variant === priceVariant.variant
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-stone-700 border-stone-200 hover:border-emerald-400 hover:text-emerald-600"
                          }`}
                        >
                          {priceVariant.variant}
                        </button>
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(
                        selectedVariant?.price || prices[0]?.price || 0,
                      )}
                    </div>
                  </div>
                )}
              </div>

              {product.description && (
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              )}

              <div className="space-y-3 pt-2">
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-emerald-100"
                  onClick={handleAddToCart}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order via WhatsApp
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-emerald-700 rounded-xl py-6"
                    onClick={() => {
                      // Share functionality
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
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
