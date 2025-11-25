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
    <section className="relative min-h-[80vh] overflow-hidden">
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
              <div className="relative min-h-[80vh]">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
                  style={{
                    backgroundImage: `url(${slide.image.src || slide.image})`,
                  }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30 z-20" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30 z-20" />
      </Carousel>

      {/* Static Content - Never changes or transitions */}
      <div className="relative z-10 min-h-[80vh] flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Natural Healing with
              <span className="text-primary"> Ayurvedic </span>
              Wisdom
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover the power of traditional Ayurvedic medicine with our
              premium quality products and expert consultations for holistic
              wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
              <Button size="lg" className="group">
                Shop Products
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
