import { StaticImageData } from "next/image";
import CustomCarousel from "./custom-carousel";

export default function CarouselGrid({
  heroSlides,
}: {
  heroSlides: { id: number; image: StaticImageData; gradient: string }[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div className="w-full">
        <CustomCarousel heroSlides={heroSlides} />
      </div>
      <div className="w-full hidden lg:block">
        <CustomCarousel heroSlides={heroSlides} />
      </div>
      <div className="w-full hidden lg:block">
        <CustomCarousel heroSlides={heroSlides} />
      </div>
    </div>
  );
}
