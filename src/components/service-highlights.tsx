"use client";
import { Button } from "@/components/ui/button";
import { Stethoscope, Video, Star, Calendar } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { Service } from "@/types/service";
import { formatServicePrice } from "@/config/currency";

const services: Service[] = [
  {
    id: "in-person-consultation",
    icon: Stethoscope,
    title: "In-Person Consultation",
    description:
      "Meet with our experienced Ayurvedic doctors for personalized treatment plans and comprehensive health assessments.",
    features: [
      "Comprehensive health assessment",
      "Personalized treatment plan",
      "Prescription medicines",
      "Follow-up support",
    ],
    price: formatServicePrice(7500),
    duration: "60 minutes",
    category: "ayurvedic",
    popular: true,
    buttonText: "Book Consultation",
  },
  {
    id: "online-consultation",
    icon: Video,
    title: "Online Consultation",
    description:
      "Get expert Ayurvedic advice from the comfort of your home through secure video consultations.",
    features: [
      "Video consultation",
      "Digital prescriptions",
      "Health monitoring",
      "24/7 chat support",
      "Medicine delivery",
    ],
    price: formatServicePrice(5000),
    duration: "45 minutes",
    category: "ayurvedic",
    buttonText: "Book Online",
  },
  {
    id: "nakshatra-services",
    icon: Star,
    title: "Nakshatra Services",
    description:
      "Traditional astrological services including horoscope reading, auspicious timing, and ritual guidance.",
    features: [
      "Personal horoscope reading",
      "Wedding calculations",
      "Name selection",
      "Ritual guidance",
      "Gemstone recommendations",
    ],
    price: formatServicePrice(4000),
    duration: "30 minutes",
    category: "nakshatra",
    buttonText: "Book Reading",
  },
];

export function ServiceHighlights() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-200/20 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white text-green-700 font-semibold px-4 py-2 rounded-full text-sm shadow-md">
              🌟 Expert Care
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Our Services
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience holistic healing through our comprehensive Ayurvedic and
            traditional services designed for your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              showRating={true}
              rating={5}
              className="bg-white shadow-lg hover:shadow-2xl"
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base rounded-xl"
            >
              <Calendar className="h-5 w-5 mr-2" />
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
