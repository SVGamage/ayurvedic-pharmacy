"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Quote,
  MapPin,
  Calendar,
  ThumbsUp,
  CheckCircle,
} from "lucide-react";
import { Review } from "@/types/review";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  variant?: "default" | "compact" | "featured";
  className?: string;
  showAvatar?: boolean;
  showLocation?: boolean;
  showDate?: boolean;
  showHelpful?: boolean;
  showVerified?: boolean;
}

export function ReviewCard({
  review,
  variant = "default",
  className,
  showAvatar = true,
  showLocation = true,
  showDate = false,
  showHelpful = false,
  showVerified = true,
}: ReviewCardProps) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  const getThemeColors = () => {
    switch (review.category) {
      case "ayurvedic":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          treatmentColor: "text-green-600",
          quoteColor: "text-green-600",
          accentColor: "bg-green-100",
        };
      case "nakshatra":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          treatmentColor: "text-yellow-600",
          quoteColor: "text-yellow-600",
          accentColor: "bg-yellow-100",
        };
      case "product":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          treatmentColor: "text-blue-600",
          quoteColor: "text-blue-600",
          accentColor: "bg-blue-100",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          treatmentColor: "text-gray-600",
          quoteColor: "text-gray-600",
          accentColor: "bg-gray-100",
        };
    }
  };

  const colors = getThemeColors();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isCompact) {
    return (
      <Card
        className={cn(
          "group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col rounded-2xl border",
          colors.bgColor,
          colors.borderColor,
          className
        )}
      >
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start space-x-3 flex-grow">
            {showAvatar && (
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback className={colors.accentColor}>
                  {getInitials(review.name)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0 flex flex-col h-full">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
                {showVerified && review.verified && (
                  <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2 flex-grow">
                {review.text}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-xs font-medium text-gray-900">
                  {review.name}
                </p>
                {review.treatment && (
                  <Badge
                    className={cn(
                      "text-xs border-transparent",
                      colors.accentColor,
                      colors.treatmentColor
                    )}
                  >
                    {review.treatment}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden h-full flex flex-col rounded-2xl border",
        colors.bgColor,
        colors.borderColor,
        isFeatured && "lg:col-span-2 lg:row-span-2",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-60 blur-xl" />

      <CardContent
        className={cn("p-6 flex flex-col h-full", isFeatured && "p-8")}
      >
        {/* Header with avatar and rating */}
        <div className="flex items-start space-x-4 mb-4">
          {showAvatar && (
            <Avatar
              className={cn(
                "flex-shrink-0",
                isFeatured ? "h-12 w-12" : "h-10 w-10"
              )}
            >
              <AvatarImage src={review.avatar} alt={review.name} />
              <AvatarFallback className={colors.accentColor}>
                {getInitials(review.name)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4
                  className={cn(
                    "font-semibold text-gray-900",
                    isFeatured && "text-lg"
                  )}
                >
                  {review.name}
                </h4>
                {showVerified && review.verified && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      Verified
                    </span>
                  </div>
                )}
              </div>
              {showDate && review.date && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(review.date)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      isFeatured ? "h-5 w-5" : "h-4 w-4",
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({review.rating}.0)</span>
            </div>

            {showLocation && review.location && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{review.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quote and review text - This section will grow to fill available space */}
        <div className="relative mb-4 flex-grow">
          <Quote
            className={cn(
              "absolute -top-2 -left-1 opacity-30",
              colors.quoteColor,
              isFeatured ? "h-8 w-8" : "h-6 w-6"
            )}
          />
          <blockquote
            className={cn(
              "text-gray-700 italic leading-relaxed pl-6",
              isFeatured && "text-lg leading-relaxed"
            )}
          >
            {review.text}
          </blockquote>
        </div>

        {/* Footer with treatment and helpful votes - This will be pushed to bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center space-x-2">
            {review.treatment && (
              <Badge
                className={cn(
                  "font-medium border-transparent",
                  colors.accentColor,
                  colors.treatmentColor,
                  isFeatured && "px-3 py-1"
                )}
              >
                {review.treatment}
              </Badge>
            )}
          </div>

          {showHelpful && review.helpful && review.helpful > 0 && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <ThumbsUp className="h-3 w-3" />
              <span>{review.helpful} helpful</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
