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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Building2, Package } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import CarouselGrid from "@/components/carousel-grid";
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

// Sample supplier companies data
interface SupplierCompany {
  id: string;
  name: string;
  description: string;
  logo?: string;
  location: string;
  established: string;
  products: Product[];
}

// Helper to create category objects
const createCategory = (id: string, name: string) => ({
  id,
  name,
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
});

const supplierCompanies: SupplierCompany[] = [
  {
    id: "ayurgenix",
    name: "AyurGenix Solutions",
    description:
      "Leading manufacturer of authentic Ayurvedic medicines and wellness products",
    location: "Kandy, Sri Lanka",
    established: "1995",
    products: [
      {
        id: "ayur-1",
        name: "Brahmi Hair Oil",
        price: 850,
        originalPrice: 1200,
        rating: 4.8,
        reviews: 245,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Best Seller",
        description:
          "Premium Brahmi hair oil for healthy hair growth and scalp nourishment",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
      {
        id: "ayur-2",
        name: "Ashwagandha Capsules",
        price: 2850,
        originalPrice: 3200,
        rating: 4.7,
        reviews: 189,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Organic",
        description:
          "Pure Ashwagandha extract capsules for stress relief and vitality",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
      {
        id: "ayur-3",
        name: "Triphala Powder",
        price: 1200,
        rating: 4.6,
        reviews: 156,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Traditional Triphala powder for digestive health and detoxification",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
    ],
  },
  {
    id: "herbanova",
    name: "HerbaNova Pharmaceuticals",
    description: "Modern Ayurvedic formulations with traditional wisdom",
    location: "Colombo, Sri Lanka",
    established: "2008",
    products: [
      {
        id: "herb-1",
        name: "Neem Face Wash",
        price: 650,
        originalPrice: 850,
        rating: 4.5,
        reviews: 312,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Natural",
        description: "Gentle neem-based face wash for clear and healthy skin",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
      {
        id: "herb-2",
        name: "Turmeric Capsules",
        price: 1850,
        rating: 4.4,
        reviews: 98,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "High-potency turmeric capsules for inflammation and immunity",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
      {
        id: "herb-3",
        name: "Ginger Honey Syrup",
        price: 950,
        rating: 4.7,
        reviews: 156,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Traditional",
        description: "Natural ginger and honey syrup for cough and cold relief",
        category: createCategory("disease", "Disease-Related Products"),
      },
    ],
  },
  {
    id: "naturacare",
    name: "NaturaCare Wellness",
    description: "Certified organic Ayurvedic products for holistic wellness",
    location: "Galle, Sri Lanka",
    established: "2012",
    products: [
      {
        id: "nat-1",
        name: "Moringa Leaf Powder",
        price: 1450,
        originalPrice: 1650,
        rating: 4.9,
        reviews: 87,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Superfood",
        description:
          "Organic moringa leaf powder packed with nutrients and antioxidants",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
      {
        id: "nat-2",
        name: "Coconut Oil (Virgin)",
        price: 1200,
        rating: 4.6,
        reviews: 234,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Organic",
        description:
          "Cold-pressed virgin coconut oil for cooking and beauty care",
        category: createCategory("traditional", "Traditional Products"),
      },
      {
        id: "nat-3",
        name: "Gotukola Tea",
        price: 850,
        rating: 4.5,
        reviews: 145,
        image: "/placeholder.svg?height=300&width=300",
        description: "Organic Gotukola tea for mental clarity and brain health",
        category: createCategory("ayur", "Ayurvedic Products"),
      },
    ],
  },
  {
    id: "traditional-remedies",
    name: "Traditional Remedies Co.",
    description: "Preserving ancient formulations for modern wellness needs",
    location: "Matara, Sri Lanka",
    established: "1987",
    products: [
      {
        id: "trad-1",
        name: "Paspanguwa Herbal Tea",
        price: 750,
        originalPrice: 950,
        rating: 4.8,
        reviews: 278,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Traditional",
        description:
          "Traditional Sri Lankan herbal tea blend for respiratory wellness",
        category: createCategory("traditional", "Traditional Products"),
      },
      {
        id: "trad-2",
        name: "Siddhalepa Balm",
        price: 450,
        rating: 4.7,
        reviews: 412,
        image: "/placeholder.svg?height=300&width=300",
        badge: "Popular",
        description:
          "Traditional herbal balm for muscle pain and headache relief",
        category: createCategory("disease", "Disease-Related Products"),
      },
      {
        id: "trad-3",
        name: "Sarpagandhadi Kashaya",
        price: 1850,
        rating: 4.6,
        reviews: 67,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Classical Ayurvedic decoction for hypertension management",
        category: createCategory("disease", "Disease-Related Products"),
      },
    ],
  },
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
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierCompany | null>(null);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [selectedSupplierValue, setSelectedSupplierValue] = useState("");

  const handleSupplierSelect = (supplierId: string) => {
    const supplier = supplierCompanies.find((s) => s.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
      setSelectedSupplierValue(supplierId);
      setIsSupplierDialogOpen(true);
    }
  };

  const handleSupplierDialogClose = (open: boolean) => {
    setIsSupplierDialogOpen(open);
    if (!open) {
      setSelectedSupplier(null);
      setSelectedSupplierValue("");
    }
  };

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
          <Select
            value={selectedSupplierValue}
            onValueChange={handleSupplierSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Shop By Brand" />
            </SelectTrigger>
            <SelectContent>
              {supplierCompanies.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-green-600" />
                    <span>{supplier.name}</span>
                  </div>
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

      {/* Supplier Dialog */}
      <Dialog
        open={isSupplierDialogOpen}
        onOpenChange={handleSupplierDialogClose}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 mb-4">
              {selectedSupplier?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedSupplier && (
            <div className="space-y-6">
              {/* Supplier Information */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-800">
                      About Company
                    </h4>
                    <p className="text-green-700">
                      {selectedSupplier.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        <strong>Location:</strong> {selectedSupplier.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        <strong>Established:</strong>{" "}
                        {selectedSupplier.established}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        <strong>Products:</strong>{" "}
                        {selectedSupplier.products.length} items
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Products from {selectedSupplier.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSupplier.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant="default"
                      showQuickAdd={true}
                      showDescription={true}
                    />
                  ))}
                </div>
              </div>

              {/* Company Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Company Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedSupplier.products.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(
                        (selectedSupplier.products.reduce(
                          (acc, p) => acc + p.rating,
                          0
                        ) /
                          selectedSupplier.products.length) *
                          10
                      ) / 10}
                    </div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedSupplier.products.reduce(
                        (acc, p) => acc + p.reviews,
                        0
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Total Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {new Date().getFullYear() -
                        parseInt(selectedSupplier.established)}
                      +
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
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
