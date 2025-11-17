"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.png";
import heroImage3 from "@/assets/hero-3.jpg";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

// Hero slides data - only background images and gradients change
const heroSlides = [
  {
    id: 1,
    image: heroImage1,
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 2,
    image: heroImage2, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 3,
    image: heroImage3, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] overflow-hidden">
      {/* Background Carousel - Only images change */}
      <Carousel
        setApi={setApi}
        className="w-full h-full absolute inset-0"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative min-h-[85vh] lg:min-h-[90vh]">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
                  style={{
                    backgroundImage: `url(${slide.image.src || slide.image})`,
                  }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />
                {/* Additional overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all z-20 shadow-xl" />
        <CarouselNext className="right-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all z-20 shadow-xl" />
      </Carousel>

      {/* Static Content - Never changes or transitions */}
      <div className="relative z-10 min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white text-sm font-medium shadow-lg">
                🌿 Trusted Since 1995
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-2xl">
              Natural Healing with
              <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent"> Ayurvedic </span>
              Wisdom
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-lg">
              Discover the power of traditional Ayurvedic medicine with our
              premium quality products and expert consultations for holistic
              wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Button size="lg" className="group bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 shadow-2xl shadow-green-900/30 hover:shadow-green-900/50 hover:scale-105 transition-all text-base lg:text-lg px-8 py-6">
                Shop Products
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 shadow-xl hover:scale-105 transition-all text-base lg:text-lg px-8 py-6"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-3 bg-white shadow-lg"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
