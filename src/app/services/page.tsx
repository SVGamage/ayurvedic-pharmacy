"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { Service } from "@/types/service";
import { bookServiceViaWhatsApp } from "@/lib/whatsapp";
import { formatServicePrice } from "@/config/currency";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import p10 from "@/assets/services/10.webp";
import p11 from "@/assets/services/11.webp";
import p12 from "@/assets/services/12.webp";
import p13 from "@/assets/services/13.webp";
import p14 from "@/assets/services/14.webp";
import p15 from "@/assets/services/15.webp";
import p16 from "@/assets/services/16.webp";
import CarouselGrid from "@/components/carousel-grid";
import * as Icons from "lucide-react";
import ServiceLoading, { ServiceGridSkeleton } from "@/components/service-loading";
import { HeroSlide } from "@/components/custom-carousel";

interface ApiService {
  id: string;
  title: string;
  description: string;
  price: string | number;
  features: string[];
  iconName?: string;
  category?: string;
  duration?: string;
  popular?: boolean;
  buttonText?: string;
}

const heroSlides1: HeroSlide[] = [
  {
    id: 1,
    image: p10,
    gradient: "",
  },
  {
    id: 2,
    image: p11, // Using same image for now - replace with different hero images
    gradient: "",
  },
  {
    id: 3,
    image: p12,
    gradient: "",
  },
];

const heroSlides2: HeroSlide[] = [
  {
    id: 1,
    image: p13, // Using same image for now - replace with different hero images
    gradient: "",
  },
  {
    id: 2,
    image: p14, // Using same image for now - replace with different hero images
    gradient: "",
  },
];

const heroSlides3: HeroSlide[] = [
  {
    id: 1,
    image: p15,
    gradient: "",
  },
  {
    id: 2,
    image: p16, // Using same image for now - replace with different hero images
    gradient: "",
  },
];

// Helper function to get icon component from string name
const getIconComponent = (iconName?: string) => {
  if (!iconName) return Icons.Star;

  const IconComponent = (Icons as unknown as Record<string, typeof Icons.Star>)[
    iconName
  ];
  return IconComponent || Icons.Star;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/services?limit=100"); // Get all services

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        // Convert API data to Service format with icon components
        const servicesWithIcons = data.services.map((service: ApiService) => ({
          ...service,
          icon: getIconComponent(service.iconName),
          price: formatServicePrice(
            typeof service.price === "string"
              ? parseFloat(service.price.replace(/[^\d.-]/g, ""))
              : typeof service.price === "number"
                ? service.price
                : 0
          ),
        }));

        setServices(servicesWithIcons);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services by category
  const ayurvedicServices = services.filter(
    (service) => service.category === "ayurvedic"
  );
  const nakshatraServices = services.filter(
    (service) => service.category === "nakshatra"
  );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Error Loading Services
            </h3>
            <p className="text-gray-500">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 md:pt-40">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]} />
      {/* Enhanced Header Section */}
      <ReusableHeroSection
        preTitle="Expert Care"
        titleLine1="Transformative"
        titleLine2="Wellness Services"
        subtitle="Experience holistic healing through our comprehensive Ayurvedic consultations and traditional Nakshatra services"
        description="Our expert practitioners combine ancient wisdom with modern convenience to guide you towards optimal health and spiritual well-being."
        badges={[
          "Expert Practitioners",
          "Ancient Wisdom",
          "Modern Convenience",
        ]}
        theme="green"
      />

      {/* Ayurvedic Services */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-100">
            <span className="text-sm font-medium text-emerald-700 tracking-wider uppercase">
              Healing Consultations
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
            Ayurvedic Consultation Services
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed font-light text-lg">
            Personalized healthcare solutions based on ancient Ayurvedic
            principles, tailored to restore balance and promote natural healing.
          </p>
        </div>

        {isLoading ? (
          <ServiceGridSkeleton count={4} columns={2} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ayurvedicServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showRating={true}
                rating={5}
              />
            ))}
          </div>
        )}
      </section>

      {/* Nakshatra Services */}
      <section className="bg-stone-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl border border-stone-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4 bg-amber-50 px-4 py-1 rounded-full border border-amber-100">
            <span className="text-sm font-medium text-amber-700 tracking-wider uppercase">
              Spiritual Guidance
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
            Nakshatra & Astrological Services
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed font-light text-lg">
            Traditional astrological guidance for life&apos;s important
            decisions and spiritual growth, rooted in ancient Vedic wisdom and
            cosmic understanding.
          </p>
        </div>

        {isLoading ? (
          <ServiceGridSkeleton count={4} columns={2} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nakshatraServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showRating={true}
                rating={5}
                className="bg-white"
              />
            ))}
          </div>
        )}
      </section>

      {/* Enhanced CTA Section */}
      <section className="text-center py-16">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="inline-flex items-center justify-center mb-6 bg-white px-4 py-1.5 rounded-full shadow-sm border border-stone-100">
            <span className="text-sm font-medium text-emerald-700 tracking-wider uppercase">
              Begin Your Journey
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
            Ready to Begin Your{" "}
            <span className="text-emerald-700 italic">Healing Journey?</span>
          </h2>

          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Our experienced practitioners are here to guide you towards optimal
            health and spiritual well-being. Book your consultation today and
            take the first step towards natural healing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg px-8 py-6 text-lg font-serif"
              onClick={() =>
                bookServiceViaWhatsApp(
                  "Ayurvedic Consultation",
                  formatServicePrice(5000),
                  "45 minutes"
                )
              }
            >
              Schedule Ayurvedic Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent shadow-sm px-8 py-6 text-lg font-serif"
              onClick={() =>
                bookServiceViaWhatsApp(
                  "Nakshatra Reading",
                  formatServicePrice(4000),
                  "30 minutes"
                )
              }
            >
              Book Nakshatra Reading
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
