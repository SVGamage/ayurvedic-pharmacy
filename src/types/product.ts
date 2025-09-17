export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId?: string;
  subcategoryId?: string;
  category?: Category;
  subcategory?: SubCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
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
