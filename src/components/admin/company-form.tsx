"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { X, Pencil, Copy, Plus } from "lucide-react";

interface PriceVariant {
  variant: string;
  price: number;
}

interface CompanyProduct {
  id?: string;
  name: string;
  code: string;
  prices: PriceVariant[];
  subCategoryId?: string;
  subCategory?: {
    id: string;
    name: string;
  };
}

interface CompanyFormData {
  id?: string;
  name: string;
  image?: string;
  description?: string;
  phone?: string;
  address?: string;
  email?: string;
  companyProducts: CompanyProduct[];
}

interface CompanyFormProps {
  company?: CompanyFormData;
  onSubmit: (data: CompanyFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface Category {
  id: string;
  name: string;
}

export function CompanyForm({
  company,
  onSubmit,
  onCancel,
  isLoading,
}: CompanyFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Transform company data to ensure prices array exists
  const transformedProducts =
    company?.companyProducts.map((product) => ({
      ...product,
      prices: product.prices || [],
    })) || [];

  const [formData, setFormData] = useState<CompanyFormData>({
    name: company?.name || "",
    image: company?.image || "",
    description: company?.description || "",
    phone: company?.phone || "",
    address: company?.address || "",
    email: company?.email || "",
    companyProducts: transformedProducts,
  });

  const [newProduct, setNewProduct] = useState<CompanyProduct>({
    name: "",
    code: "",
    prices: [],
    subCategoryId: "",
  });

  const [newPrice, setNewPrice] = useState<PriceVariant>({
    variant: "",
    price: 0,
  });

  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(
    null,
  );

  // Fetch categories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch("/api/admin/subcategories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof CompanyFormData,
    value: string | CompanyProduct[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductInputChange = (
    field: keyof CompanyProduct,
    value: string,
  ) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const addPriceToProduct = () => {
    if (newPrice.variant.trim() && newPrice.price > 0) {
      setNewProduct((prev) => ({
        ...prev,
        prices: [...prev.prices, { ...newPrice }],
      }));
      setNewPrice({ variant: "", price: 0 });
    }
  };

  const removePriceFromProduct = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      prices: prev.prices.filter((_, i) => i !== index),
    }));
  };

  const addProduct = () => {
    if (
      newProduct.name.trim() &&
      newProduct.code.trim() &&
      newProduct.prices.length > 0
    ) {
      const subCategoryId =
        newProduct.subCategoryId === "none" ? "" : newProduct.subCategoryId;
      const selectedSubCategory = categories.find(
        (cat) => cat.id === subCategoryId,
      );

      if (editingProductIndex !== null) {
        // Update existing product
        setFormData((prev) => ({
          ...prev,
          companyProducts: prev.companyProducts.map((product, i) =>
            i === editingProductIndex
              ? {
                  ...newProduct,
                  subCategoryId,
                  subCategory: selectedSubCategory
                    ? {
                        id: selectedSubCategory.id,
                        name: selectedSubCategory.name,
                      }
                    : undefined,
                }
              : product,
          ),
        }));
        setEditingProductIndex(null);
      } else {
        // Add new product
        setFormData((prev) => ({
          ...prev,
          companyProducts: [
            ...prev.companyProducts,
            {
              ...newProduct,
              subCategoryId,
              subCategory: selectedSubCategory
                ? { id: selectedSubCategory.id, name: selectedSubCategory.name }
                : undefined,
            },
          ],
        }));
      }
      setNewProduct({ name: "", code: "", prices: [], subCategoryId: "" });
      setNewPrice({ variant: "", price: 0 });
    }
  };

  const editProduct = (index: number) => {
    const product = formData.companyProducts[index];
    setNewProduct({
      name: product.name,
      code: product.code,
      prices: [...(product.prices || [])],
      subCategoryId: product.subCategoryId || "",
    });
    setEditingProductIndex(index);
  };

  const cancelEdit = () => {
    setNewProduct({ name: "", code: "", prices: [], subCategoryId: "" });
    setNewPrice({ variant: "", price: 0 });
    setEditingProductIndex(null);
  };

  const duplicateProduct = (index: number) => {
    const product = formData.companyProducts[index];
    const duplicatedProduct = {
      ...product,
    };
    setFormData((prev) => ({
      ...prev,
      companyProducts: [...prev.companyProducts, duplicatedProduct],
    }));
  };

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      companyProducts: prev.companyProducts.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "priceValue") {
        addPriceToProduct();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🏢</span>
            </div>
            {company ? "Edit Company" : "Create New Company"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-blue-800 font-bold">
                Company Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter company name"
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="image" className="text-blue-800 font-bold">
                Company Image
              </Label>
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50/50">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => handleInputChange("image", url)}
                  onRemove={() => handleInputChange("image", "")}
                  folder="companies"
                  placeholder="Upload company logo or image"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-blue-800 font-bold">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter company description"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-blue-800 font-bold">
                  Phone (WhatsApp)
                </Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="e.g. 94701234567"
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-blue-800 font-bold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="company@example.com"
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="address" className="text-blue-800 font-bold">
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Company address"
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-blue-800 font-bold">
                Company Products
              </Label>

              <div className="space-y-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="productName"
                      className="text-blue-700 text-sm font-medium"
                    >
                      Product Name
                    </Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) =>
                        handleProductInputChange("name", e.target.value)
                      }
                      placeholder="Enter product name"
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="productCode"
                      className="text-blue-700 text-sm font-medium"
                    >
                      Product Code
                    </Label>
                    <Input
                      id="productCode"
                      value={newProduct.code}
                      onChange={(e) =>
                        handleProductInputChange("code", e.target.value)
                      }
                      placeholder="Enter product code"
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-blue-700 text-sm font-medium"
                    >
                      Category (Optional)
                    </Label>
                    <Select
                      value={newProduct.subCategoryId || "none"}
                      onValueChange={(value) =>
                        handleProductInputChange(
                          "subCategoryId",
                          value === "none" ? "" : value,
                        )
                      }
                      disabled={loadingCategories}
                    >
                      <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                        <SelectValue
                          placeholder={
                            loadingCategories ? "Loading..." : "Select category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Category</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Variants Section */}
                <div className="space-y-3 mt-4">
                  <Label className="text-blue-700 text-sm font-medium">
                    Product Prices *
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      placeholder="Variant (e.g., 100ml)"
                      value={newPrice.variant}
                      onChange={(e) =>
                        setNewPrice((prev) => ({
                          ...prev,
                          variant: e.target.value,
                        }))
                      }
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newPrice.price || ""}
                      onChange={(e) =>
                        setNewPrice((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value) || 0,
                        }))
                      }
                      onKeyPress={(e) => handleKeyPress(e, "priceValue")}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                    <Button
                      type="button"
                      onClick={addPriceToProduct}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      disabled={!newPrice.variant.trim() || newPrice.price <= 0}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Price
                    </Button>
                  </div>

                  {newProduct.prices.length > 0 && (
                    <div className="space-y-2">
                      {newProduct.prices.map((price, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-50 text-blue-800 border border-blue-300 p-2 justify-between w-full"
                        >
                          <span>
                            {price.variant}: Rs. {price.price.toFixed(2)}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 hover:bg-red-100"
                            onClick={() => removePriceFromProduct(index)}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={addProduct}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold mt-3"
                  disabled={
                    !newProduct.name.trim() ||
                    !newProduct.code.trim() ||
                    newProduct.prices.length === 0
                  }
                >
                  {editingProductIndex !== null
                    ? "Update Product"
                    : "Add Product"}
                </Button>
                {editingProductIndex !== null && (
                  <Button
                    type="button"
                    onClick={cancelEdit}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>

              {formData.companyProducts.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-blue-700 text-sm font-medium">
                    Added Products ({formData.companyProducts.length})
                  </Label>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                    {formData.companyProducts.map((product, index) => (
                      <div
                        key={index}
                        className="bg-white border border-blue-200 rounded-lg p-3 hover:border-blue-300 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {/* Product Header - Compact */}
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-blue-900 text-sm truncate">
                                {product.name}
                              </h4>
                              {product.subCategory && (
                                <Badge
                                  variant="secondary"
                                  className="bg-purple-100 text-purple-700 border-purple-200 text-xs flex-shrink-0"
                                >
                                  {product.subCategory.name}
                                </Badge>
                              )}
                            </div>

                            {/* Product Code & Prices - Inline */}
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded">
                                {product.code}
                              </span>
                              {(product.prices || []).length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {(product.prices || []).map(
                                    (price, priceIndex) => (
                                      <span
                                        key={priceIndex}
                                        className="inline-flex items-center gap-1 bg-green-50 border border-green-200 rounded px-2 py-0.5 text-green-700"
                                      >
                                        <span className="font-medium">
                                          {price.variant}:
                                        </span>
                                        <span className="font-semibold">
                                          Rs. {price.price.toFixed(2)}
                                        </span>
                                      </span>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons - Horizontal & Compact */}
                          <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 hover:bg-blue-100 rounded"
                              onClick={() => editProduct(index)}
                              disabled={editingProductIndex !== null}
                              title="Edit"
                            >
                              <Pencil className="h-3.5 w-3.5 text-blue-600" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 hover:bg-green-100 rounded"
                              onClick={() => duplicateProduct(index)}
                              disabled={editingProductIndex !== null}
                              title="Duplicate"
                            >
                              <Copy className="h-3.5 w-3.5 text-green-600" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 hover:bg-red-100 rounded"
                              onClick={() => removeProduct(index)}
                              disabled={editingProductIndex !== null}
                              title="Delete"
                            >
                              <X className="h-3.5 w-3.5 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-6 border-t border-blue-200">
              <Button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading
                  ? "Saving..."
                  : company
                    ? "Update Company"
                    : "Create Company"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
