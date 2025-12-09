"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Package, Edit, Trash2, Tag } from "lucide-react";
import { Company } from "@/types/company";
import { cn } from "@/lib/utils";

interface AdminCompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export function AdminCompanyCard({
  company,
  onEdit,
  onDelete,
}: AdminCompanyCardProps) {
  const totalProducts = company.companyProducts.length;

  // Calculate average price from all product variants
  const totalPriceSum = company.companyProducts.reduce((sum, product) => {
    const prices = product.prices || [];
    const productAvgPrice =
      prices.length > 0
        ? prices.reduce((pSum, price) => pSum + price.price, 0) / prices.length
        : 0;
    return sum + productAvgPrice;
  }, 0);

  const averagePrice = totalProducts > 0 ? totalPriceSum / totalProducts : 0;

  return (
    <Card
      className={cn(
        "group border-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2 rounded-xl",
        "border-blue-200 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50"
      )}
    >
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute top-4 right-4 w-6 h-6 border-2 border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-4 h-4 border-2 border-blue-400 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute top-12 right-12 w-3 h-3 border-2 border-blue-400 rounded-full animate-pulse animation-delay-400"></div>
      </div>

      <CardHeader className="text-center pb-3 relative">
        <div
          className={cn(
            "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg",
            "bg-blue-100"
          )}
        >
          <Building2 className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-xl mb-2 font-bold text-blue-800">
          {company.name}
        </CardTitle>

        {/* Company Statistics */}
        <div className="flex items-center justify-center space-x-4 mt-3">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-700">
              {totalProducts}
            </div>
            <div className="text-xs text-gray-600">Products</div>
          </div>
          {totalProducts > 0 && (
            <div className="text-center">
              <div className="text-lg font-bold text-green-700">
                Rs. {averagePrice.toFixed(0)}
              </div>
              <div className="text-xs text-gray-600">Avg Price</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {/* Products Summary */}
        <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Products Overview
              </span>
            </div>
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              {totalProducts} items
            </Badge>
          </div>

          {totalProducts > 0 ? (
            <div className="space-y-2">
              {company.companyProducts.slice(0, 3).map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <Tag className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-700 font-medium truncate max-w-[120px]">
                      {product.name}
                    </span>
                    <span className="text-gray-500">({product.code})</span>
                    {product.subCategory && (
                      <span className="text-xs bg-gray-200 px-1 py-0.5 rounded">
                        {product.subCategory.name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 text-xs">
                    {product.prices && product.prices.length > 0 ? (
                      product.prices.length === 1 ? (
                        <span className="font-medium">
                          Rs.{product.prices[0].price.toFixed(0)}
                        </span>
                      ) : (
                        <span className="font-medium">
                          {product.prices.length} variants
                        </span>
                      )
                    ) : (
                      <span className="text-gray-400">No price</span>
                    )}
                  </div>
                </div>
              ))}
              {totalProducts > 3 && (
                <div className="text-xs text-gray-500 text-center font-medium">
                  +{totalProducts - 3} more products
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-2">
              <div className="text-xs text-gray-500">No products added yet</div>
            </div>
          )}
        </div>

        {/* Admin Actions */}
        <div className="flex space-x-3 pt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 font-semibold transition-all duration-200"
            onClick={() => onEdit(company)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-semibold transition-all duration-200"
            onClick={() => onDelete(company)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
