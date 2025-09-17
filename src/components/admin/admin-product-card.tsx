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
    <Card className="group border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 bg-white rounded-lg overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        </div>

        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white border-0 shadow-lg px-2 py-1 text-xs font-semibold">
            {product.badge}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-2 flex-grow p-3">
        <div className="flex items-start justify-between">
          <span className="text-blue-600 font-semibold uppercase tracking-wide text-xs bg-blue-50 px-2 py-1 rounded-full">
            {displayCategory}
          </span>
          <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>

        <CardTitle className="font-bold text-gray-900 leading-tight text-sm">
          {product.name}
        </CardTitle>

        {product.description && (
          <p
            className="text-xs text-gray-600 leading-relaxed overflow-hidden flex-grow"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.3em",
              maxHeight: "1.3em",
            }}
          >
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-baseline space-x-1">
            <span className="font-bold text-blue-600 text-lg">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto p-3">
        <div className="w-full flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => onDelete(product)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
