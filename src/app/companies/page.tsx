"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2 } from "lucide-react";
import { Company } from "@/types/company";
import { CompanyCard } from "@/components/company-card";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import { AdminPagination } from "@/components/admin/admin-pagination";
import CompanyLoading, { CompanyGridSkeleton } from "@/components/company-loading";
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
    image: p2, // Using same image for now - replace with different hero images
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
    image: p4, // Using same image for now - replace with different hero images
    gradient: "",
  },
  {
    id: 3,
    image: p5, // Using same image for now - replace with different hero images
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
    image: p7, // Using same image for now - replace with different hero images
    gradient: "",
  },
  {
    id: 3,
    image: p8, // Using same image for now - replace with different hero images
    gradient: "",
  },
  {
    id: 4,
    image: p9, // Using same image for now - replace with different hero images
    gradient: "",
  },
];
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0,
  });
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounce search input
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 400);
  };

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const fetchCompanies = useCallback(
    async (page = 1, limit = itemsPerPage, search = debouncedSearch) => {
      try {
        setIsSearching(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
        });

        const response = await fetch(`/api/companies?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const data = await response.json();

        // Transform API response to match Company type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData = data.companies.map((company: any) => ({
          ...company,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          companyProducts: company.companyProducts.map((product: any) => ({
            ...product,
            prices: product.companyProductPrices || [],
          })),
        }));

        setCompanies(transformedData);
        setPaginationData({
          page: data.pagination.page,
          totalPages: data.pagination.totalPages,
          hasNext: data.pagination.hasNext,
          hasPrev: data.pagination.hasPrev,
          total: data.pagination.total,
        });
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies");
      } finally {
        setIsSearching(false);
        setIsInitialLoading(false);
      }
    },
    [itemsPerPage, debouncedSearch],
  );

  useEffect(() => {
    fetchCompanies(1, itemsPerPage, debouncedSearch);
  }, [fetchCompanies, itemsPerPage, debouncedSearch]);

  const handlePageChange = (page: number) => {
    fetchCompanies(page, itemsPerPage, debouncedSearch);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    fetchCompanies(1, newItemsPerPage, debouncedSearch);
  };

  if (isInitialLoading) {
    return <CompanyLoading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">
              <Building2 className="h-12 w-12 mx-auto text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Error Loading Companies
            </h3>
            <p className="text-gray-500">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 md:pt-40 overflow-x-clip">
      <CarouselGrid heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]} />
      {/* Hero Section */}
      <ReusableHeroSection
        preTitle="Trusted Brands"
        titleLine1="Our Partner"
        titleLine2="Ayurvedic Companies"
        subtitle="Explore Sri Lanka's leading Ayurvedic manufacturers and their product collections"
        description="Bringing together the finest traditional brands for your wellness needs"
        badges={[
          "Certified Brands",
          "Quality Products",
          "Traditional Heritage",
        ]}
        theme="green"
      />

      {/* Search Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl mb-6 sm:mb-10 border border-stone-200 shadow-sm overflow-hidden">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
          />
        </div>
      </div>

      {/* Companies Grid */}
      {isSearching ? (
        <CompanyGridSkeleton count={itemsPerPage > 6 ? 6 : itemsPerPage} />
      ) : companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 mx-auto mb-4 text-stone-300" />
          <p className="text-gray-500 text-lg">
            No companies found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {companies.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm mt-8">
          <AdminPagination
            currentPage={paginationData.page}
            totalPages={paginationData.totalPages}
            totalItems={paginationData.total}
            itemsPerPage={itemsPerPage}
            hasNext={paginationData.hasNext}
            hasPrev={paginationData.hasPrev}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            pageSizeOptions={[6, 12, 24, 48]}
          />
        </div>
      )}
    </div>
  );
}
