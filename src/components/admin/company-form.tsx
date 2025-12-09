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
import { X, Pencil } from "lucide-react";

interface CompanyProduct {
  id?: string;
  name: string;
  code: string;
  price: string;
  subCategoryId?: string;
  subCategory?: {
    id: string;
    name: string;
  };
}

interface CompanyFormData {
  id?: string;
  name: string;
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

  const [formData, setFormData] = useState<CompanyFormData>({
    name: company?.name || "",
    companyProducts: company?.companyProducts || [],
  });

  const [newProduct, setNewProduct] = useState<CompanyProduct>({
    name: "",
    code: "",
    price: "",
    subCategoryId: "",
  });

  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(
    null
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
    value: string | CompanyProduct[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductInputChange = (
    field: keyof CompanyProduct,
    value: string
  ) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const addProduct = () => {
    if (
      newProduct.name.trim() &&
      newProduct.code.trim() &&
      newProduct.price.trim()
    ) {
      const subCategoryId =
        newProduct.subCategoryId === "none" ? "" : newProduct.subCategoryId;
      const selectedSubCategory = categories.find(
        (cat) => cat.id === subCategoryId
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
              : product
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
      setNewProduct({ name: "", code: "", price: "", subCategoryId: "" });
    }
  };

  const editProduct = (index: number) => {
    const product = formData.companyProducts[index];
    setNewProduct({
      name: product.name,
      code: product.code,
      price: product.price,
      subCategoryId: product.subCategoryId || "",
    });
    setEditingProductIndex(index);
  };

  const cancelEdit = () => {
    setNewProduct({ name: "", code: "", price: "", subCategoryId: "" });
    setEditingProductIndex(null);
  };

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      companyProducts: prev.companyProducts.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter" && field === "price") {
      e.preventDefault();
      addProduct();
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
                      htmlFor="productPrice"
                      className="text-blue-700 text-sm font-medium"
                    >
                      Price
                    </Label>
                    <Input
                      id="productPrice"
                      value={newProduct.price}
                      onChange={(e) =>
                        handleProductInputChange("price", e.target.value)
                      }
                      onKeyPress={(e) => handleKeyPress(e, "price")}
                      placeholder="Enter price"
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
                          value === "none" ? "" : value
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

                <Button
                  type="button"
                  onClick={addProduct}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold mt-3"
                  disabled={
                    !newProduct.name.trim() ||
                    !newProduct.code.trim() ||
                    !newProduct.price.trim()
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
                  <div className="grid grid-cols-1 gap-2">
                    {formData.companyProducts.map((product, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-300 p-3 justify-between text-left h-auto"
                      >
                        <div className="flex-1">
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm opacity-80">
                            Code: {product.code} | Price: {product.price}
                            {product.subCategory && (
                              <span className="ml-2 text-xs bg-blue-200 px-2 py-1 rounded">
                                {product.subCategory.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2 flex-shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 hover:bg-blue-100"
                            onClick={() => editProduct(index)}
                            disabled={editingProductIndex !== null}
                          >
                            <Pencil className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 hover:bg-red-100"
                            onClick={() => removeProduct(index)}
                            disabled={editingProductIndex !== null}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </Badge>
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
