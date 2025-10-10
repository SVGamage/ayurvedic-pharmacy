"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Category } from "@/types/product";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: Partial<Category>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isLoading,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: category?.name || "",
    description: category?.description || "",
    image: category?.image || "",
    isActive: category?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof Category,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="border-2 border-emerald-200 shadow-xl bg-gradient-to-br from-white to-emerald-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🏛️</span>
            </div>
            {category
              ? "Edit Ayurvedic Category"
              : "Create New Ayurvedic Category"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-emerald-800 font-bold">
                Category Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter Ayurvedic category name"
                required
                className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
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
                placeholder="Describe this category and its Ayurvedic significance..."
                rows={3}
                className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="image" className="text-emerald-800 font-bold">
                Category Image
              </Label>
              <div className="border-2 border-dashed border-emerald-200 rounded-xl p-4 bg-emerald-50/50">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => handleInputChange("image", url)}
                  onRemove={() => handleInputChange("image", "")}
                  folder="categories"
                  placeholder="Upload category image"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  handleInputChange("isActive", checked as boolean)
                }
                className="border-emerald-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <Label htmlFor="isActive" className="text-emerald-800 font-bold">
                Active category
              </Label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-emerald-200">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading
                  ? "Saving..."
                  : category
                    ? "Update Category"
                    : "Create Category"}
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
        </CardContent>
      </Card>
    </div>
  );
}
