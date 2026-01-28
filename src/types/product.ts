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

export interface ProductPrice {
  id?: string;
  variant: string;
  price: number;
  productId?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId?: string;
  subcategoryId?: string;
  category?: Category;
  subcategory?: SubCategory;
  productPrices: ProductPrice[];
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  selectedVariant: {
    variant: string;
    price: number;
  };
  quantity: number;
  addedAt: number;
  category?: string;
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
