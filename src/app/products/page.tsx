"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import CarouselGrid from "@/components/carousel-grid";
import p1 from "@/assets/1.webp";
import p2 from "@/assets/2.webp";
import p3 from "@/assets/3.webp";
import p4 from "@/assets/4.webp";
import p5 from "@/assets/5.webp";
import p6 from "@/assets/6.webp";
import p7 from "@/assets/7.webp";
import p8 from "@/assets/8.webp";
import p9 from "@/assets/9.webp";
import { HeroSlide } from "@/components/custom-carousel";

interface ApiProduct {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  badge?: string;
  description: string;
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
  const [sortBy, setSortBy] = useState("name");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/products?limit=100"); // Get all products

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Convert API data to Product format
        const productsData = data.products.map((product: ApiProduct) => ({
          id: product.id,
          name: product.name,
          categoryId: product.category,
          subcategoryId: product.subcategory,
          category: product.category
            ? {
                id: product.category,
                name: product.category,
                isActive: true,
                createdAt: "",
                updatedAt: "",
              }
            : undefined,
          subcategory: product.subcategory
            ? {
                id: product.subcategory,
                name: product.subcategory,
                isActive: true,
                categoryId: product.category || "",
                createdAt: "",
                updatedAt: "",
              }
            : undefined,
          price: parseFloat(product.price.replace(/[^\d.-]/g, "")),
          originalPrice: product.originalPrice
            ? parseFloat(product.originalPrice.replace(/[^\d.-]/g, ""))
            : undefined,
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
          image: product.image || "/placeholder.svg?height=300&width=300",
          badge: product.badge,
          description: product.description,
        }));

        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add loading and error states
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-600">
              Loading products...
            </h3>
          </div>
        </div>
      </div>
    );
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

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]} />
      {/* Enhanced Header Section */}
      <ReusableHeroSection
        preTitle="Authentic Wellness"
        titleLine1="Our Premium"
        titleLine2="Ayurvedic Products"
        subtitle="Discover our comprehensive range of authentic Ayurvedic products, traditional remedies, and wellness solutions"
        description="Carefully crafted with time-honored formulations to support your natural healing journey"
        badges={[
          "Organic Certified",
          "Traditional Methods",
          "Expert Formulated",
        ]}
        theme="green"
      />

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
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
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 bg-transparent"
          >
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="default"
            showQuickAdd={true}
            showDescription={true}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
