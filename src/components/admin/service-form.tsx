"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { X } from "lucide-react";

interface ServiceFormData {
  id?: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  category?: string;
  image?: string;
  buttonText?: string;
  iconName: string;
}

interface ServiceFormProps {
  service?: ServiceFormData;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const categories = ["ayurvedic", "nakshatra"];
const iconOptions = [
  "Star",
  "Heart",
  "Leaf",
  "Sun",
  "Moon",
  "Flower",
  "Sparkles",
  "Shield",
  "Zap",
  "Eye",
  "Brain",
  "Activity",
];

export function ServiceForm({
  service,
  onSubmit,
  onCancel,
  isLoading,
}: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: service?.title || "",
    duration: service?.duration || "",
    price: service?.price || "",
    description: service?.description || "",
    features: service?.features || [],
    popular: service?.popular || false,
    category: service?.category || "",
    image: service?.image || "",
    buttonText: service?.buttonText || "",
    iconName: service?.iconName || "Star",
  });

  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof ServiceFormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-yellow-200 shadow-xl bg-gradient-to-br from-white to-yellow-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-500 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🧘</span>
            </div>
            {service ? "Edit Healing Service" : "Create New Healing Service"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-yellow-800 font-bold">
                  Service Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter healing service title"
                  required
                  className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="duration" className="text-yellow-800 font-bold">
                  Duration *
                </Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  placeholder="e.g., 60 minutes, 2 hours"
                  required
                  className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="price" className="text-yellow-800 font-bold">
                  Price *
                </Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="e.g., Rs. 500, From Rs. 300"
                  required
                  className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-yellow-800 font-bold">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="iconName" className="text-yellow-800 font-bold">
                  Icon
                </Label>
                <Select
                  value={formData.iconName}
                  onValueChange={(value) =>
                    handleInputChange("iconName", value)
                  }
                >
                  <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="buttonText"
                  className="text-yellow-800 font-bold"
                >
                  Button Text
                </Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) =>
                    handleInputChange("buttonText", e.target.value)
                  }
                  placeholder="e.g., Book Consultation, Start Healing"
                  className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-yellow-800 font-bold"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the healing benefits and traditional aspects of this service..."
                rows={3}
                required
                className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="image" className="text-yellow-800 font-bold">
                Service Image
              </Label>
              <div className="border-2 border-dashed border-yellow-200 rounded-xl p-4 bg-yellow-50/50">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => handleInputChange("image", url)}
                  onRemove={() => handleInputChange("image", "")}
                  folder="services"
                  placeholder="Upload healing service image"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-yellow-800 font-bold">
                Service Features
              </Label>
              <div className="flex gap-3">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a healing benefit or feature"
                  className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 font-semibold"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.features.map((feature, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-300 pr-1 py-1"
                  >
                    {feature}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 ml-2 hover:bg-red-100"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-3 w-3 text-red-600" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-xl border border-orange-200">
              <Checkbox
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) =>
                  handleInputChange("popular", checked as boolean)
                }
                className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
              />
              <Label htmlFor="popular" className="text-orange-800 font-bold">
                Mark as popular healing service
              </Label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-yellow-200">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading
                  ? "Saving..."
                  : service
                    ? "Update Service"
                    : "Create Service"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 font-semibold px-6"
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
