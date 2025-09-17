"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star, Edit, Trash2 } from "lucide-react";
import { Service } from "@/types/service";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface AdminServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

// Helper function to get icon component from string name
const getIconComponent = (iconName?: string) => {
  if (!iconName) return Icons.Star;

  // Use a type assertion to handle the dynamic icon lookup
  const IconComponent = (Icons as unknown as Record<string, typeof Icons.Star>)[
    iconName
  ];
  return IconComponent || Icons.Star;
};

interface AdminServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export function AdminServiceCard({
  service,
  onEdit,
  onDelete,
}: AdminServiceCardProps) {
  const getThemeColors = () => {
    switch (service.category) {
      case "ayurvedic":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          priceColor: "text-green-600",
          checkColor: "text-green-600",
          borderColor: "border-green-200 hover:border-green-300",
          badgeBg: "bg-green-600",
        };
      case "nakshatra":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          priceColor: "text-yellow-600",
          checkColor: "text-yellow-600",
          borderColor: "border-yellow-200 hover:border-yellow-300",
          badgeBg: "bg-yellow-600",
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          priceColor: "text-blue-600",
          checkColor: "text-blue-600",
          borderColor: "border-blue-200 hover:border-blue-300",
          badgeBg: "bg-blue-600",
        };
    }
  };

  const colors = getThemeColors();

  // Get the icon component - either from icon prop or iconName prop
  const IconComponent = service.icon || getIconComponent(service.iconName);

  return (
    <Card
      className={cn(
        "group border-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden bg-white",
        service.popular && "ring-2 ring-blue-500",
        colors.borderColor
      )}
    >
      {service.popular && (
        <Badge className={cn("absolute top-3 left-3 z-10", colors.badgeBg)}>
          Most Popular
        </Badge>
      )}

      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-gray-50 opacity-50" />

      <CardHeader className="text-center pb-2 relative">
        <div
          className={cn(
            "mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2",
            colors.iconBg
          )}
        >
          <IconComponent className={cn("h-6 w-6", colors.iconColor)} />
        </div>
        <CardTitle className="text-lg mb-1">{service.title}</CardTitle>
        <p className="text-gray-600 text-sm line-clamp-2">
          {service.description}
        </p>

        {/* Rating Display */}
        <div className="flex items-center justify-center space-x-1 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">(4.0)</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-600">{service.duration}</span>
          </div>
          <span className={cn("text-lg font-bold", colors.priceColor)}>
            {service.price}
          </span>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-900 text-sm">
            What&apos;s Included:
          </h4>
          <ul className="space-y-1">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle
                  className={cn(
                    "h-3 w-3 flex-shrink-0 mt-0.5",
                    colors.checkColor
                  )}
                />
                <span className="text-xs text-gray-700">{feature}</span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-xs text-gray-500 ml-5">
                +{service.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Admin Actions */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => onEdit(service)}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => onDelete(service)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
