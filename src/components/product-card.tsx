"use client";

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
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
  showQuickAdd?: boolean;
  showDescription?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
}

export function ProductCard({
  product,
  variant = "default",
  showQuickAdd = true,
  showDescription = true,
  onAddToCart,
  onQuickAdd,
}: ProductCardProps) {
  const isCompact = variant === "featured";
  const displayCategory = product.subcategory || product.category;

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleQuickAdd = () => {
    onQuickAdd?.(product);
  };

  return (
    <Card
      className={`group border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white rounded-xl overflow-hidden hover:-translate-y-1 flex flex-col h-full ${
        isCompact ? "hover:shadow-lg" : ""
      }`}
    >
      <CardHeader className="p-0 relative">
        <div
          className={`relative w-full overflow-hidden rounded-t-xl ${
            isCompact ? "h-48" : "h-52"
          }`}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {!isCompact && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        {product.badge && (
          <Badge
            className={`absolute top-3 left-3 text-white border-0 shadow-lg px-3 py-1 text-xs font-semibold ${
              isCompact
                ? "bg-green-600"
                : "bg-gradient-to-r from-green-600 to-green-700"
            }`}
          >
            {product.badge}
          </Badge>
        )}

        {showQuickAdd && !isCompact && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow-md rounded-full h-8 w-8 p-0"
              onClick={handleQuickAdd}
            >
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent
        className={`space-y-3 flex-grow ${isCompact ? "p-4" : "p-5"}`}
      >
        <div className="flex items-start justify-between">
          <span
            className={`text-green-600 font-semibold uppercase tracking-wide rounded-full ${
              isCompact
                ? "text-sm font-medium"
                : "text-xs bg-green-50 px-2 py-1"
            }`}
          >
            {displayCategory}
          </span>
          <div
            className={`flex items-center space-x-1 ${
              isCompact ? "" : "bg-gray-50 px-2 py-1 rounded-full"
            }`}
          >
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>

        <CardTitle
          className={`font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors duration-300 ${
            isCompact ? "text-lg mb-2" : "text-lg"
          }`}
        >
          {product.name}
        </CardTitle>

        {showDescription && product.description && !isCompact && (
          <p
            className="text-sm text-gray-600 leading-relaxed overflow-hidden flex-grow"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.4em",
              maxHeight: "2.8em",
            }}
          >
            {product.description}
          </p>
        )}

        <div
          className={`flex items-center justify-between mt-auto ${
            isCompact ? "" : "pt-2"
          }`}
        >
          <div className="flex items-baseline space-x-2">
            <span
              className={`font-bold text-green-600 ${
                isCompact ? "text-xl" : "text-2xl"
              }`}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.originalPrice && !isCompact && (
            <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className={`pt-0 mt-auto ${isCompact ? "p-4" : "p-5"}`}>
        <Button
          className={`w-full text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] ${
            isCompact
              ? "bg-green-600 hover:bg-green-700 py-2"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-2.5"
          }`}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
