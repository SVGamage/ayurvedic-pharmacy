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
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>
          {subcategory ? "Edit Subcategory" : "Create New Subcategory"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryId">Parent Category *</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => handleInputChange("categoryId", value)}
              required
            >
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="name">Subcategory Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter subcategory name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter subcategory description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Subcategory Image</Label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => handleInputChange("image", url)}
              onRemove={() => handleInputChange("image", "")}
              folder="subcategories"
              placeholder="Upload subcategory image"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                handleInputChange("isActive", checked as boolean)
              }
            />
            <Label htmlFor="isActive">Active subcategory</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
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
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
