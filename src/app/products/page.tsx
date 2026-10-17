"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Search,
//   Building2,
//   Package,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Category, Product, SubCategory } from "@/types/product";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import CarouselGrid from "@/components/carousel-grid";
import { AdminPagination } from "@/components/admin/admin-pagination";
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
import { ProductGridSkeleton } from "@/components/product-loading";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  MessageCircle,
  Package,
  Search,
  X,
} from "lucide-react";
import { askForProductViaWhatsApp, contactViaWhatsApp } from "@/lib/whatsapp";
// import { Company, CompanyProduct } from "@/types/company";

interface ApiProduct {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  subcategory?: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    isActive: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category?: {
      id: string;
      name: string;
      description?: string;
      image?: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
  productPrices?: Array<{
    id?: string;
    variant: string;
    price: number;
  }>;
  rating?: number;
  reviews?: number;
  image?: string;
  badge?: string;
  description: string;
}

interface PaginationData {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

type SubCategoryWithCount = SubCategory & {
  _count?: { products: number };
};

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

// Component for product card with variant selector
// function CompanyProductCard({ product }: { product: CompanyProduct }) {
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const selectedPrice = (product.prices || [])[selectedVariantIndex];

//   return (
//     <div className="bg-white p-2.5 rounded-lg border border-stone-200 hover:border-emerald-300 transition-colors">
//       <div className="space-y-1.5">
//         <h6 className="font-medium text-stone-900 text-xs leading-tight">
//           {product.name}
//         </h6>
//         <span className="text-[10px] text-stone-500 block">{product.code}</span>
//         {(product.prices || []).length > 0 ? (
//           <div className="flex items-center gap-2">
//             <Select
//               value={selectedVariantIndex.toString()}
//               onValueChange={(value) =>
//                 setSelectedVariantIndex(parseInt(value))
//               }
//             >
//               <SelectTrigger className="h-7 text-xs border-stone-200 focus:ring-emerald-500 bg-stone-50 flex-1">
//                 <SelectValue placeholder="Variant" />
//               </SelectTrigger>
//               <SelectContent>
//                 {(product.prices || []).map((price, idx) => (
//                   <SelectItem key={idx} value={idx.toString()}>
//                     {price.variant}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {selectedPrice && (
//               <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
//                 Rs. {selectedPrice.price.toFixed(2)}
//               </span>
//             )}
//           </div>
//         ) : (
//           <div className="text-[10px] text-red-500">No prices</div>
//         )}
//       </div>
//     </div>
//   );
// }

// const ayurvedicSubcategories = [
//   "Cosmetics",
//   "Oils",
//   "Balms",
//   "Arishta & Asava",
//   "Kwatha & Kashaya",
//   "Powders",
//   "Capsules & Tablets",
// ]

// const diseaseSubcategories = [
//   "Joint & Muscle Pain",
//   "Digestive Disorders",
//   "Respiratory Health",
//   "Skin Conditions",
//   "Women's Health",
//   "Stress & Sleep",
//   "Diabetes Support",
//   "Immunity Boosters",
//   "Hair & Scalp Problems",
// ]

// const traditionalSubcategories = ["Puja Items", "Pottery Items", "Thovil Badu", "Gift Packs/Herbal Kits"]

// URL keys for shareable, refresh-safe state.
const PARAM = {
  search: "q",
  category: "category",
  type: "type",
  page: "page",
  product: "product",
} as const;
const ALL_CATEGORIES = "All Products";
const ALL_TYPES = "all";

type CategoryWithCount = Category & { _count?: { products: number } };

const toProduct = (product: ApiProduct): Product => ({
  id: product.id,
  name: product.name,
  categoryId: product.category?.id,
  subcategoryId: product.subcategory?.id,
  category: product.category,
  subcategory: product.subcategory,
  productPrices: product.productPrices || [],
  rating: product.rating || 0,
  reviews: product.reviews || 0,
  image: product.image || "/placeholder.svg?height=300&width=300",
  badge: product.badge,
  description: product.description,
});

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urlReady, setUrlReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategoryWithCount[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(ALL_TYPES);
  const [currentPage, setCurrentPage] = useState(1);
  const [linkedProductId, setLinkedProductId] = useState<string | null>(null);
  const [linkedProduct, setLinkedProduct] = useState<Product | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0,
  });

