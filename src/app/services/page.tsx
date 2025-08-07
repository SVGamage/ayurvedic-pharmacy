"use client";
import { Button } from "@/components/ui/button";
import { Stethoscope, Video, Star, Calendar, Users, Award } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { Service } from "@/types/service";

const ayurvedicServices: Service[] = [
  {
    id: "in-person-consultation",
    title: "In-Person Consultation",
    icon: Stethoscope,
    duration: "60 minutes",
    price: "From $75",
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
    price: "From $50",
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
    price: "From $60",
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
    price: "From $40",
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
    price: "From $35",
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
    price: "From $80",
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
  const handleBookClick = (service: Service) => {
    // Handle booking logic here
    console.log(`Booking service: ${service.title}`);
    // You can implement routing to booking page or open booking modal
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience holistic healing through our comprehensive Ayurvedic
          consultations and traditional Nakshatra services. Our expert
          practitioners combine ancient wisdom with modern convenience.
        </p>
      </div>

      {/* Ayurvedic Services */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ayurvedic Consultation Services
          </h2>
          <p className="text-gray-600">
            Personalized healthcare solutions based on ancient Ayurvedic
            principles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ayurvedicServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookClick={handleBookClick}
              showRating={true}
              rating={5}
            />
          ))}
        </div>
      </section>

      {/* Nakshatra Services */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Nakshatra & Astrological Services
          </h2>
          <p className="text-gray-600">
            Traditional astrological guidance for life&apos;s important
            decisions and spiritual growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nakshatraServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookClick={handleBookClick}
              showRating={true}
              rating={5}
              className="bg-white/80 backdrop-blur-sm"
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Ready to Begin Your Healing Journey?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Our experienced practitioners are here to guide you towards optimal
          health and spiritual well-being. Book your consultation today and take
          the first step towards natural healing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Schedule Ayurvedic Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white bg-transparent"
          >
            Book Nakshatra Reading
          </Button>
        </div>
      </section>
    </div>
  );
}
