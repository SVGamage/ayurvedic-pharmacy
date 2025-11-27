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
import Link from "next/link";

// Hero slides data with content
const heroSlides = [
  {
    id: 1,
    image: heroImage1,
  },
  {
    id: 2,
    image: heroImage2,
  },
  {
    id: 3,
    image: heroImage3,
  },
];

const staticContent = {
  tag: "NATURAL PHARMACY",
  title: "Ancient Wisdom,\nModern Healing.",
  description:
    "Experience the purest ayurvedic formulations derived from nature's finest herbs. Certified, authentic, and effective.",
  primaryButton: { text: "Shop Remedies", href: "/products" },
  secondaryButton: { text: "Learn More", href: "/about" },
};

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
    <section className="relative pt-32 md:pt-40 px-6 max-w-7xl mx-auto">
      <div className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-stone-200 group">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 h-full min-w-full">
                <div className="relative w-full h-full bg-stone-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 transition-transform duration-[2000ms] ease-out scale-105"
                    style={{
                      backgroundImage: `url(${slide.image.src || slide.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Static Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10 pointer-events-none">
            <div className="animate-fade-in-up pointer-events-auto">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-emerald-300 border border-emerald-500/30 rounded-full w-max bg-emerald-900/20 backdrop-blur-sm">
                {staticContent.tag}
              </span>
              <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4 whitespace-pre-line font-serif">
                {staticContent.title}
              </h1>
              <p className="text-stone-300 max-w-lg text-sm md:text-base leading-relaxed mb-8">
                {staticContent.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-6 text-sm font-medium tracking-wide transition-all hover:scale-105"
                  asChild
                >
                  <Link href={staticContent.primaryButton.href}>
                    {staticContent.primaryButton.text}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full px-6 py-6 text-sm font-medium tracking-wide backdrop-blur-sm transition-all hover:scale-105"
                  asChild
                >
                  <Link href={staticContent.secondaryButton.href}>
                    {staticContent.secondaryButton.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Custom Navigation Controls */}
          <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
            <div className="flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white w-8"
                      : "bg-white/30 w-4 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-4 flex items-center z-20">
            <CarouselPrevious className="relative left-0 translate-x-0 bg-white/10 backdrop-blur-md border-white/10 text-white/70 hover:bg-white/20 hover:text-white hidden md:flex h-10 w-10" />
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center z-20">
            <CarouselNext className="relative right-0 translate-x-0 bg-white/10 backdrop-blur-md border-white/10 text-white/70 hover:bg-white/20 hover:text-white hidden md:flex h-10 w-10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
