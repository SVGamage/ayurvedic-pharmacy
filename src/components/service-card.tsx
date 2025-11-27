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
  ArrowRight,
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

  const handleBookClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    bookServiceViaWhatsApp(service.title, service.price, service.duration);
  };

  // Common card content for reuse
  const CardBody = () => (
    <>
      <div className="relative h-48 overflow-hidden bg-stone-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors duration-500">
        {service.popular && (
          <Badge className="absolute top-3 left-3 z-10 bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md">
            Most Popular
          </Badge>
        )}

        <div className="transform transition-transform duration-500 group-hover:scale-110">
          {IconComponent && (
            <IconComponent
              className="h-20 w-20 text-emerald-600/80"
              strokeWidth={1.5}
            />
          )}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <Badge
            variant="outline"
            className="text-xs font-normal text-stone-500 border-stone-200"
          >
            {service.category === "ayurvedic"
              ? "Ayurvedic Therapy"
              : service.category === "nakshatra"
                ? "Nakshatra Vana"
                : "Wellness"}
          </Badge>
          {showRating && rating > 0 && (
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs font-medium text-stone-600">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <CardTitle className="font-serif text-xl text-stone-800 group-hover:text-emerald-700 transition-colors">
          {service.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-stone-600 line-clamp-2 min-h-[2.5rem]">
          {service.description}
        </p>

        {/* Features Preview */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-1.5 pt-1">
            {service.features.slice(0, 2).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-stone-600"
              >
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
            {service.features.length > 2 && (
              <p className="text-xs text-emerald-600 pl-5.5 font-medium">
                +{service.features.length - 2} more included
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div className="flex items-center text-stone-500 text-sm">
            <Clock className="h-4 w-4 mr-1.5" />
            {service.duration}
          </div>
          <div className="font-serif text-lg font-bold text-emerald-700">
            {service.price}
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleBookClick}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-300 group-hover:translate-y-[-2px]"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </div>
      </CardContent>
    </>
  );

  return (
    <>
      <Card
        className={cn(
          "group bg-white border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1",
          isFeatured ? "lg:col-span-2" : "",
          className
        )}
        onClick={handleCardClick}
      >
        <CardBody />
      </Card>

      {/* Service Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white border-none shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left Column: Visual & Key Info */}
            <div className="bg-stone-50 p-6 flex flex-col justify-between border-r border-stone-100">
              <div>
                <div className="flex items-center justify-center h-48 bg-white rounded-2xl shadow-sm mb-6">
                  {IconComponent && (
                    <IconComponent
                      className="h-24 w-24 text-emerald-600"
                      strokeWidth={1}
                    />
                  )}
                </div>

                <DialogHeader className="mb-6 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none">
                      {service.category}
                    </Badge>
                    {service.popular && (
                      <Badge
                        variant="outline"
                        className="border-amber-200 text-amber-700 bg-amber-50"
                      >
                        Popular
                      </Badge>
                    )}
                  </div>
                  <DialogTitle className="font-serif text-3xl text-stone-800 mb-2">
                    {service.title}
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-700">
                      {service.price}
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleBookClick}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg shadow-lg shadow-emerald-100"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Book Appointment
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-stone-200 text-stone-600 hover:bg-stone-50"
                  >
                    <Heart className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-stone-200 text-stone-600 hover:bg-stone-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="p-6 md:p-8 bg-white">
              <div className="prose prose-stone max-w-none">
                <h3 className="font-serif text-xl text-stone-800 mb-3">
                  About this Service
                </h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <h3 className="font-serif text-xl text-stone-800 mb-3">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-stone-600"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-medium text-emerald-900 text-sm mb-1">
                        Important Note
                      </h4>
                      <p className="text-xs text-emerald-800/80 leading-relaxed">
                        Consultation with our Ayurvedic doctor is recommended
                        before booking specific therapies. Please arrive 10
                        minutes early for your appointment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
