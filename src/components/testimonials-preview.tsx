import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    text: "The Ashwagandha capsules have completely transformed my sleep quality. Dr. Patel's consultation was thorough and the personalized treatment plan worked wonders.",
    treatment: "Stress & Sleep Management",
  },
  {
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    text: "Amazing results with the digestive health program. The Triphala powder and dietary recommendations have solved my chronic digestive issues.",
    treatment: "Digestive Health",
  },
  {
    name: "Priya Sharma",
    location: "Austin, TX",
    rating: 5,
    text: "The Nakshatra consultation for my wedding was incredibly detailed and accurate. The auspicious timing recommendations made our ceremony perfect.",
    treatment: "Nakshatra Services",
  },
]

export function TestimonialsPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real stories from people who have experienced the healing power of Ayurveda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-green-600 mb-4" />
              <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>
              <div className="border-t border-green-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <p className="text-sm text-green-600 font-medium mt-1">{testimonial.treatment}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
