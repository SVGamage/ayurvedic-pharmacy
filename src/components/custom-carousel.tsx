"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { StaticImageData } from "next/image";

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
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative h-[300px] lg:h-[400px]">
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
      </Carousel>
    </div>
  );
}
