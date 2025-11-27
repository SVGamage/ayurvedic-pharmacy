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
          "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col bg-white border-stone-200",
          className
        )}
      >
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start space-x-3 flex-grow">
            {showAvatar && (
              <Avatar className="h-10 w-10 flex-shrink-0 border border-stone-100">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback className="bg-emerald-50 text-emerald-700">
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
                        ? "text-amber-400 fill-current"
                        : "text-stone-200"
                    )}
                  />
                ))}
                {showVerified && review.verified && (
                  <CheckCircle className="h-3 w-3 text-emerald-500 ml-1" />
                )}
              </div>
              <p className="text-sm text-stone-600 mb-2 line-clamp-2 flex-grow">
                {review.text}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-xs font-medium text-stone-900">
                  {review.name}
                </p>
                {review.treatment && (
                  <Badge
                    variant="outline"
                    className="text-[10px] border-stone-200 text-stone-500 font-normal"
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
        "group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden h-full flex flex-col bg-white border-stone-200",
        isFeatured && "lg:col-span-2 lg:row-span-2",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-50" />

      <CardContent
        className={cn("p-6 flex flex-col h-full", isFeatured && "p-8")}
      >
        {/* Header with avatar and rating */}
        <div className="flex items-start space-x-4 mb-4">
          {showAvatar && (
            <Avatar
              className={cn(
                "flex-shrink-0 border border-stone-100",
                isFeatured ? "h-12 w-12" : "h-10 w-10"
              )}
            >
              <AvatarImage src={review.avatar} alt={review.name} />
              <AvatarFallback className="bg-emerald-50 text-emerald-700 font-medium">
                {getInitials(review.name)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4
                  className={cn(
                    "font-serif font-semibold text-stone-900",
                    isFeatured ? "text-lg" : "text-base"
                  )}
                >
                  {review.name}
                </h4>
                {showVerified && review.verified && (
                  <div className="flex items-center space-x-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    <span className="text-[10px] text-emerald-700 font-medium uppercase tracking-wide">
                      Verified
                    </span>
                  </div>
                )}
              </div>
              {showDate && review.date && (
                <div className="flex items-center space-x-1 text-xs text-stone-400">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(review.date)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      isFeatured ? "h-4 w-4" : "h-3.5 w-3.5",
                      i < review.rating
                        ? "text-amber-400 fill-current"
                        : "text-stone-200"
                    )}
                  />
                ))}
              </div>
            </div>

            {showLocation && review.location && (
              <div className="flex items-center space-x-1 text-xs text-stone-500">
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
              "absolute -top-2 -left-1 opacity-10 text-emerald-800",
              isFeatured ? "h-8 w-8" : "h-6 w-6"
            )}
          />
          <blockquote
            className={cn(
              "text-stone-600 italic leading-relaxed pl-6 relative z-10",
              isFeatured && "text-lg leading-relaxed"
            )}
          >
            {review.text}
          </blockquote>
        </div>

        {/* Footer with treatment and helpful votes - This will be pushed to bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
          <div className="flex items-center space-x-2">
            {review.treatment && (
              <Badge
                variant="secondary"
                className={cn(
                  "font-normal bg-stone-100 text-stone-600 hover:bg-stone-200",
                  isFeatured && "px-3 py-1"
                )}
              >
                {review.treatment}
              </Badge>
            )}
          </div>

          {showHelpful && review.helpful && review.helpful > 0 && (
            <div className="flex items-center space-x-1 text-xs text-stone-500">
              <ThumbsUp className="h-3 w-3" />
              <span>{review.helpful} helpful</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
