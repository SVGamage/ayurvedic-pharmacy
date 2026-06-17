import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { ServiceHighlights } from "@/components/service-highlights";
import { TestimonialsPreview } from "@/components/testimonials-preview";
import WelcomeNote from "@/components/welcome-note";
import EmbeddedMap from "@/components/embedded-map";
import { MapPin, Phone, Smartphone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <WelcomeNote />
      <FeaturedProducts />
      <ServiceHighlights />
      <TestimonialsPreview />

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
                  Visit Our{" "}
                  <span className="text-emerald-700 italic">Pharmacy</span>
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Experience our traditional healing environment in person. Our
                  expert practitioners are ready to guide you on your wellness
                  journey.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">
                      Address
                    </h3>
                    <p className="text-stone-600">
                      Rathnadeepa Ayurvedic Pharmacy
                      <br />
                      Hambantota, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">
                      Opening Hours
                    </h3>
                    <p className="text-stone-600">
                      Monday - Saturday: 8:30 AM - 7:00 PM
                      <br />
                      Sunday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">
                      Contact Us
                    </h3>
                    <a
                      href="tel:+94702048015"
                      className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors"
                    >
                      <Smartphone className="h-4 w-4" />
                      +94 70 204 8015
                    </a>
                    <a
                      href="tel:+94473477938"
                      className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      +94 47 34 77 938
                    </a>
                    <a
                      href="mailto:rathnadeepaherbal@gmail.com"
                      className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors break-all"
                    >
                      <Mail className="h-4 w-4" />
                      rathnadeepaherbal@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                asChild
              >
                <Link href="/contact">Get Directions</Link>
              </Button>
            </div>

            <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <EmbeddedMap height="100%" className="h-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
