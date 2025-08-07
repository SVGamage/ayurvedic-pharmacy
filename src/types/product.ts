export interface Product {
  id: number;
  name: string;
  category?: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
}

export interface SortOptions {
  field: "name" | "price" | "rating" | "reviews";
  direction: "asc" | "desc";
}
