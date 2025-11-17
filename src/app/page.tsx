import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { ServiceHighlights } from "@/components/service-highlights";
import { TestimonialsPreview } from "@/components/testimonials-preview";
import WelcomeNote from "@/components/welcome-note";

import {
  SectionBackground,
  AnimatedSectionDivider,
} from "@/components/background-effects";
// import { BlogPreview } from "@/components/blog-preview"

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10">
        {/* Hero Section - No background */}
        <HeroSection />

        {/* Welcome Note Section */}
        <SectionBackground variant="gradient" className="py-8">
          <WelcomeNote />
        </SectionBackground>

        <AnimatedSectionDivider />

        {/* Featured Products Section */}
        <SectionBackground variant="mesh" className="py-16">
          <FeaturedProducts />
        </SectionBackground>

        <AnimatedSectionDivider />

        {/* Service Highlights Section */}
        <SectionBackground
          variant="pattern"
          className="py-16 bg-gradient-to-b from-amber-50/30 to-orange-50/30"
        >
          <ServiceHighlights />
        </SectionBackground>

        <AnimatedSectionDivider />

        {/* Testimonials Section */}
        <SectionBackground
          variant="dots"
          className="py-16 bg-gradient-to-b from-blue-50/30 to-indigo-50/30"
        >
          <TestimonialsPreview />
        </SectionBackground>

        {/* <BlogPreview /> */}
      </div>
    </div>
  );
}
