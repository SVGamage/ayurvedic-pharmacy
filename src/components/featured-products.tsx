"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    category: "Stress & Sleep",
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
    name: "Triphala Powder",
    category: "Digestive Health",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Organic",
    description: "Traditional digestive support formula",
  },
  {
    id: 3,
    name: "Neem Oil",
    category: "Skin Care",
    price: 16.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Pure",
    description: "Pure neem oil for healthy, glowing skin",
  },
  {
    id: 4,
    name: "Turmeric Tablets",
    category: "Immunity",
    price: 21.99,
    originalPrice: 25.99,
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    description: "Natural turmeric tablets for immunity support",
  },
];

export function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our most popular Ayurvedic remedies, carefully selected for
          their effectiveness and purity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="featured"
            showQuickAdd={false}
            showDescription={false}
            onAddToCart={(product) => {
              console.log("Adding to cart:", product);
              // TODO: Implement add to cart functionality
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          size="lg"
          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
        >
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
