// Skeletons that match the brand tile and brand-page product row geometry.

function BrandTileSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">
      <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-stone-200 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-3/4 rounded-md bg-stone-200 animate-pulse" />
        <div className="h-3.5 w-1/3 rounded bg-stone-100 animate-pulse" />
      </div>
    </div>
  );
}

export function CompanyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
      aria-busy="true"
      aria-label="Loading brands"
    >
      {Array.from({ length: count }).map((_, i) => (
        <BrandTileSkeleton key={i} />
      ))}
    </div>
  );
}

export function BrandProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-white"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 p-4 sm:p-5">
          <div className="h-5 w-1/2 rounded-md bg-stone-200 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-16 rounded-xl bg-stone-100 animate-pulse" />
            <div className="h-10 w-16 rounded-xl bg-stone-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
