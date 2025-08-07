import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { ServiceHighlights } from "@/components/service-highlights";
import { TestimonialsPreview } from "@/components/testimonials-preview";
// import { BlogPreview } from "@/components/blog-preview"

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedProducts />
      <ServiceHighlights />
      <TestimonialsPreview />
      {/* <BlogPreview /> */}
    </div>
  );
}
