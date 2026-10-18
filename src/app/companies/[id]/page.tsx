"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  MessageCircle,
  Package,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandProductRow } from "@/components/brand-product-row";
import { BrandProductListSkeleton } from "@/components/company-loading";
import { WhatsAppHandoffNote } from "@/components/whatsapp-handoff-note";
import type { BrandDetail } from "@/types/company";
import { brandInitials, splitBilingualName } from "@/lib/brand";
import { hasVisibleRichTextContent, sanitizeRichText } from "@/lib/rich-text";
import { contactCompanyViaWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 30;
const ALL_TYPES = "all";

export default function BrandPage() {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<BrandDetail | null>(null);
  const [status, setStatus] = useState<
    "loading" | "ready" | "notFound" | "error"
  >("loading");
  const [query, setQuery] = useState("");
  const [type, setType] = useState(ALL_TYPES);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`/api/companies/${id}`);
      if (res.status === 404) {
        setStatus("notFound");
        return;
      }
      if (!res.ok) throw new Error(`Brand request failed (${res.status})`);
      setBrand(await res.json());
      setStatus("ready");
    } catch (err) {
      console.error("Error loading brand:", err);
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // Restore an in-brand search from the URL, and keep it there.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setType(params.get("type") ?? ALL_TYPES);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (type !== ALL_TYPES) params.set("type", type);
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}`,
    );
    setVisibleCount(PAGE_SIZE);
  }, [query, type]);

  const names = useMemo(
    () => splitBilingualName(brand?.name ?? ""),
    [brand?.name],
  );
  const descriptionHtml = useMemo(
    () => sanitizeRichText(brand?.description ?? ""),
    [brand?.description],
  );

  const types = useMemo(() => {
    const seen = new Map<string, string>();
    brand?.products.forEach((p) => {
      if (p.subCategory) seen.set(p.subCategory.id, p.subCategory.name);
    });
    return [...seen.entries()]
      .map(([typeId, name]) => ({ id: typeId, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [brand]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (brand?.products ?? []).filter(
      (p) =>
        (type === ALL_TYPES || p.subCategory?.id === type) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q)),
    );
  }, [brand, query, type]);

  const hasFilters = Boolean(query.trim()) || type !== ALL_TYPES;
  const clearFilters = () => {
    setQuery("");
    setType(ALL_TYPES);
  };

  const chipClass = (active: boolean) =>
    cn(
      "inline-flex min-h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1",
      active
        ? "bg-emerald-700 border-emerald-700 text-white"
        : "bg-white border-stone-200 text-stone-700 hover:border-emerald-400 hover:bg-stone-50",
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-36">
      <Link
        href="/companies"
        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All brands
      </Link>

      {status === "loading" && (
        <div className="mt-4 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-stone-200 animate-pulse" />
            <div className="h-8 w-64 rounded-md bg-stone-200 animate-pulse" />
          </div>
          <BrandProductListSkeleton />
        </div>
      )}

      {(status === "notFound" || status === "error") && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
          <AlertCircle
            className="mx-auto mb-3 h-8 w-8 text-stone-400"
            aria-hidden="true"
          />
          <h1 className="mb-1 font-serif text-2xl font-semibold text-stone-800">
            {status === "notFound"
              ? "We couldn't find that brand"
              : "This brand didn't load"}
          </h1>
          <p className="mb-6 text-stone-600">
            {status === "notFound"
              ? "It may have been renamed or removed."
              : "Check your connection and try again."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {status === "error" && (
              <Button
                onClick={load}
                className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
              >
                Try again
              </Button>
            )}
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/companies">See all brands</Link>
            </Button>
          </div>
        </div>
      )}

      {status === "ready" && brand && (
        <>
          {/* Brand header */}
          <header className="mt-4 mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50">
                {brand.image ? (
                  <Image
                    src={brand.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl font-semibold text-emerald-800"
                  >
                    {brandInitials(brand.name)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h1 className="font-serif text-3xl font-bold leading-tight text-stone-800 sm:text-4xl">
                  {names.primary}
                </h1>
                {names.sinhala && (
                  <p lang="si" className="mt-1 text-lg text-stone-600">
                    {names.sinhala}
                  </p>
                )}
                <p className="mt-2 text-sm text-stone-600">
                  {brand.products.length} products stocked at Rathnadeepa,
                  Tissamaharama
                </p>
              </div>
            </div>

            <div className="md:w-80 md:flex-shrink-0 space-y-3">
              <WhatsAppHandoffNote kind="order" />
              <Button
                variant="outline"
                onClick={() => contactCompanyViaWhatsApp(names.primary)}
                className="w-full min-h-11 rounded-xl border-2 border-emerald-600 font-semibold text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                Ask about {names.primary}
              </Button>
            </div>
          </header>

          {hasVisibleRichTextContent(descriptionHtml) && (
            <div
              className="mb-8 max-w-prose text-stone-600 leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}

          {/* Search within the brand */}
          <div className="mb-4 space-y-3">
            <div className="relative max-w-xl">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
                aria-hidden="true"
              />
              <Input
                type="search"
                aria-label={`Search ${names.primary} products`}
                placeholder={`Search ${names.primary} products`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 border-stone-200 bg-white pl-10 pr-10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {types.length > 1 && (
              <div
                role="radiogroup"
                aria-label="Product type"
                className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide"
              >
                {[{ id: ALL_TYPES, name: "All" }, ...types].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={type === t.id}
                    onClick={() => setType(t.id)}
                    className={chipClass(type === t.id)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3 flex min-h-6 items-center justify-between gap-3">
            <h2 className="sr-only">Products</h2>
            <p className="text-sm text-stone-600" role="status" aria-live="polite">
              {filtered.length === 1 ? "1 product" : `${filtered.length} products`}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-10 items-center text-sm font-medium text-emerald-800 underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <>
              <ul className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-white">
                {filtered.slice(0, visibleCount).map((product) => (
                  <BrandProductRow
                    key={product.id}
                    product={product}
                    brandName={names.primary}
                    brandImage={brand.image}
                  />
                ))}
              </ul>
              {visibleCount < filtered.length && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="rounded-full border-stone-300 px-6"
                  >
                    Show more ({filtered.length - visibleCount} left)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
              <Package
                className="mx-auto mb-4 h-12 w-12 text-stone-300"
                aria-hidden="true"
              />
              <h3 className="mb-1 font-serif text-lg font-semibold text-stone-800">
                {query.trim()
                  ? `No ${names.primary} product matches “${query.trim()}”`
                  : "Nothing listed here yet"}
              </h3>
              <p className="mx-auto mb-6 max-w-md text-stone-600">
                Not everything we stock is listed online. Ask us and we&apos;ll
                check for you.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => contactCompanyViaWhatsApp(names.primary)}
                  className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask us on WhatsApp
                </Button>
                {hasFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="rounded-full border-stone-300 px-6"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
