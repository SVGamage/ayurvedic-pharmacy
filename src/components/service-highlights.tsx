import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Video, Star, Calendar, Leaf, Clock } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Stethoscope,
    title: "In-Person Consultation",
    description: "Meet with our experienced Ayurvedic doctors for personalized treatment plans and health assessments.",
    features: [
      "Comprehensive health assessment",
      "Personalized treatment plan",
      "Prescription medicines",
      "Follow-up support",
    ],
    price: "From $75",
    duration: "60 minutes",
  },
  {
    icon: Video,
    title: "Online Consultation",
    description: "Get expert Ayurvedic advice from the comfort of your home through secure video consultations.",
    features: ["Video consultation", "Digital prescriptions", "Health monitoring", "24/7 support"],
    price: "From $50",
    duration: "45 minutes",
  },
  {
    icon: Star,
    title: "Nakshatra Services",
    description:
      "Traditional astrological services including horoscope reading, auspicious timing, and ritual guidance.",
    features: ["Personal horoscope reading", "Wedding calculations", "Name selection", "Ritual guidance"],
    price: "From $40",
    duration: "30 minutes",
  },
]

export function ServiceHighlights() {
  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience holistic healing through our comprehensive Ayurvedic and traditional services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Leaf className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{service.price}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
