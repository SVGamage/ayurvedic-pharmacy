import { Package } from "lucide-react";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Package className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600 mx-auto"></div>
        </div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">
          Loading Ayurvedic Products...
        </h3>
        <p className="text-emerald-600">Preparing your wellness catalog</p>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="relative bg-gradient-to-b from-white to-stone-50/80 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-stone-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-3 sm:p-5 pt-3 sm:pt-4 space-y-3">
        {/* Category tag */}
        <div className="h-3 bg-emerald-100 rounded w-20 animate-pulse" />
        {/* Title */}
        <div className="h-5 bg-stone-200 rounded-md w-3/4 animate-pulse" />
        {/* Variant pills */}
        <div className="flex gap-2">
          <div className="h-7 bg-stone-100 rounded-lg w-16 animate-pulse" />
          <div className="h-7 bg-stone-100 rounded-lg w-16 animate-pulse" />
        </div>
        {/* Add to cart button */}
        <div className="h-10 sm:h-11 bg-emerald-50 border-2 border-emerald-100 rounded-xl sm:rounded-2xl animate-pulse" />
        {/* WhatsApp button */}
        <div className="h-11 sm:h-12 bg-emerald-100 rounded-xl sm:rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
