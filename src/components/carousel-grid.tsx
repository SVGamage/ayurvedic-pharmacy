import CustomCarousel, { HeroSlide } from "./custom-carousel";

export default function CarouselGrid({
  heroSlidesArray,
  compact = false,
}: {
  heroSlidesArray: HeroSlide[][];
  /** Shorter strip, for pages where the content below should reach the first screen. */
  compact?: boolean;
}) {
  const height = compact ? "h-[180px] sm:h-[220px] lg:h-[240px]" : undefined;
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 overflow-hidden ${
        compact ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"
      }`}
      aria-hidden="true"
    >
      <div className="w-full">
        <CustomCarousel heroSlides={heroSlidesArray[0]} heightClassName={height} />
      </div>
      <div className="w-full hidden lg:block">
        <CustomCarousel heroSlides={heroSlidesArray[1]} heightClassName={height} />
      </div>
      <div className="w-full hidden lg:block">
        <CustomCarousel heroSlides={heroSlidesArray[2]} heightClassName={height} />
      </div>
    </div>
  );
}
