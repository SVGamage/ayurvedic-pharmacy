"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Category, SubCategory } from "@/types/product";

interface SubCategoryFormProps {
  subcategory?: SubCategory;
  onSubmit: (data: Partial<SubCategory>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SubCategoryForm({
  subcategory,
  onSubmit,
  onCancel,
  isLoading,
}: SubCategoryFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Partial<SubCategory>>({
    name: subcategory?.name || "",
    description: subcategory?.description || "",
    image: subcategory?.image || "",
    categoryId: subcategory?.categoryId || "",
    isActive: subcategory?.isActive ?? true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof SubCategory,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="border-2 border-amber-200 shadow-xl bg-gradient-to-br from-white to-amber-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🌿</span>
            </div>
            {subcategory
              ? "Edit Ayurvedic Subcategory"
              : "Create New Ayurvedic Subcategory"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="categoryId" className="text-amber-800 font-bold">
                Parent Category *
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  handleInputChange("categoryId", value)
                }
                required
              >
                <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => cat.isActive)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="name" className="text-amber-800 font-bold">
                Subcategory Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter Ayurvedic subcategory name"
                required
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-amber-800 font-bold">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe this subcategory and its Ayurvedic benefits..."
                rows={3}
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="image" className="text-amber-800 font-bold">
                Subcategory Image
              </Label>
              <div className="border-2 border-dashed border-amber-200 rounded-xl p-4 bg-amber-50/50">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => handleInputChange("image", url)}
                  onRemove={() => handleInputChange("image", "")}
                  folder="subcategories"
                  placeholder="Upload subcategory image"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  handleInputChange("isActive", checked as boolean)
                }
                className="border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <Label htmlFor="isActive" className="text-amber-800 font-bold">
                Active subcategory
              </Label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-amber-200">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading
                  ? "Saving..."
                  : subcategory
                    ? "Update Subcategory"
                    : "Create Subcategory"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold px-6"
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
