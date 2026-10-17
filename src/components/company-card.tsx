import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BrandSummary } from "@/types/company";
import { brandInitials, splitBilingualName } from "@/lib/brand";

/** Brand index tile: logo (or a typographic monogram), bilingual name, product count. */
export function CompanyCard({ company }: { company: BrandSummary }) {
  const { primary, sinhala } = splitBilingualName(company.name);

  return (
    <Link
      href={`/companies/${company.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition-colors hover:border-emerald-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
    >
      <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50">
        {company.image ? (
          <Image
            src={company.image}
            alt=""
            fill
            sizes="64px"
            className="object-contain p-1.5"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-serif text-2xl font-semibold text-emerald-800"
          >
            {brandInitials(company.name)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg font-semibold leading-snug text-stone-800 group-hover:text-emerald-800">
          {primary}
        </h3>
        {sinhala && (
          <p lang="si" className="text-sm text-stone-600 leading-snug">
            {sinhala}
          </p>
        )}
        <p className="mt-1 text-sm text-stone-600 tabular-nums">
          {company.productCount === 1
            ? "1 product"
            : `${company.productCount} products`}
        </p>
      </div>

      <ChevronRight
        className="h-5 w-5 flex-shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-700"
        aria-hidden="true"
      />
    </Link>
  );
}
