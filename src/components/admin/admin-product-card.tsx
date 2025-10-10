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
import { Star, Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/config/currency";

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function AdminProductCard({
  product,
  onEdit,
  onDelete,
}: AdminProductCardProps) {
  const displayCategory =
    product.subcategory?.name || product.category?.name || "Uncategorized";

  return (
    <Card className="group border-2 border-emerald-200 shadow-lg hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 bg-gradient-to-br from-white to-emerald-50 rounded-xl overflow-hidden flex flex-col h-full transform hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-36 overflow-hidden rounded-t-xl">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 shadow-lg px-3 py-1 text-xs font-bold rounded-full animate-pulse">
            {product.badge}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-3 flex-grow p-4">
        <div className="flex items-start justify-between">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            {displayCategory}
          </span>
          <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold text-yellow-700">
              {product.rating}
            </span>
            <span className="text-xs text-yellow-600">({product.reviews})</span>
          </div>
        </div>

        <CardTitle className="font-bold text-emerald-800 leading-tight text-base group-hover:text-emerald-900 transition-colors">
          {product.name}
        </CardTitle>

        {product.description && (
          <p
            className="text-sm text-emerald-600 leading-relaxed overflow-hidden flex-grow"
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

        <div className="flex items-center justify-between pt-2 mt-auto">
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-emerald-700 text-xl">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto p-4">
        <div className="w-full flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 font-semibold transition-all duration-200"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-semibold transition-all duration-200"
            onClick={() => onDelete(product)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
