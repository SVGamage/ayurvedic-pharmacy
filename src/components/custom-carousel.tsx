"use client";

import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image, { StaticImageData } from "next/image";
import { Skeleton } from "./ui/skeleton";

export interface HeroSlide {
  id: number;
  image: StaticImageData;
  gradient: string;
}

export default function CustomCarousel({
  heroSlides,
}: {
  heroSlides: HeroSlide[];
}) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      {/* Background Carousel - Only images change */}
      <Carousel
        className="w-full"
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
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative h-[300px] lg:h-[400px]">
                {/* Skeleton loading placeholder */}
                {!loadedImages.has(slide.id) && (
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                )}

                {/* Optimized Next.js Image */}
                <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-opacity duration-500 ${
                    loadedImages.has(slide.id) ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index === 0}
                  placeholder="blur"
                  onLoad={() => handleImageLoad(slide.id)}
                />

                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
