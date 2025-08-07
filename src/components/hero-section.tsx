import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-ayurveda.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage.src || heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </section>
  );
}
