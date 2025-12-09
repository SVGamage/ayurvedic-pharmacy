"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Search,
  Building2,
  Package,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product, SubCategory } from "@/types/product";
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
import ProductLoading from "@/components/product-loading";
import { cn } from "@/lib/utils";
import { Company, CompanyProduct } from "@/types/company";

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
  price: string | number;
  originalPrice?: string | number;
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

const productCategories = [
  "All Products",
  "Ayurvedic Products",
  "Disease-Related Products",
  "Traditional Products",
];

// Component for product card with variant selector
function CompanyProductCard({ product }: { product: CompanyProduct }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedPrice = (product.prices || [])[selectedVariantIndex];

  return (
    <div className="bg-white p-2.5 rounded-lg border border-stone-200 hover:border-emerald-300 transition-colors">
      <div className="space-y-1.5">
        <h6 className="font-medium text-stone-900 text-xs leading-tight">
          {product.name}
        </h6>
        <span className="text-[10px] text-stone-500 block">{product.code}</span>
        {(product.prices || []).length > 0 ? (
          <div className="flex items-center gap-2">
            <Select
              value={selectedVariantIndex.toString()}
              onValueChange={(value) =>
                setSelectedVariantIndex(parseInt(value))
              }
            >
              <SelectTrigger className="h-7 text-xs border-stone-200 focus:ring-emerald-500 bg-stone-50 flex-1">
                <SelectValue placeholder="Variant" />
              </SelectTrigger>
              <SelectContent>
                {(product.prices || []).map((price, idx) => (
                  <SelectItem key={idx} value={idx.toString()}>
                    {price.variant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPrice && (
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
                Rs. {selectedPrice.price.toFixed(2)}
              </span>
            )}
          </div>
        ) : (
          <div className="text-[10px] text-red-500">No prices</div>
        )}
      </div>
    </div>
  );
}

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [selectedCompanyValue, setSelectedCompanyValue] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [companyProductSearch, setCompanyProductSearch] = useState("");

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0,
  });

  // Fetch products from API with pagination and filtering
  const fetchProducts = useCallback(
    async (
      page = 1,
      limit = itemsPerPage,
      search = searchTerm,
      category = selectedCategory
    ) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
        });

        const response = await fetch(`/api/admin/products?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Convert API data to Product format
        let productsData = data.products.map((product: ApiProduct) => ({
          id: product.id,
          name: product.name,
          categoryId: product.category?.id,
          subcategoryId: product.subcategory?.id,
          category: product.category,
          subcategory: product.subcategory,
          price:
            typeof product.price === "string"
              ? parseFloat(product.price.replace(/[^\d.-]/g, ""))
              : typeof product.price === "number"
                ? product.price
                : 0,
          originalPrice: product.originalPrice
            ? typeof product.originalPrice === "string"
              ? parseFloat(product.originalPrice.replace(/[^\d.-]/g, ""))
              : typeof product.originalPrice === "number"
                ? product.originalPrice
                : undefined
            : undefined,
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
          image: product.image || "/placeholder.svg?height=300&width=300",
          badge: product.badge,
          description: product.description,
        }));

        // Apply category filtering if not "All Products"
        if (category !== "All Products") {
          productsData = productsData.filter(
            (product: Product) => product.category?.name === category
          );
        }

        setProducts(productsData);
        setPaginationData({
          page: data.pagination.page,
          totalPages: data.pagination.totalPages,
          hasNext: data.pagination.hasNext,
          hasPrev: data.pagination.hasPrev,
          total: data.pagination.total,
        });
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    },
    [itemsPerPage, searchTerm, selectedCategory]
  );

  const fetchCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/company");
      if (response.ok) {
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData = data.map((company: any) => ({
          ...company,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          companyProducts: company.companyProducts.map((product: any) => ({
            ...product,
            prices: product.companyProductPrices || [],
          })),
        }));
        setCompanies(transformedData);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  useEffect(() => {
    fetchCompanies();
    fetchSubcategories();
  }, [fetchCompanies, fetchSubcategories]);

  // Fetch products from API
  useEffect(() => {
    fetchProducts(1, itemsPerPage, searchTerm, selectedCategory);
  }, [fetchProducts, itemsPerPage, searchTerm, selectedCategory]);

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchProducts(page, itemsPerPage, searchTerm, selectedCategory);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    fetchProducts(1, newItemsPerPage, searchTerm, selectedCategory);
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("all"); // Reset subcategory when category changes
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find((s) => s.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setSelectedCompanyValue(companyId);
      setIsCompanyDialogOpen(true);
    }
  };

  const handleCompanyDialogClose = (open: boolean) => {
    setIsCompanyDialogOpen(open);
    if (!open) {
      setSelectedCompany(null);
      setSelectedCompanyValue("");
      setExpandedCategories(new Set());
      setCompanyProductSearch("");
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Add loading and error states
  if (isLoading) {
    return <ProductLoading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Error Loading Products
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

  // Apply subcategory filtering to the products from API
  const filteredProducts = products.filter((product) => {
    if (selectedSubcategory === "all") {
      return true;
    }
    return product.subcategory?.id === selectedSubcategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 md:pt-40">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]} />
      {/* Enhanced Header Section */}
      <ReusableHeroSection
        preTitle="Authentic Wellness"
        titleLine1="Let's Shop"
        titleLine2="Premium Ayurvedic Products"
        subtitle="Bringing together Sri Lanka’s trusted Ayurvedic brands for your wellness journey"
        description="Carefully crafted with time-honored formulations to support your natural healing journey"
        badges={[
          "Organic Certified",
          "Traditional Methods",
          "Expert Formulated",
        ]}
        theme="green"
      />

      {/* Filters */}

      <div
        className={cn(
          "bg-white p-6 rounded-xl mb-10 border border-stone-200 shadow-sm"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
            />
          </div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="border-stone-200 focus:ring-emerald-500 bg-stone-50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedCompanyValue}
            onValueChange={handleCompanySelect}
          >
            <SelectTrigger className="border-stone-200 focus:ring-emerald-500 bg-stone-50">
              <SelectValue placeholder="Shop By Brand" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-emerald-600" />
                    <span>{company.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedSubcategory}
            onValueChange={handleSubcategoryChange}
          >
            <SelectTrigger className="border-stone-200 focus:ring-emerald-500 bg-stone-50">
              <SelectValue placeholder="Filter by Subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Product Categories</SelectItem>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                  {subcategory.category && (
                    <span className="text-xs text-stone-500 ml-2">
                      ({subcategory.category.name})
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="default"
            showQuickAdd={true}
            showDescription={true}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
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

      {/* Company Dialog */}
      <Dialog
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
              {/* Company Information */}
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
                              .map((p) => p.subCategory!.name)
                          ).size
                        }{" "}
                        subcategories
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products by Category */}
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

                {/* Group products by subcategory */}
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
                      >
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
                            .includes(companyProductSearch.toLowerCase())
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
                              <div className="ml-4 p-4 bg-stone-50 rounded-lg border-l-4 border-emerald-300 max-h-[400px] overflow-y-auto">
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
                              <div className="ml-4 p-4 bg-stone-50 rounded-lg border-l-4 border-stone-300">
                                <p className="text-sm text-stone-500 text-center">
                                  No products found matching &quot;
                                  {companyProductSearch}&quot;
                                </p>
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }
                  );
                })()}

                {/* Show message if no products */}
                {selectedCompany.companyProducts.length === 0 && (
                  <div className="text-center py-8 text-stone-500">
                    <Package className="h-12 w-12 mx-auto mb-3 text-stone-400" />
                    <p>No products available for this company.</p>
                  </div>
                )}
              </div>

              {/* Company Stats */}
              <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
                <h4 className="text-lg font-serif font-semibold text-stone-900 mb-4">
                  Company Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                            .map((p) => p.subCategory!.name)
                        ).size
                      }
                    </div>
                    <div className="text-sm text-stone-600">Subcategories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {
                        selectedCompany.companyProducts.filter(
                          (p) => (p.prices || []).length > 0
                        ).length
                      }
                    </div>
                    <div className="text-sm text-stone-600">
                      Priced Products
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      Rs.{" "}
                      {selectedCompany.companyProducts.length > 0
                        ? (() => {
                            const totalPriceSum =
                              selectedCompany.companyProducts.reduce(
                                (sum, p) => {
                                  const prices = p.prices || [];
                                  const avgPrice =
                                    prices.length > 0
                                      ? prices.reduce(
                                          (pSum, price) => pSum + price.price,
                                          0
                                        ) / prices.length
                                      : 0;
                                  return sum + avgPrice;
                                },
                                0
                              );
                            return Math.round(
                              totalPriceSum /
                                selectedCompany.companyProducts.length
                            );
                          })()
                        : 0}
                    </div>
                    <div className="text-sm text-stone-600">Avg. Price</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
