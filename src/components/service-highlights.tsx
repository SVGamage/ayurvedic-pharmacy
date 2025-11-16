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
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
              className="bg-white"
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
