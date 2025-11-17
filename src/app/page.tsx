import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { ServiceHighlights } from "@/components/service-highlights";
import { TestimonialsPreview } from "@/components/testimonials-preview";
import WelcomeNote from "@/components/welcome-note";
import { FallingLeaves } from "@/components/ayurvedic-effects";
// import { BlogPreview } from "@/components/blog-preview"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Ayurvedic Falling Leaves Effect */}
      <FallingLeaves count={20} />

      <div className="space-y-8 relative z-10">
        <HeroSection />
        <WelcomeNote />
        <FeaturedProducts />
        <ServiceHighlights />
        <TestimonialsPreview />
        {/* <BlogPreview /> */}
      </div>
    </div>
  );
}
