"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceCard, getServiceIcon } from "@/components/service-card";
import { Service } from "@/types/service";
import { contactViaWhatsApp } from "@/lib/whatsapp";
import { WhatsAppHandoffNote } from "@/components/whatsapp-handoff-note";
import { cn } from "@/lib/utils";
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
import { ServiceGridSkeleton } from "@/components/service-loading";
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
    image: p11,
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
    image: p13,
    gradient: "",
  },
  {
    id: 2,
    image: p14,
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
    image: p16,
    gradient: "",
  },
];

const toPriceLabel = (price: ApiService["price"]) => {
  const amount =
    typeof price === "number"
      ? price
      : parseFloat(String(price ?? "").replace(/[^\d.-]/g, ""));
  // A missing or broken price shouldn't render as "From Rs. NaN".
  return Number.isFinite(amount) && amount > 0
    ? formatServicePrice(amount)
    : "Price on request";
};

function ServiceSection({
  id,
  services,
  linkedServiceId,
  onLinkedClose,
  emptyText,
  cardClassName,
}: {
  id: string;
  services: Service[];
  linkedServiceId: string | null;
  onLinkedClose: () => void;
  emptyText: string;
  cardClassName?: string;
}) {
  if (services.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-stone-200 bg-white px-6 py-8 text-center">
        <p className="mb-4 text-stone-600">{emptyText}</p>
        <Button
          onClick={() => contactViaWhatsApp(id === "nakshatra" ? "Nakshatra services" : "Ayurvedic consultations")}
          className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
        >
          <Icons.MessageCircle className="mr-2 h-4 w-4" />
          Ask us on WhatsApp
        </Button>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:gap-8",
        services.length === 1 ? "mx-auto max-w-xl" : "md:grid-cols-2",
      )}
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          showRating={true}
          rating={5}
          className={cardClassName}
          defaultOpen={service.id === linkedServiceId}
          onDialogClose={
            service.id === linkedServiceId ? onLinkedClose : undefined
          }
        />
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkedServiceId, setLinkedServiceId] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/admin/services?limit=100");
      if (!response.ok) {
        throw new Error(`Services request failed (${response.status})`);
      }
      const data = await response.json();
      setServices(
        data.services.map((service: ApiService) => ({
          ...service,
          icon: getServiceIcon(service.iconName),
          price: toPriceLabel(service.price),
        })),
      );
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(
        "We couldn't load the services. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setLinkedServiceId(
      new URLSearchParams(window.location.search).get("service"),
    );
    fetchServices();
  }, [fetchServices]);

  const closeLinkedService = () => {
    setLinkedServiceId(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const ayurvedicServices = services.filter(
    (service) => service.category === "ayurvedic",
  );
  const nakshatraServices = services.filter(
    (service) => service.category === "nakshatra",
  );

  const scrollTo = (id: string) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const errorState = (
    <div className="rounded-2xl border border-red-200 bg-red-50/60 px-6 py-10 text-center">
      <Icons.AlertCircle
        className="mx-auto mb-3 h-8 w-8 text-red-600"
        aria-hidden="true"
      />
      <h3 className="mb-1 font-serif text-lg font-semibold text-stone-800">
        Services didn&apos;t load
      </h3>
      <p className="mb-4 text-stone-700">{error}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={fetchServices}
          className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
        >
          Try again
        </Button>
        <Button
          variant="outline"
          onClick={() => contactViaWhatsApp("Booking a consultation")}
          className="rounded-full border-stone-300 px-6"
        >
          Ask us on WhatsApp
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pt-36">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid
        heroSlidesArray={[heroSlides1, heroSlides2, heroSlides3]}
        compact
      />
      <ReusableHeroSection
        preTitle="Expert Care"
        titleLine1="Transformative"
        titleLine2="Wellness Services"
        subtitle={[
          "You can now access Ayurvedic treatments, consultation services, and all the traditional Nakshatra services you need - all in one place.",
          "අපගේ ආයුර්වේද සත්කාරයක්, උපදේශන සේවාවන් සහ ඔබට අවශ්‍ය සියළුම නැකත් සේවාවන් දැන් එකම ස්ථානයකින් ලබාගත හැක.",
        ]}
        theme="green"
        compact
      />

      {/* Jump links to each kind of service */}
      <nav
        aria-label="Service types"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        <a
          href="#ayurvedic"
          className="inline-flex min-h-10 items-center rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:border-emerald-400 hover:bg-stone-50"
        >
          Ayurvedic consultations
        </a>
        <a
          href="#nakshatra"
          className="inline-flex min-h-10 items-center rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:border-emerald-400 hover:bg-stone-50"
        >
          Nakshatra services
        </a>
      </nav>

      {error ? (
        <div className="mb-16">{errorState}</div>
      ) : (
        <>
          {/* Ayurvedic Services */}
          <section id="ayurvedic" className="mb-16 scroll-mt-28">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-4 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-100">
                <span className="text-sm font-medium text-emerald-800 tracking-wider uppercase">
                  Healing Consultations
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
                Ayurvedic Consultation Services
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed text-lg">
                Personalized healthcare solutions based on ancient Ayurvedic
                principles, tailored to restore balance and promote natural
                healing.
              </p>
            </div>

            {isLoading ? (
              <ServiceGridSkeleton count={2} columns={2} />
            ) : (
              <ServiceSection
                id="ayurvedic"
                services={ayurvedicServices}
                linkedServiceId={linkedServiceId}
                onLinkedClose={closeLinkedService}
                emptyText="Consultations aren't listed online right now, but you can still book one."
              />
            )}
          </section>

          {/* Nakshatra Services */}
          <section
            id="nakshatra"
            className="scroll-mt-28 bg-stone-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl border border-stone-100"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-4 bg-amber-50 px-4 py-1 rounded-full border border-amber-100">
                <span className="text-sm font-medium text-amber-800 tracking-wider uppercase">
                  Spiritual Guidance
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
                Nakshatra & Astrological Services
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed text-lg">
                Traditional astrological guidance for life&apos;s important
                decisions and spiritual growth, rooted in ancient Vedic wisdom
                and cosmic understanding.
              </p>
            </div>

            {isLoading ? (
              <ServiceGridSkeleton count={2} columns={2} />
            ) : (
              <ServiceSection
                id="nakshatra"
                services={nakshatraServices}
                linkedServiceId={linkedServiceId}
                onLinkedClose={closeLinkedService}
                emptyText="Nakshatra readings aren't listed online right now, but you can still ask for one."
                cardClassName="bg-white"
              />
            )}
          </section>
        </>
      )}

      {/* Not sure which to book? */}
      <section className="text-center py-16">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
          Not sure which to{" "}
          <span className="text-emerald-700 italic">book?</span>
        </h2>
        <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Tell us what you need on WhatsApp and we&apos;ll suggest the right
          consultation or reading.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="min-h-12 rounded-full bg-emerald-600 px-8 text-white hover:bg-emerald-700"
            onClick={() => contactViaWhatsApp("Choosing a service")}
          >
            <Icons.MessageCircle className="mr-2 h-5 w-5" />
            Ask us on WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 rounded-full border-stone-300 px-8"
            onClick={() => scrollTo("ayurvedic")}
          >
            See consultations
          </Button>
        </div>
        <WhatsAppHandoffNote
          kind="booking"
          className="mx-auto mt-6 max-w-md text-left"
        />
      </section>
    </div>
  );
}
