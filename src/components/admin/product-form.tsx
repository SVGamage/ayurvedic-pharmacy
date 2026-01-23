"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Product, Category, SubCategory, ProductPrice } from "@/types/product";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProductForm({
  product,
  onSubmit,
  onCancel,
  isLoading,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubCategory[]
  >([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || "",
    categoryId: product?.categoryId || "",
    subcategoryId: product?.subcategoryId || "",
    productPrices: product?.productPrices || [],
    rating: product?.rating || 0,
    reviews: product?.reviews || 0,
    image: product?.image || "",
    badge: product?.badge || "",
    description: product?.description || "",
  });

  const [newPrice, setNewPrice] = useState<{ variant: string; price: number }>({
    variant: "",
    price: 0,
  });

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch("/api/admin/categories");

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.categoryId) {
        setFilteredSubcategories([]);
        return;
      }

      setLoadingSubcategories(true);
      try {
        const response = await fetch(
          `/api/admin/subcategories?categoryId=${formData.categoryId}`,
        );

        if (response.ok) {
          const subcategoriesData = await response.json();
          setFilteredSubcategories(subcategoriesData);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setFilteredSubcategories([]);
      } finally {
        setLoadingSubcategories(false);
      }
    };

    fetchSubcategories();
  }, [formData.categoryId]);

  // Load subcategories for existing product on mount
  useEffect(() => {
    if (product?.categoryId && categories.length > 0) {
      const fetchInitialSubcategories = async () => {
        setLoadingSubcategories(true);
        try {
          const response = await fetch(
            `/api/admin/subcategories?categoryId=${product.categoryId}`,
          );

          if (response.ok) {
            const subcategoriesData = await response.json();
            setFilteredSubcategories(subcategoriesData);
          }
        } catch (error) {
          console.error("Error fetching initial subcategories:", error);
        } finally {
          setLoadingSubcategories(false);
        }
      };

      fetchInitialSubcategories();
    }
  }, [product?.categoryId, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof Product,
    value: string | number | undefined | ProductPrice[],
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Reset subcategory when category changes
      if (field === "categoryId") {
        newData.subcategoryId = "";
      }

      return newData;
    });
  };

  const addPriceVariant = () => {
    if (newPrice.variant.trim() && newPrice.price > 0) {
      setFormData((prev) => ({
        ...prev,
        productPrices: [
          ...(prev.productPrices || []),
          { variant: newPrice.variant, price: newPrice.price },
        ],
      }));
      setNewPrice({ variant: "", price: 0 });
    }
  };

  const removePriceVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productPrices: (prev.productPrices || []).filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPriceVariant();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-emerald-200 shadow-xl bg-gradient-to-br from-white to-emerald-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-yellow-500 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🌿</span>
            </div>
            {product
              ? "Edit Ayurvedic Product"
              : "Create New Ayurvedic Product"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">🌱</span>
                </div>
                <div className="text-emerald-700 font-medium">
                  Loading categories...
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-emerald-800 font-bold">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter Ayurvedic product name"
                    required
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="category"
                    className="text-emerald-800 font-bold"
                  >
                    Category
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      handleInputChange("categoryId", value)
                    }
                  >
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="subcategory"
                    className="text-emerald-800 font-bold"
                  >
                    Subcategory
                  </Label>
                  <Select
                    value={formData.subcategoryId}
                    onValueChange={(value) =>
                      handleInputChange("subcategoryId", value)
                    }
                    disabled={!formData.categoryId || loadingSubcategories}
                  >
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400">
                      <SelectValue
                        placeholder={
                          !formData.categoryId
                            ? "Select category first"
                            : loadingSubcategories
                              ? "Loading subcategories..."
                              : "Select subcategory"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubcategories.map((subcat) => (
                        <SelectItem key={subcat.id} value={subcat.id}>
                          {subcat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {filteredSubcategories.length === 0 &&
                    formData.categoryId &&
                    !loadingSubcategories && (
                      <p className="text-sm text-amber-600 mt-1">
                        No subcategories available for this category
                      </p>
                    )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="badge" className="text-emerald-800 font-bold">
                    Badge
                  </Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => handleInputChange("badge", e.target.value)}
                    placeholder="e.g., Best Seller, Traditional, Organic"
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="rating"
                    className="text-emerald-800 font-bold"
                  >
                    Rating (0-5)
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      handleInputChange(
                        "rating",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="4.5"
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="reviews"
                    className="text-emerald-800 font-bold"
                  >
                    Review Count
                  </Label>
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) =>
                      handleInputChange(
                        "reviews",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    placeholder="0"
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>
              </div>

              {/* Price Variants Section */}
              <div className="space-y-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <Label className="text-emerald-800 font-bold">
                  Product Prices (Variants) *
                </Label>
                <p className="text-sm text-emerald-600">
                  Add different size/variant options with their prices (e.g.,
                  50ml - Rs.500, 100ml - Rs.900)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="variant"
                      className="text-emerald-700 text-sm font-medium"
                    >
                      Variant (e.g., 50ml, 100ml)
                    </Label>
                    <Input
                      id="variant"
                      placeholder="Enter variant"
                      value={newPrice.variant}
                      onChange={(e) =>
                        setNewPrice((prev) => ({
                          ...prev,
                          variant: e.target.value,
                        }))
                      }
                      className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="variantPrice"
                      className="text-emerald-700 text-sm font-medium"
                    >
                      Price (Rs.)
                    </Label>
                    <Input
                      id="variantPrice"
                      type="number"
                      step="0.01"
                      placeholder="Enter price"
                      value={newPrice.price || ""}
                      onChange={(e) =>
                        setNewPrice((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value) || 0,
                        }))
                      }
                      onKeyPress={handleKeyPress}
                      className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-700 text-sm font-medium invisible">
                      Action
                    </Label>
                    <Button
                      type="button"
                      onClick={addPriceVariant}
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      disabled={!newPrice.variant.trim() || newPrice.price <= 0}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Variant
                    </Button>
                  </div>
                </div>

                {(formData.productPrices || []).length > 0 && (
                  <div className="space-y-2 mt-4">
                    <Label className="text-emerald-700 text-sm font-medium">
                      Added Variants ({formData.productPrices?.length})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {(formData.productPrices || []).map(
                        (priceVariant, index) => (
                          <Badge
                            key={index}
                            className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-2 text-sm flex items-center gap-2"
                          >
                            <span className="font-medium">
                              {priceVariant.variant}:
                            </span>
                            <span className="font-bold">
                              Rs. {priceVariant.price.toFixed(2)}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-auto p-1 hover:bg-red-100 ml-1"
                              onClick={() => removePriceVariant(index)}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {(formData.productPrices || []).length === 0 && (
                  <p className="text-sm text-amber-600 mt-2">
                    Please add at least one price variant
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="image" className="text-emerald-800 font-bold">
                  Product Image *
                </Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-4 bg-emerald-50/50">
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => handleInputChange("image", url)}
                    onRemove={() => handleInputChange("image", "")}
                    folder="products"
                    placeholder="Upload Ayurvedic product image"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="description"
                  className="text-emerald-800 font-bold"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the Ayurvedic benefits and properties of this product..."
                  rows={4}
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>

              <div className="flex gap-3 pt-6 border-t border-emerald-200">
                <Button
                  type="submit"
                  disabled={
                    isLoading || (formData.productPrices || []).length === 0
                  }
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {isLoading
                    ? "Saving..."
                    : product
                      ? "Update Product"
                      : "Create Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
