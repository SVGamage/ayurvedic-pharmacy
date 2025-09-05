import CustomCarousel, { HeroSlide } from "./custom-carousel";

export default function CarouselGrid({
  heroSlidesArray,
}: {
  heroSlidesArray: HeroSlide[][];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div className="w-full">
        <CustomCarousel heroSlides={heroSlidesArray[0]} />
      </div>
      <div className="w-full hidden lg:block">
        <CustomCarousel heroSlides={heroSlidesArray[1]} />
      </div>
      <div className="w-full hidden lg:block">
        <CustomCarousel heroSlides={heroSlidesArray[2]} />
      </div>
    </div>
  );
}
