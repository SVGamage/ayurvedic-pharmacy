import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Video, Star, Calendar, Clock, CheckCircle, Users, Award } from "lucide-react"

const ayurvedicServices = [
  {
    title: "In-Person Consultation",
    icon: Stethoscope,
    duration: "60 minutes",
    price: "From $75",
    description: "Comprehensive health assessment with our experienced Ayurvedic doctors",
    features: [
      "Complete health evaluation",
      "Pulse diagnosis (Nadi Pariksha)",
      "Personalized treatment plan",
      "Prescription medicines",
      "Dietary recommendations",
      "Follow-up support",
    ],
    popular: true,
  },
  {
    title: "Online Consultation",
    icon: Video,
    duration: "45 minutes",
    price: "From $50",
    description: "Get expert Ayurvedic advice from the comfort of your home",
    features: [
      "Video consultation",
      "Digital prescriptions",
      "Health monitoring",
      "24/7 chat support",
      "Medicine delivery",
      "Progress tracking",
    ],
    popular: false,
  },
]

const nakshatraServices = [
  {
    title: "Personal Horoscope Reading",
    icon: Star,
    duration: "45 minutes",
    price: "From $60",
    description: "Detailed analysis of your birth chart and life predictions",
    features: [
      "Complete birth chart analysis",
      "Life predictions",
      "Career guidance",
      "Relationship compatibility",
      "Health insights",
      "Remedial measures",
    ],
  },
  {
    title: "Wedding & Event Calculations",
    icon: Calendar,
    duration: "30 minutes",
    price: "From $40",
    description: "Find the most auspicious dates and times for your special events",
    features: [
      "Muhurat calculation",
      "Auspicious date selection",
      "Time recommendations",
      "Ritual guidance",
      "Compatibility analysis",
      "Custom ceremonies",
    ],
  },
  {
    title: "Newborn Name Selection",
    icon: Users,
    duration: "30 minutes",
    price: "From $35",
    description: "Choose the perfect name based on astrological calculations",
    features: [
      "Nakshatra-based naming",
      "Multiple name options",
      "Meaning explanations",
      "Lucky letters",
      "Numerology analysis",
      "Certificate provided",
    ],
  },
  {
    title: "Healing Rituals & Remedies",
    icon: Award,
    duration: "60 minutes",
    price: "From $80",
    description: "Customized rituals and remedies for specific life challenges",
    features: [
      "Personalized rituals",
      "Gemstone recommendations",
      "Mantra guidance",
      "Yantra preparation",
      "Puja instructions",
      "Ongoing support",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience holistic healing through our comprehensive Ayurvedic consultations and traditional Nakshatra
          services. Our expert practitioners combine ancient wisdom with modern convenience.
        </p>
      </div>

      {/* Ayurvedic Services */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ayurvedic Consultation Services</h2>
          <p className="text-gray-600">Personalized healthcare solutions based on ancient Ayurvedic principles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ayurvedicServices.map((service, index) => (
            <Card key={index} className={`relative ${service.popular ? "ring-2 ring-green-500" : ""}`}>
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">Most Popular</Badge>
              )}
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{service.price}</span>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Nakshatra Services */}
      <section className="bg-green-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Nakshatra & Astrological Services</h2>
          <p className="text-gray-600">
            Traditional astrological guidance for life's important decisions and spiritual growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nakshatraServices.map((service, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{service.price}</span>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Service Includes:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-yellow-600 hover:bg-yellow-700" size="lg">
                  Book Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Healing Journey?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Our experienced practitioners are here to guide you towards optimal health and spiritual well-being. Book your
          consultation today and take the first step towards natural healing.
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
  )
}
