"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, MessageCircle, Heart, Share2, Info } from "lucide-react";
import { Product } from "@/types/product";
import { orderProductViaWhatsApp } from "@/lib/whatsapp";
import { formatCurrency, formatSavings } from "@/config/currency";
import { cn } from "@/lib/utils";

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
  const isCompact = variant === "featured";
  const displayCategory =
    product.subcategory?.name || product.category?.name || "General";

  const handleAddToCart = () => {
    orderProductViaWhatsApp(product.name, product.price, product.id);
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

        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-3">
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {displayCategory}
          </span>
          <div className="flex items-center space-x-1.5 bg-stone-50 px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-stone-700">
              {product.rating}
            </span>
            <span className="text-sm text-stone-400">({product.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-stone-900 tracking-tight mb-4 line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h4>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-semibold text-emerald-600 tracking-tight">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through decoration-stone-300">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] uppercase font-semibold tracking-wide">
              Save {formatSavings(product.originalPrice, product.price)}
            </span>
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
                  <div className="flex items-center space-x-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-stone-700">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-stone-900 mb-2">
                  {product.name}
                </DialogTitle>
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
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
