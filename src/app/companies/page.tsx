"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, MessageCircle, Package, Search, X } from "lucide-react";
import type { BrandSummary } from "@/types/company";
import { askForProductViaWhatsApp, contactViaWhatsApp } from "@/lib/whatsapp";
import { CompanyCard } from "@/components/company-card";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { CompanyGridSkeleton } from "@/components/company-loading";
import p1 from "@/assets/products/1.webp";
import p2 from "@/assets/products/2.webp";
import p3 from "@/assets/products/3.webp";
import p4 from "@/assets/products/4.webp";
import p5 from "@/assets/products/5.webp";
import p6 from "@/assets/products/6.webp";
import p7 from "@/assets/products/7.webp";
import p8 from "@/assets/products/8.webp";
import p9 from "@/assets/products/9.webp";
import { HeroSlide } from "@/components/custom-carousel";
import CarouselGrid from "@/components/carousel-grid";

interface PaginationData {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

const heroSlides1: HeroSlide[] = [
  {
    id: 1,
    image: p1,
    gradient: "",
  },
  {
    id: 2,
    image: p2,
    gradient: "",
  },
];

const heroSlides2: HeroSlide[] = [
  {
    id: 1,
    image: p3,
    gradient: "",
  },
  {
    id: 2,
    image: p4,
    gradient: "",
  },
  {
    id: 3,
    image: p5,
    gradient: "",
  },
];

const heroSlides3: HeroSlide[] = [
  {
    id: 1,
    image: p6,
    gradient: "",
  },
  {
    id: 2,
    image: p7,
    gradient: "",
  },
  {
    id: 3,
    image: p8,
    gradient: "",
  },
  {
    id: 4,
    image: p9,
    gradient: "",
  },
];
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<BrandSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urlReady, setUrlReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0,
  });
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Restore search and page from the URL, then keep the URL in step.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") ?? "";
    setSearchTerm(q);
    setDebouncedSearch(q);
    setCurrentPage(Math.max(1, Number(params.get("page")) || 1));
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (currentPage > 1) params.set("page", String(currentPage));
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}`,
    );
  }, [urlReady, debouncedSearch, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value.trim());
      setCurrentPage(1);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const fetchCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
      });

      const response = await fetch(`/api/companies?${params}`);
      if (!response.ok) {
        throw new Error(`Brands request failed (${response.status})`);
      }
      const data = await response.json();

      setCompanies(data.companies);
      setPaginationData({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
        hasNext: data.pagination.hasNext,
        hasPrev: data.pagination.hasPrev,
        total: data.pagination.total,
      });
    } catch (err) {
      console.error("Error fetching brands:", err);
      setError(
        "We couldn't load the brands. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch]);

  useEffect(() => {
    if (urlReady) fetchCompanies();
  }, [urlReady, fetchCompanies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    resultsRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearchTerm("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  const statusText = isLoading
    ? "Loading brands…"
    : error
      ? ""
      : paginationData.total === 1
        ? "1 brand"
        : `${paginationData.total} brands`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pt-36 overflow-x-clip">
      <CarouselGrid
        heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]}
        compact
      />
      <ReusableHeroSection
        preTitle="Trusted Brands"
        titleLine1="Available"
        titleLine2="Ayurvedic Companies"
        subtitle={[
          "Sri Lanka’s leading Ayurvedic manufacturers and their products, now available from us.",
          "ශ්‍රී ලංකාවේ ප්‍රමුඛ පෙළේ ආයුර්වේද නිෂ්පාදකයින් සහ ඔවුන්ගේ නිෂ්පාදන දැන් අප වෙතින්.",
        ]}
        theme="green"
        compact
      />

      {/* Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl mb-6 border border-stone-200 shadow-sm">
        <div className="relative max-w-xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500"
            aria-hidden="true"
          />
          <Input
            type="search"
            aria-label="Search brands or their products"
            placeholder="Search brands or products, e.g. Siddhalepa"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-11 pl-10 pr-10 border-stone-200 bg-stone-50"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div ref={resultsRef} className="scroll-mt-28">
        <h2 className="sr-only">Brands</h2>
        <div className="mb-4 flex min-h-6 items-center justify-between gap-3">
          <p className="text-sm text-stone-600" role="status" aria-live="polite">
            {statusText}
          </p>
          {debouncedSearch && !isLoading && (
            <button
              type="button"
              onClick={clearSearch}
              className="inline-flex min-h-10 items-center text-sm font-medium text-emerald-800 underline-offset-4 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/60 px-6 py-10 text-center">
            <AlertCircle
              className="h-8 w-8 mx-auto mb-3 text-red-600"
              aria-hidden="true"
            />
            <h3 className="text-lg font-serif font-semibold text-stone-800 mb-1">
              Brands didn&apos;t load
            </h3>
            <p className="text-stone-700 mb-4">{error}</p>
            <Button
              onClick={fetchCompanies}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6"
            >
              Try again
            </Button>
          </div>
        ) : isLoading ? (
          <CompanyGridSkeleton count={Math.min(itemsPerPage, 12)} />
        ) : companies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
            <Package
              className="h-12 w-12 mx-auto mb-4 text-stone-300"
              aria-hidden="true"
            />
            <h3 className="text-lg font-serif font-semibold text-stone-800 mb-1">
              {debouncedSearch
                ? `No brand or product matches “${debouncedSearch}”`
                : "No brands listed yet"}
            </h3>
            <p className="text-stone-600 mb-6 max-w-md mx-auto">
              We may still stock it. Ask us and we&apos;ll check for you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() =>
                  debouncedSearch
                    ? askForProductViaWhatsApp(debouncedSearch)
                    : contactViaWhatsApp()
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask us on WhatsApp
              </Button>
              {debouncedSearch && (
                <Button
                  variant="outline"
                  onClick={clearSearch}
                  className="rounded-full px-6 border-stone-300"
                >
                  Clear search
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!error && !isLoading && companies.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm mt-8">
          <AdminPagination
            currentPage={paginationData.page}
            totalPages={paginationData.totalPages}
            totalItems={paginationData.total}
            itemsPerPage={itemsPerPage}
            hasNext={paginationData.hasNext}
            hasPrev={paginationData.hasPrev}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            pageSizeOptions={[12, 24, 48]}
            itemLabel="brands"
          />
        </div>
      )}
    </div>
  );
}