  // Restore search, filters, page and an opened product from the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get(PARAM.search) ?? "";
    setSearchTerm(q);
    setDebouncedSearch(q);
    setSelectedCategory(params.get(PARAM.category) || ALL_CATEGORIES);
    setSelectedSubcategory(params.get(PARAM.type) || ALL_TYPES);
    setCurrentPage(Math.max(1, Number(params.get(PARAM.page)) || 1));
    setLinkedProductId(params.get(PARAM.product));
    setUrlReady(true);
  }, []);

  // Keep the URL in step so refresh, back and share land on the same view.
  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    if (debouncedSearch) params.set(PARAM.search, debouncedSearch);
    if (selectedCategory !== ALL_CATEGORIES)
      params.set(PARAM.category, selectedCategory);
    if (selectedSubcategory !== ALL_TYPES)
      params.set(PARAM.type, selectedSubcategory);
    if (currentPage > 1) params.set(PARAM.page, String(currentPage));
    if (linkedProductId) params.set(PARAM.product, linkedProductId);
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  }, [
    urlReady,
    debouncedSearch,
    selectedCategory,
    selectedSubcategory,
    currentPage,
    linkedProductId,
  ]);

  // Debounce search input
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

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Fetch products from API with pagination and filtering
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(selectedCategory !== ALL_CATEGORIES && {
          category: selectedCategory,
        }),
        ...(selectedSubcategory !== ALL_TYPES && {
          subcategoryId: selectedSubcategory,
        }),
      });

      const response = await fetch(`/api/admin/products?${params}`);

      if (!response.ok) {
        throw new Error(`Products request failed (${response.status})`);
      }

      const data = await response.json();

      setProducts(data.products.map(toProduct));
      setPaginationData({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
        hasNext: data.pagination.hasNext,
        hasPrev: data.pagination.hasPrev,
        total: data.pagination.total,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        "We couldn't load the products. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearch,
    selectedCategory,
    selectedSubcategory,
  ]);

  const fetchSubcategories = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/subcategories");
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data.subcategories || data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, [fetchCategories, fetchSubcategories]);

  useEffect(() => {
    if (urlReady) fetchProducts();
  }, [urlReady, fetchProducts]);

  // A shared link to a product that isn't on this page of results: load it on its own.
  useEffect(() => {
    if (!linkedProductId || isLoading) return;
    if (products.some((p) => p.id === linkedProductId)) return;
    let cancelled = false;
    fetch(`/api/admin/products/${linkedProductId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ApiProduct | null) => {
        if (cancelled) return;
        if (data) setLinkedProduct(toProduct(data));
        else setLinkedProductId(null);
      })
      .catch(() => {
        if (!cancelled) setLinkedProductId(null);
      });
    return () => {
      cancelled = true;
    };
  }, [linkedProductId, isLoading, products]);

  const closeLinkedProduct = () => {
    setLinkedProductId(null);
    setLinkedProduct(null);
  };

  const scrollToResults = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    resultsRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToResults();
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(ALL_TYPES);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearchTerm("");
    setDebouncedSearch("");
    setSelectedCategory(ALL_CATEGORIES);
    setSelectedSubcategory(ALL_TYPES);
    setCurrentPage(1);
  };

  const hasFilters =
    Boolean(debouncedSearch) ||
    selectedCategory !== ALL_CATEGORIES ||
    selectedSubcategory !== ALL_TYPES;

  // Only offer categories and types that actually have products.
  const visibleCategories = categories.filter(
    (category) => (category._count?.products ?? 1) > 0,
  );
  const visibleSubcategories = subcategories.filter((subcategory) => {
    const hasProducts = (subcategory._count?.products ?? 0) > 0;
    const inSelectedCategory =
      selectedCategory === ALL_CATEGORIES ||
      subcategory.category?.name === selectedCategory;
    return hasProducts && inSelectedCategory;
  });

  const statusText = isLoading
    ? "Loading products…"
    : error
      ? ""
      : paginationData.total === 1
        ? "1 product"
        : `${paginationData.total} products`;

  const chipClass = (active: boolean) =>
    cn(
      "inline-flex min-h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1",
      active
        ? "bg-emerald-700 border-emerald-700 text-white"
        : "bg-white border-stone-200 text-stone-700 hover:border-emerald-400 hover:bg-stone-50",
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pt-36 overflow-x-clip">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid
        heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]}
        compact
      />
      <ReusableHeroSection
        preTitle="Authentic Wellness"
        titleLine1="Let's Shop"
        titleLine2="Premium Ayurvedic Products"
        subtitle={[
          "Bringing together Sri Lanka’s trusted Ayurvedic brands for your wellness journey",
          "ඔබේ නිරෝගීමත් ජීවන ගමන වෙනුවෙන් ශ්‍රී ලංකාවේ විශ්වාසනීය ආයුර්වේද සන්නාමයන් දැන් එකම තැනකට එක්කරමින් ඔබ වෙතට.",
        ]}
        theme="green"
        compact
      />

      {/* Search and filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl mb-6 border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_16rem] gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500"
              aria-hidden="true"
            />
            <Input
              type="search"
              aria-label="Search products"
              placeholder="Search remedies, e.g. Pinda Thailaya"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-11 pl-10 pr-10 border-stone-200 bg-stone-50"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Select
            value={selectedSubcategory}
            onValueChange={handleSubcategoryChange}
          >
            <SelectTrigger
              aria-label="Product type"
              className="h-11 border-stone-200 bg-stone-50"
            >
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_TYPES}>All types</SelectItem>
              {visibleSubcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                  {selectedCategory === ALL_CATEGORIES &&
                    subcategory.category && (
                      <span className="text-xs text-stone-500 ml-2">
                        ({subcategory.category.name})
                      </span>
                    )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Shelves: categories as chips */}
        {visibleCategories.length > 0 && (
          <div
            role="radiogroup"
            aria-label="Category"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide"
          >
            {[{ id: "all", name: ALL_CATEGORIES }, ...visibleCategories].map(
              (category) => {
                const active = selectedCategory === category.name;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => handleCategoryChange(category.name)}
                    className={chipClass(active)}
                  >
                    {category.name === ALL_CATEGORIES ? "All" : category.name}
                  </button>
                );
              },
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div ref={resultsRef} className="scroll-mt-28">
        <h2 className="sr-only">Products</h2>
        <div className="mb-4 flex min-h-6 items-center justify-between gap-3">
          <p className="text-sm text-stone-600" role="status" aria-live="polite">
            {statusText}
          </p>
          {hasFilters && !isLoading && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-10 items-center text-sm font-medium text-emerald-800 underline-offset-4 hover:underline"
            >
              Clear filters
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
              Products didn&apos;t load
            </h3>
            <p className="text-stone-700 mb-4">{error}</p>
            <Button
              onClick={fetchProducts}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6"
            >
              Try again
            </Button>
          </div>
        ) : isLoading ? (
          <ProductGridSkeleton count={Math.min(itemsPerPage, 12)} />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
                showQuickAdd={true}
                showDescription={true}
                defaultOpen={product.id === linkedProductId}
                onDialogClose={
                  product.id === linkedProductId
                    ? closeLinkedProduct
                    : undefined
                }
              />
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
                ? `Nothing found for “${debouncedSearch}”`
                : "No products here yet"}
            </h3>
            <p className="text-stone-600 mb-6 max-w-md mx-auto">
              Not everything we stock is listed online. Ask us and we&apos;ll
              check for you.
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
              {hasFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full px-6 border-stone-300"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!error && !isLoading && products.length > 0 && (
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
            pageSizeOptions={[6, 12, 24, 48]}
            itemLabel="products"
          />
        </div>
      )}

      {/* Product opened from a shared link but not on this page */}
      {linkedProduct && (
        <ProductCard
          key={`linked-${linkedProduct.id}`}
          product={linkedProduct}
          defaultOpen
          dialogOnly
          onDialogClose={closeLinkedProduct}
        />
      )}

      {/* Company Dialog */}
      {/* <Dialog
        open={isCompanyDialogOpen}
        onOpenChange={handleCompanyDialogClose}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-stone-50">
          <DialogHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Building2 className="h-6 w-6 text-emerald-600" />
              </div>
              <DialogTitle className="text-2xl font-serif font-bold text-stone-800">
                {selectedCompany?.name}
              </DialogTitle>
            </div>
          </DialogHeader>

          {selectedCompany && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-stone-700">
                        <strong>Total Products:</strong>{" "}
                        {selectedCompany.companyProducts.length} items
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-stone-700">
                        <strong>Subcategories:</strong>{" "}
                        {
                          new Set(
                            selectedCompany.companyProducts
                              .filter((p) => p.subCategory)
                              .map((p) => p.subCategory!.name),
                          ).size
                        }{" "}
                        subcategories
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-serif font-semibold text-stone-900">
                    Products by Subcategory
                  </h4>
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                    <Input
                      placeholder="Search products..."
                      value={companyProductSearch}
                      onChange={(e) => setCompanyProductSearch(e.target.value)}
                      className="pl-8 h-8 text-xs border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                {(() => {
                  // Create map of all subcategories with all products
                  const allProductsBySubCategory =
                    selectedCompany.companyProducts.reduce(
                      (acc, product) => {
                        if (product.subCategory) {
                          const subCategoryName = product.subCategory.name;
                          if (!acc[subCategoryName]) {
                            acc[subCategoryName] = {
                              subCategory: product.subCategory,
                              products: [],
                            };
                          }
                          acc[subCategoryName].products.push(product);
                        } else {
                          // Handle products without subcategory
                          const uncategorizedKey = "Uncategorized";
                          if (!acc[uncategorizedKey]) {
                            acc[uncategorizedKey] = {
                              subCategory: {
                                id: "uncategorized",
                                name: "Uncategorized",
                              },
                              products: [],
                            };
                          }
                          acc[uncategorizedKey].products.push(product);
                        }
                        return acc;
                      },
                      {} as Record<
                        string,
                        {
                          subCategory: { id: string; name: string };
                          products: CompanyProduct[];
                        }
                      >,
                    );

                  return Object.entries(allProductsBySubCategory).map(
                    ([subCategoryName, { subCategory, products }]) => {
                      // Filter products for this subcategory based on search
                      const filteredProducts = products.filter(
                        (product) =>
                          product.name
                            .toLowerCase()
                            .includes(companyProductSearch.toLowerCase()) ||
                          product.code
                            .toLowerCase()
                            .includes(companyProductSearch.toLowerCase()),
                      );

                      return (
                        <Collapsible
                          key={subCategory.id}
                          open={expandedCategories.has(subCategory.id)}
                          onOpenChange={() => toggleCategory(subCategory.id)}
                          className="w-full"
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-emerald-100 rounded-full">
                                <Package className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div className="text-left">
                                <h5 className="font-semibold text-stone-900">
                                  {subCategoryName}
                                </h5>
                                <p className="text-sm text-stone-600">
                                  {filteredProducts.length} of {products.length}{" "}
                                  products
                                  {companyProductSearch && " found"}
                                </p>
                              </div>
                            </div>
                            {expandedCategories.has(subCategory.id) ? (
                              <ChevronDown className="h-5 w-5 text-emerald-600" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-emerald-600" />
                            )}
                          </CollapsibleTrigger>

                          <CollapsibleContent className="space-y-2">
                            {filteredProducts.length > 0 ? (
                              <div className="ml-4 p-4 bg-stone-50 rounded-lg border border-emerald-200 max-h-[400px] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {filteredProducts.map((product) => (
                                    <CompanyProductCard
                                      key={product.id}
                                      product={product}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="ml-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                                <p className="text-sm text-stone-500 text-center">
                                  No products found matching &quot;
                                  {companyProductSearch}&quot;
                                </p>
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    },
                  );
                })()}

                {selectedCompany.companyProducts.length === 0 && (
                  <div className="text-center py-8 text-stone-500">
                    <Package className="h-12 w-12 mx-auto mb-3 text-stone-400" />
                    <p>No products available for this company.</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
                <h4 className="text-lg font-serif font-semibold text-stone-900 mb-4">
                  Company Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {selectedCompany.companyProducts.length}
                    </div>
                    <div className="text-sm text-stone-600">Total Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {
                        new Set(
                          selectedCompany.companyProducts
                            .filter((p) => p.subCategory)
                            .map((p) => p.subCategory!.name),
                        ).size
                      }
                    </div>
                    <div className="text-sm text-stone-600">Subcategories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {
                        selectedCompany.companyProducts.filter(
                          (p) => (p.prices || []).length > 0,
                        ).length
                      }
                    </div>
                    <div className="text-sm text-stone-600">
                      Priced Products
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
