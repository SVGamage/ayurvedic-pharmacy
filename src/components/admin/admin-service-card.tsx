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
          iconBg: "bg-emerald-100",
          iconColor: "text-emerald-600",
          priceColor: "text-emerald-700",
          checkColor: "text-emerald-600",
          borderColor: "border-emerald-200 hover:border-emerald-300",
          badgeBg: "bg-gradient-to-r from-emerald-600 to-green-600",
          cardBg: "bg-gradient-to-br from-white to-emerald-50",
          textAccent: "text-emerald-800",
        };
      case "nakshatra":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          priceColor: "text-yellow-700",
          checkColor: "text-yellow-600",
          borderColor: "border-yellow-200 hover:border-yellow-300",
          badgeBg: "bg-gradient-to-r from-yellow-600 to-orange-600",
          cardBg: "bg-gradient-to-br from-white to-yellow-50",
          textAccent: "text-yellow-800",
        };
      default:
        return {
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          priceColor: "text-orange-700",
          checkColor: "text-orange-600",
          borderColor: "border-orange-200 hover:border-orange-300",
          badgeBg: "bg-gradient-to-r from-orange-600 to-red-600",
          cardBg: "bg-gradient-to-br from-white to-orange-50",
          textAccent: "text-orange-800",
        };
    }
  };

  const colors = getThemeColors();

  // Get the icon component - either from icon prop or iconName prop
  const IconComponent = service.icon || getIconComponent(service.iconName);

  return (
    <Card
      className={cn(
        "group border-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2 rounded-xl",
        service.popular && "ring-2 ring-emerald-400 shadow-lg",
        colors.borderColor,
        colors.cardBg
      )}
    >
      {service.popular && (
        <Badge
          className={cn(
            "absolute top-3 left-3 z-10 text-white font-bold px-3 py-1 rounded-full animate-pulse",
            colors.badgeBg
          )}
        >
          Most Popular
        </Badge>
      )}

      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute top-4 right-4 w-6 h-6 border-2 border-current rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-4 h-4 border-2 border-current rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute top-12 right-12 w-3 h-3 border-2 border-current rounded-full animate-pulse animation-delay-400"></div>
      </div>

      <CardHeader className="text-center pb-3 relative">
        <div
          className={cn(
            "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg",
            colors.iconBg
          )}
        >
          <IconComponent className={cn("h-8 w-8", colors.iconColor)} />
        </div>
        <CardTitle className={cn("text-xl mb-2 font-bold", colors.textAccent)}>
          {service.title}
        </CardTitle>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Rating Display */}
        <div className="flex items-center justify-center space-x-1 mt-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2 font-medium">(4.0)</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-xl p-3 border",
            colors.iconBg,
            "border-current/20"
          )}
        >
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">
              {service.duration}
            </span>
          </div>
          <span className={cn("text-xl font-bold", colors.priceColor)}>
            {service.price}
          </span>
        </div>

        <div>
          <h4 className={cn("font-bold mb-3 text-sm", colors.textAccent)}>
            What&apos;s Included:
          </h4>
          <ul className="space-y-2">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle
                  className={cn(
                    "h-4 w-4 flex-shrink-0 mt-0.5",
                    colors.checkColor
                  )}
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-sm text-gray-500 ml-6 font-medium">
                +{service.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Admin Actions */}
        <div className="flex space-x-3 pt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 font-semibold transition-all duration-200"
            onClick={() => onEdit(service)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-semibold transition-all duration-200"
            onClick={() => onDelete(service)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
