"use client";

import { useState } from "react";
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

const products: Product[] = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    category: "Disease-Related Products",
    subcategory: "Stress & Sleep",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    description:
      "Premium quality Ashwagandha for stress relief and better sleep",
  },
  {
    id: 2,
    name: "Neem Face Oil",
    category: "Ayurvedic Products",
    subcategory: "Oils",
    price: 16.99,
    originalPrice: 19.99,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Organic",
    description: "Pure neem oil for healthy, glowing skin",
  },
  {
    id: 3,
    name: "Triphala Powder",
    category: "Disease-Related Products",
    subcategory: "Digestive Disorders",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Pure",
    description: "Traditional digestive support formula",
  },
  {
    id: 4,
    name: "Copper Water Pot",
    category: "Traditional Products",
    subcategory: "Pottery Items",
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Handmade",
    description: "Traditional copper vessel for water storage",
  },
  {
    id: 5,
    name: "Turmeric Face Mask",
    category: "Ayurvedic Products",
    subcategory: "Cosmetics",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.5,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Natural",
    description: "Brightening turmeric face mask for radiant skin",
  },
  {
    id: 6,
    name: "Herbal Gift Set",
    category: "Traditional Products",
    subcategory: "Gift Packs/Herbal Kits",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Premium",
    description: "Complete wellness gift set with assorted herbs",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;
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
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Our Products
        </h1>
        <p className="text-lg text-gray-600">
          Discover our comprehensive range of authentic Ayurvedic products,
          traditional remedies, and wellness solutions.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="default"
            showQuickAdd={true}
            showDescription={true}
            onAddToCart={(product) => {
              console.log("Adding to cart:", product);
              // TODO: Implement add to cart functionality
            }}
            onQuickAdd={(product) => {
              console.log("Quick add:", product);
              // TODO: Implement quick add functionality
            }}
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
