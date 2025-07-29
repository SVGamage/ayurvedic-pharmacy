import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredProducts = [
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
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <Badge className="absolute top-2 left-2 bg-green-600">
                  {product.badge}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600 font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({product.reviews})
                  </span>
                </div>
              </div>
              <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
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
