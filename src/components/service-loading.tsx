import { Briefcase } from "lucide-react";

export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Briefcase className="h-10 w-10 text-yellow-600" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-yellow-200 rounded-full animate-spin border-t-yellow-600 mx-auto"></div>
        </div>
        <h3 className="text-2xl font-bold text-yellow-800 mb-2">
          Loading Healing Services...
        </h3>
        <p className="text-yellow-600">Preparing your wellness offerings</p>
      </div>
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="relative bg-gradient-to-b from-white to-stone-50/80 rounded-3xl overflow-hidden border border-stone-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
      {/* Image Skeleton */}
      <div className="relative h-48 sm:h-56 bg-stone-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 space-y-3">
        {/* Category tag */}
        <div className="h-3 bg-emerald-100 rounded w-24 animate-pulse" />
        {/* Title */}
        <div className="h-6 bg-stone-200 rounded-md w-3/4 animate-pulse" />
        {/* Duration & Price row */}
        <div className="flex gap-4">
          <div className="h-4 bg-stone-100 rounded w-20 animate-pulse" />
          <div className="h-4 bg-stone-100 rounded w-24 animate-pulse" />
        </div>
        {/* Features */}
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-stone-100 rounded w-full animate-pulse" />
          <div className="h-3 bg-stone-100 rounded w-5/6 animate-pulse" />
          <div className="h-3 bg-stone-100 rounded w-2/3 animate-pulse" />
        </div>
        {/* Button */}
        <div className="h-12 bg-emerald-100 rounded-2xl animate-pulse mt-2" />
      </div>
    </div>
  );
}

export function ServiceGridSkeleton({ count = 4, columns = 2 }: { count?: number; columns?: number }) {
  const gridClass = columns === 2
    ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
    : "grid grid-cols-1 md:grid-cols-2 gap-8";

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}
