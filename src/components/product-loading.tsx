import { Package } from "lucide-react";

export default function ProductLoading() {
  return (
    <div
      className="min-h-screen bg-stone-50 flex items-center justify-center"
      role="status"
    >
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin motion-reduce:animate-none" />
          <Package className="absolute inset-0 m-auto h-7 w-7 text-emerald-700" />
        </div>
        <p className="text-xl font-serif font-semibold text-stone-800">
          Loading products…
        </p>
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
        {/* WhatsApp button */}
        <div className="h-11 bg-emerald-100 rounded-xl sm:rounded-2xl animate-pulse" />
        {/* Add to cart button */}
        <div className="h-11 bg-emerald-50 border-2 border-emerald-100 rounded-xl sm:rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
