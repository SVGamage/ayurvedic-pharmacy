"use client";

import { useState } from "react";
import Image from "next/image";
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
  Sparkles,
  Leaf,
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
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = variant === "featured";

  const IconComponent = service.icon;

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleBookClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    bookServiceViaWhatsApp(service.title, service.price, service.duration);
  };

  const categoryLabel =
    service.category === "ayurvedic"
      ? "Ayurvedic Therapy"
      : service.category === "nakshatra"
        ? "Nakshatra Vana"
        : "Wellness";

  return (
    <>
      <div
        className={cn(
          "group relative cursor-pointer",
          isFeatured ? "lg:col-span-2" : "",
          className,
        )}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with Layered Shadow Effect */}
        <div className="relative bg-gradient-to-b from-white to-stone-50/80 rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 border border-stone-200/60 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15),0_8px_20px_-8px_rgba(0,0,0,0.08)]">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50/80 to-transparent pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-stone-100/50 to-transparent pointer-events-none z-0" />

          {/* Image/Icon Section */}
          <div className="relative">
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center">
              {/* Show Image if available, otherwise show Icon */}
              {service.image ? (
                <>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              ) : (
                <>
                  {/* Animated Background Pattern (only when no image) */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-200/40 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-125 delay-100" />
                  </div>

                  {/* Icon Container */}
                  <div className="relative z-[1] transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    <div className="relative">
                      {/* Glow effect behind icon */}
                      <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {IconComponent && (
                        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg shadow-emerald-500/10 border border-white/50">
                          <IconComponent
                            className="h-16 w-16 text-emerald-600"
                            strokeWidth={1.5}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}

              {/* Popular Badge - Top Left */}
              {service.popular && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg shadow-emerald-500/25">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Duration Badge - Top Right */}
              <div className="absolute top-4 right-4 z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-2xl" />
                  <div className="relative px-3 py-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span className="text-sm font-semibold text-stone-700">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Badge - Bottom Left */}
              {showRating && rating > 0 && (
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-stone-700">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-5 pt-4">
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Leaf className="w-3 h-3" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Service Title */}
            <h4 className="font-serif text-xl font-semibold text-stone-800 tracking-tight mb-3 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors duration-300">
              {service.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-stone-600 line-clamp-2 mb-4 leading-relaxed">
              {service.description}
            </p>

            {/* Features Preview */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-2 mb-4">
                {service.features.slice(0, 2).map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-stone-600"
                  >
                    <div className="mt-0.5 p-0.5 rounded-full bg-emerald-100">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
                {service.features.length > 2 && (
                  <p className="text-xs text-emerald-600 pl-6 font-semibold">
                    +{service.features.length - 2} more included
                  </p>
                )}
              </div>
            )}

            {/* Price & CTA Section */}
            <div className="pt-4 border-t border-stone-100">
              {/* Price Display */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                    Starting at
                  </span>
                  <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:shadow-xl group/btn"
                onClick={handleBookClick}
              >
                <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Book Appointment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] bg-gradient-to-br from-white to-stone-50 border-0 p-0 gap-0 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2 max-h-[90vh] overflow-y-auto md:overflow-hidden scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Left Column: Visual & Key Info */}
            <div className="relative bg-gradient-to-br from-stone-100 to-stone-50 flex flex-col border-b md:border-b-0 md:border-r border-stone-200 overflow-hidden">
              {/* Image or Icon Section */}
              {service.image ? (
                <div className="relative h-44 min-h-[176px] sm:h-52 sm:min-h-[208px] md:h-64 flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* Badges over image */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 z-10 flex-wrap">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-white bg-emerald-600/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                      <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                        {categoryLabel}
                      </span>
                    </div>
                    {service.popular && (
                      <Badge className="bg-amber-500/90 backdrop-blur-sm text-white border-0 text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Price overlay on image - mobile only */}
                  <div className="absolute bottom-3 right-3 z-10 sm:hidden">
                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-stone-500" />
                        <span className="text-xs font-medium text-stone-700">
                          {service.duration}
                        </span>
                      </div>
                      <span className="text-base font-bold text-emerald-600">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative flex-shrink-0">
                  {/* Decorative Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/3 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-emerald-200/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/3 w-24 sm:w-32 h-24 sm:h-32 bg-amber-200/20 rounded-full blur-2xl" />
                  </div>

                  <div className="relative z-10 p-4 sm:p-6 md:p-8">
                    {/* Badges */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                        <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                          {categoryLabel}
                        </span>
                      </div>
                      {service.popular && (
                        <Badge
                          variant="outline"
                          className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] sm:text-xs"
                        >
                          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>

                    {/* Icon Display */}
                    <div className="flex items-center justify-center py-4 sm:py-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full scale-150" />
                        {IconComponent && (
                          <div className="relative bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl shadow-emerald-500/10 border border-white/80">
                            <IconComponent
                              className="h-10 w-10 sm:h-16 sm:w-16 text-emerald-600"
                              strokeWidth={1}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price info - mobile only when no image */}
                    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 sm:hidden">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-stone-500" />
                        <span className="text-xs font-medium text-stone-700">
                          {service.duration}
                        </span>
                      </div>
                      <span className="text-base font-bold text-emerald-600">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons - Hidden on mobile, shown on md+ */}
              <div
                className={cn(
                  "hidden md:block relative z-10 space-y-2 p-4 sm:p-6 mt-auto",
                )}
              >
                <Button
                  onClick={handleBookClick}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 group text-sm sm:text-base"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-transform group-hover:scale-110" />
                  Book Appointment
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-emerald-700 hover:border-emerald-200 rounded-lg sm:rounded-xl py-4 sm:py-5 font-semibold transition-all duration-300 text-xs sm:text-sm"
                  >
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />{" "}
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-emerald-700 hover:border-emerald-200 rounded-lg sm:rounded-xl py-4 sm:py-5 font-semibold transition-all duration-300 text-xs sm:text-sm"
                  >
                    <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />{" "}
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col bg-white md:overflow-y-auto md:max-h-[90vh]">
              <DialogHeader className="mb-3 sm:mb-4 text-left">
                <DialogTitle className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 mb-2 sm:mb-3 leading-tight tracking-tight">
                  {service.title}
                </DialogTitle>
                {/* Duration & Price - visible on sm+ */}
                <div className="hidden sm:flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-100 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-stone-500" />
                    <span className="text-xs sm:text-sm font-medium text-stone-700">
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="text-[10px] sm:text-xs font-medium text-stone-400 uppercase tracking-wider">
                      Price:
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-emerald-600 tracking-tight">
                      {service.price}
                    </span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-5 flex-grow">
                {/* About Section */}
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-stone-800 mb-1.5 sm:mb-2">
                    About this Service
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* What's Included */}
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-stone-800 mb-1.5 sm:mb-2">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 sm:gap-2.5 text-stone-600"
                      >
                        <div className="mt-0.5 p-0.5 rounded-full bg-emerald-100 flex-shrink-0">
                          <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Note */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-100">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="p-1 sm:p-1.5 rounded-lg flex-shrink-0">
                      <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 text-xs sm:text-sm mb-0.5">
                        Important Note
                      </h4>
                      <p className="text-[10px] sm:text-xs text-emerald-800/80 leading-relaxed">
                        Consultation with our Ayurvedic doctor is recommended
                        before booking specific therapies. Please arrive 10
                        minutes early for your appointment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Action Buttons - Only visible on mobile */}
              <div className="md:hidden mt-4 pt-4 border-t border-stone-100 space-y-2 pb-[env(safe-area-inset-bottom)]">
                <Button
                  onClick={handleBookClick}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold h-12 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 group text-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                  Book Appointment
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg h-10 font-medium transition-all duration-300 text-xs"
                  >
                    <Heart className="h-3.5 w-3.5 mr-1.5" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg h-10 font-medium transition-all duration-300 text-xs"
                  >
                    <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
