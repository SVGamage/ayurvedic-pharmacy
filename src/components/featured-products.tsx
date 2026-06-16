import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";
import { prisma } from "../../prisma/client";

// Pull the products an admin has flagged as featured. Newest first so the
// most recently highlighted products lead the section.
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      include: {
        category: true,
        subcategory: { include: { category: true } },
        productPrices: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });

    // Convert Date fields to plain strings so the data is serializable when
    // passed to the client-side ProductCard.
    return products.map((product) => ({
      ...product,
      badge: product.badge ?? undefined,
      description: product.description ?? undefined,
      categoryId: product.categoryId ?? undefined,
      subcategoryId: product.subcategoryId ?? undefined,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      category: product.category
        ? {
            ...product.category,
            description: product.category.description ?? undefined,
            image: product.category.image ?? undefined,
            createdAt: product.category.createdAt.toISOString(),
            updatedAt: product.category.updatedAt.toISOString(),
          }
        : undefined,
      subcategory: product.subcategory
        ? {
            ...product.subcategory,
            description: product.subcategory.description ?? undefined,
            image: product.subcategory.image ?? undefined,
            createdAt: product.subcategory.createdAt.toISOString(),
            updatedAt: product.subcategory.updatedAt.toISOString(),
            category: undefined,
          }
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  // Hide the section entirely when nothing has been marked as featured.
  if (featuredProducts.length === 0) {
    return null;
  }

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
