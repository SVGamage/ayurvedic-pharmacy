"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, scaleInView } from "@/lib/animation-variants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

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
    price: 2499,
    originalPrice: 2999,
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
    price: 1899,
    originalPrice: 2299,
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
    price: 1699,
    originalPrice: 1999,
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
    price: 2199,
    originalPrice: 2599,
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    description: "Natural turmeric tablets for immunity support",
  },
];

export function FeaturedProducts() {
  const { ref: headerRef, inView: headerInView } = useScrollAnimation();
  const { ref: gridRef, inView: gridInView } = useScrollAnimation({ threshold: 0.1 });
  const { ref: buttonRef, inView: buttonInView } = useScrollAnimation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        ref={headerRef}
        className="text-center mb-12"
        initial="offscreen"
        animate={headerInView ? "onscreen" : "offscreen"}
        variants={fadeInUp}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the best of Sri Lankan Ayurveda Products
        </p>
      </motion.div>

      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
      >
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={scaleInView}
            custom={index}
          >
            <ProductCard
              product={product}
              variant="featured"
              showQuickAdd={false}
              showDescription={false}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        ref={buttonRef}
        className="text-center"
        initial="offscreen"
        animate={buttonInView ? "onscreen" : "offscreen"}
        variants={scaleInView}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
