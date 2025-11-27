"use client";
import { Button } from "@/components/ui/button";
import { Stethoscope, Video, Star, Calendar, ArrowRight } from "lucide-react";
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
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Our <span className="text-emerald-700 italic">Services</span>
            </h2>
            <p className="text-lg text-stone-600">
              Experience holistic healing through our comprehensive Ayurvedic
              and traditional services designed for your wellness journey.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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

        <div className="text-center md:hidden">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
