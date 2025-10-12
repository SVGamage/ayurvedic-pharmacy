"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Clock,
  Star,
  MessageCircle,
  Heart,
  Share2,
  Info,
} from "lucide-react";
import { Service } from "@/types/service";
import { cn } from "@/lib/utils";
import { bookServiceViaWhatsApp } from "@/lib/whatsapp";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact" | "featured";
  className?: string;
  showRating?: boolean;
  rating?: number;
}

export function ServiceCard({
  service,
  variant = "default",
  className,
  showRating = false,
  rating = 0,
}: ServiceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  // Create component reference for icon
  const IconComponent = service.icon;

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const getThemeColors = () => {
    switch (service.category) {
      case "ayurvedic":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          priceColor: "text-green-600",
          checkColor: "text-green-600",
          buttonBg: "bg-green-600 hover:bg-green-700",
          ringColor: "ring-green-500",
          badgeBg: "bg-green-600",
          borderColor: "border-green-200 hover:border-green-300",
          glowColor: "hover:shadow-green-200/25",
          ringGlow: "hover:ring-green-100",
        };
      case "nakshatra":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          priceColor: "text-yellow-600",
          checkColor: "text-yellow-600",
          buttonBg: "bg-yellow-600 hover:bg-yellow-700",
          ringColor: "ring-yellow-500",
          badgeBg: "bg-yellow-600",
          borderColor: "border-yellow-200 hover:border-yellow-300",
          glowColor: "hover:shadow-yellow-200/25",
          ringGlow: "hover:ring-yellow-100",
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          priceColor: "text-blue-600",
          checkColor: "text-blue-600",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          ringColor: "ring-blue-500",
          badgeBg: "bg-blue-600",
          borderColor: "border-blue-200 hover:border-blue-300",
          glowColor: "hover:shadow-blue-200/25",
          ringGlow: "hover:ring-blue-100",
        };
    }
  };

  const colors = getThemeColors();

  const handleBookClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Route to WhatsApp Business for booking
    bookServiceViaWhatsApp(service.title, service.price, service.duration);
  };

  if (isCompact) {
    return (
      <>
        <Card
          className={cn(
            "group border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative hover:ring-2 hover:ring-opacity-50",
            service.popular && "ring-2",
            service.popular && colors.ringColor,
            colors.borderColor,
            colors.glowColor,
            colors.ringGlow,
            className
          )}
          onClick={handleCardClick}
        >
          {service.popular && (
            <Badge className={cn("absolute top-3 left-3 z-10", colors.badgeBg)}>
              Most Popular
            </Badge>
          )}
          <CardHeader className="text-center pb-3">
            <div
              className={cn(
                "mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3",
                colors.iconBg
              )}
            >
              {IconComponent && (
                <IconComponent className={cn("h-6 w-6", colors.iconColor)} />
              )}
            </div>
            <CardTitle className="text-lg mb-1">{service.title}</CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">
              {service.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-600">
                  {service.duration}
                </span>
              </div>
              <span className={cn("text-lg font-bold", colors.priceColor)}>
                {service.price}
              </span>
            </div>

            {showRating && rating > 0 && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({rating}.0)</span>
              </div>
            )}

            <Button
              onClick={handleBookClick}
              className={cn("w-full text-sm", colors.buttonBg)}
              size="sm"
            >
              {service.buttonText || "Book via WhatsApp"}
              <MessageCircle className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Service Details Dialog for Compact */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                {service.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Service Icon and Basic Info */}
              <div className="text-center">
                <div
                  className={cn(
                    "mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4",
                    colors.iconBg
                  )}
                >
                  {IconComponent && (
                    <IconComponent
                      className={cn("h-10 w-10", colors.iconColor)}
                    />
                  )}
                </div>

                {service.popular && (
                  <Badge className={cn("mb-3", colors.badgeBg)}>
                    Most Popular Service
                  </Badge>
                )}

                <p className="text-gray-600 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Service Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">Duration</span>
                    </div>
                    <span className="font-semibold">{service.duration}</span>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Price</span>
                    <span
                      className={cn("text-2xl font-bold", colors.priceColor)}
                    >
                      {service.price}
                    </span>
                  </div>

                  {showRating && rating > 0 && (
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">({rating}.0)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">
                    What&apos;s Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle
                          className={cn(
                            "h-4 w-4 flex-shrink-0 mt-0.5",
                            colors.checkColor
                          )}
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  className={cn("w-full", colors.buttonBg)}
                  onClick={() => handleBookClick()}
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {service.buttonText || "Book via WhatsApp"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      // Add to favorites functionality
                      console.log("Added to favorites:", service.title);
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      // Share functionality
                      if (navigator.share) {
                        navigator.share({
                          title: service.title,
                          text: `Check out this amazing Ayurvedic service: ${service.title}`,
                          url: window.location.href,
                        });
                      } else {
                        // Fallback: copy to clipboard
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Additional Service Information */}
              <div
                className={cn(
                  "p-4 rounded-lg",
                  colors.iconBg.replace("100", "50")
                )}
              >
                <div className="flex items-start space-x-2">
                  <Info className={cn("h-5 w-5 mt-0.5", colors.iconColor)} />
                  <div>
                    <h5
                      className={cn(
                        "font-semibold mb-1",
                        colors.iconColor.replace("600", "800")
                      )}
                    >
                      Service Information
                    </h5>
                    <p
                      className={cn(
                        "text-sm",
                        colors.iconColor.replace("600", "700")
                      )}
                    >
                      This is a professional Ayurvedic service. For personalized
                      consultation and scheduling, please contact us via
                      WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Card
        className={cn(
          "group border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden hover:ring-2 hover:ring-opacity-50 cursor-pointer",
          service.popular && "ring-2",
          service.popular && colors.ringColor,
          colors.borderColor,
          colors.glowColor,
          colors.ringGlow,
          isFeatured && "lg:col-span-2",
          className
        )}
        onClick={handleCardClick}
      >
        {service.popular && (
          <Badge className={cn("absolute top-4 left-4 z-10", colors.badgeBg)}>
            Most Popular
          </Badge>
        )}

        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 opacity-50" />

        <CardHeader className="text-center pb-4 relative">
          <div
            className={cn(
              "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
              colors.iconBg
            )}
          >
            {IconComponent && (
              <IconComponent className={cn("h-8 w-8", colors.iconColor)} />
            )}
          </div>
          <CardTitle className="text-xl mb-2 group-hover:text-gray-900 transition-colors">
            {service.title}
          </CardTitle>
          <p className="text-gray-600">{service.description}</p>

          {showRating && rating > 0 && (
            <div className="flex items-center justify-center space-x-1 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({rating}.0 rating)
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{service.duration}</span>
            </div>
            <span className={cn("text-2xl font-bold", colors.priceColor)}>
              {service.price}
            </span>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900">
              {isFeatured ? "Everything Included:" : "What's Included:"}
            </h4>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle
                    className={cn(
                      "h-4 w-4 flex-shrink-0 mt-0.5",
                      colors.checkColor
                    )}
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={handleBookClick}
            className={cn(
              "w-full group-hover:shadow-lg transition-all duration-300",
              colors.buttonBg
            )}
            size="lg"
          >
            {service.buttonText || "Book via WhatsApp"}
            <MessageCircle className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      {/* Service Details Dialog for Main Card */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              {service.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Service Icon and Basic Info */}
            <div className="text-center">
              <div
                className={cn(
                  "mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4",
                  colors.iconBg
                )}
              >
                {IconComponent && (
                  <IconComponent
                    className={cn("h-12 w-12", colors.iconColor)}
                  />
                )}
              </div>

              {service.popular && (
                <Badge className={cn("mb-4", colors.badgeBg)}>
                  Most Popular Service
                </Badge>
              )}

              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                {service.description}
              </p>
            </div>

            {/* Service Details Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600 font-medium">Duration</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {service.duration}
                  </span>
                </div>

                <div
                  className={cn(
                    "rounded-lg p-4",
                    colors.iconBg.replace("100", "50")
                  )}
                >
                  <span className="text-gray-600 font-medium block mb-2">
                    Price
                  </span>
                  <span className={cn("text-3xl font-bold", colors.priceColor)}>
                    {service.price}
                  </span>
                </div>

                {showRating && rating > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600 font-medium block mb-2">
                      Rating
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-lg">
                        ({rating}.0)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-4 text-gray-900 text-lg">
                  {isFeatured
                    ? "Everything Included:"
                    : "What&apos;s Included:"}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2 bg-white rounded-lg p-3 border border-gray-100"
                    >
                      <CheckCircle
                        className={cn(
                          "h-5 w-5 flex-shrink-0 mt-0.5",
                          colors.checkColor
                        )}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <Button
                className={cn("w-full", colors.buttonBg)}
                onClick={() => handleBookClick()}
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {service.buttonText || "Book via WhatsApp"}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    // Add to favorites functionality
                    console.log("Added to favorites:", service.title);
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: service.title,
                        text: `Check out this amazing Ayurvedic service: ${service.title}`,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Additional Service Information */}
            <div
              className={cn(
                "p-4 rounded-lg",
                colors.iconBg.replace("100", "50")
              )}
            >
              <div className="flex items-start space-x-3">
                <Info className={cn("h-6 w-6 mt-0.5", colors.iconColor)} />
                <div>
                  <h5
                    className={cn(
                      "font-semibold mb-2",
                      colors.iconColor.replace("600", "800")
                    )}
                  >
                    Service Information
                  </h5>
                  <p
                    className={cn(
                      "text-sm leading-relaxed",
                      colors.iconColor.replace("600", "700")
                    )}
                  >
                    This is a professional Ayurvedic service provided by
                    certified practitioners. For personalized consultation,
                    detailed scheduling, and any specific requirements, please
                    contact us via WhatsApp. Our team will ensure you receive
                    the best care tailored to your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
