"use client";
import { Button } from "@/components/ui/button";
import { Stethoscope, Video, Star, Calendar, Users, Award } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { Service } from "@/types/service";
import { bookServiceViaWhatsApp } from "@/lib/whatsapp";
import { formatServicePrice } from "@/config/currency";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.png";
import heroImage3 from "@/assets/hero-3.jpg";
import CarouselGrid from "@/components/carousel-grid";

const heroSlides = [
  {
    id: 1,
    image: heroImage1,
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 2,
    image: heroImage2, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 3,
    image: heroImage3, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
];

const ayurvedicServices: Service[] = [
  {
    id: "in-person-consultation",
    title: "In-Person Consultation",
    icon: Stethoscope,
    duration: "60 minutes",
    price: formatServicePrice(7500),
    description:
      "Comprehensive health assessment with our experienced Ayurvedic doctors in a traditional clinical setting.",
    features: [
      "Complete health evaluation",
      "Pulse diagnosis (Nadi Pariksha)",
      "Personalized treatment plan",
      "Prescription medicines",
      "Dietary recommendations",
      "Follow-up support",
    ],
    popular: true,
    category: "ayurvedic",
    buttonText: "Book In-Person Visit",
  },
  {
    id: "online-consultation",
    title: "Online Consultation",
    icon: Video,
    duration: "45 minutes",
    price: formatServicePrice(5000),
    description:
      "Get expert Ayurvedic advice from the comfort of your home through secure video consultations.",
    features: [
      "Video consultation",
      "Digital prescriptions",
      "Health monitoring",
      "24/7 chat support",
      "Medicine delivery",
      "Progress tracking",
    ],
    popular: false,
    category: "ayurvedic",
    buttonText: "Book Online Session",
  },
];

const nakshatraServices: Service[] = [
  {
    id: "horoscope-reading",
    title: "Personal Horoscope Reading",
    icon: Star,
    duration: "45 minutes",
    price: formatServicePrice(6000),
    description:
      "Detailed analysis of your birth chart and comprehensive life predictions based on Vedic astrology.",
    features: [
      "Complete birth chart analysis",
      "Life predictions",
      "Career guidance",
      "Relationship compatibility",
      "Health insights",
      "Remedial measures",
    ],
    category: "nakshatra",
    buttonText: "Book Reading",
  },
  {
    id: "wedding-calculations",
    title: "Wedding & Event Calculations",
    icon: Calendar,
    duration: "30 minutes",
    price: formatServicePrice(4000),
    description:
      "Find the most auspicious dates and times for your special events and important life ceremonies.",
    features: [
      "Muhurat calculation",
      "Auspicious date selection",
      "Time recommendations",
      "Ritual guidance",
      "Compatibility analysis",
      "Custom ceremonies",
    ],
    category: "nakshatra",
    buttonText: "Calculate Dates",
  },
  {
    id: "name-selection",
    title: "Newborn Name Selection",
    icon: Users,
    duration: "30 minutes",
    price: formatServicePrice(3500),
    description:
      "Choose the perfect name for your newborn based on precise astrological calculations and traditions.",
    features: [
      "Nakshatra-based naming",
      "Multiple name options",
      "Meaning explanations",
      "Lucky letters",
      "Numerology analysis",
      "Certificate provided",
    ],
    category: "nakshatra",
    buttonText: "Select Name",
  },
  {
    id: "healing-rituals",
    title: "Healing Rituals & Remedies",
    icon: Award,
    duration: "60 minutes",
    price: formatServicePrice(8000),
    description:
      "Customized rituals and remedies designed to address specific life challenges and spiritual growth.",
    features: [
      "Personalized rituals",
      "Gemstone recommendations",
      "Mantra guidance",
      "Yantra preparation",
      "Puja instructions",
      "Ongoing support",
    ],
    popular: true,
    category: "nakshatra",
    buttonText: "Book Ritual",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid heroSlides={heroSlides} />
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
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
            <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
              Healing Consultations
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Ayurvedic Consultation Services
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Personalized healthcare solutions based on ancient Ayurvedic
            principles, tailored to restore balance and promote natural healing.
          </p>
        </div>

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
      </section>

      {/* Nakshatra Services */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-12"></div>
            <span className="mx-4 text-sm font-medium text-yellow-600 tracking-wider uppercase">
              Spiritual Guidance
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-12"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-700 via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Nakshatra & Astrological Services
            </span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Traditional astrological guidance for life&apos;s important
            decisions and spiritual growth, rooted in ancient Vedic wisdom and
            cosmic understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nakshatraServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              showRating={true}
              rating={5}
              className="bg-white/80 backdrop-blur-sm"
            />
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="text-center py-16">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
              Begin Your Journey
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-16"></div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
              Ready to Begin Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Healing Journey?
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our experienced practitioners are here to guide you towards optimal
            health and spiritual well-being. Book your consultation today and
            take the first step towards natural healing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 shadow-lg px-8 py-3"
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
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white bg-transparent shadow-lg px-8 py-3"
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
