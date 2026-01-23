"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Ashwagandha Capsules",
    categoryId: "stress-sleep",
    category: {
      id: "stress-sleep",
      name: "Stress & Sleep",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    productPrices: [
      { variant: "60 Capsules", price: 2499 },
      { variant: "120 Capsules", price: 4499 },
    ],
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    description:
      "Premium quality Ashwagandha for stress relief and better sleep",
  },
  {
    id: "2",
    name: "Triphala Powder",
    categoryId: "digestive-health",
    category: {
      id: "digestive-health",
      name: "Digestive Health",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    productPrices: [
      { variant: "100g", price: 1899 },
      { variant: "250g", price: 3999 },
    ],
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Organic",
    description: "Traditional digestive support formula",
  },
  {
    id: "3",
    name: "Neem Oil",
    categoryId: "skin-care",
    category: {
      id: "skin-care",
      name: "Skin Care",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    productPrices: [
      { variant: "50ml", price: 1699 },
      { variant: "100ml", price: 2999 },
    ],
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Pure",
    description: "Pure neem oil for healthy, glowing skin",
  },
  {
    id: "4",
    name: "Turmeric Tablets",
    categoryId: "immunity",
    category: {
      id: "immunity",
      name: "Immunity",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    productPrices: [
      { variant: "60 Tablets", price: 2199 },
      { variant: "120 Tablets", price: 3999 },
    ],
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    description: "Natural turmeric tablets for immunity support",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Featured <span className="text-emerald-700 italic">Products</span>
            </h2>
            <p className="text-lg text-stone-600">
              Discover our most popular natural remedies, carefully selected for
              your well-being.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
              showQuickAdd={false}
              showDescription={false}
            />
          ))}
        </div>

        <div className="text-center md:hidden">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
