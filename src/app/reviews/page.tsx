import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ThumbsUp, MessageCircle } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    date: "March 10, 2024",
    treatment: "Stress & Sleep Management",
    doctor: "Dr. Anjali Patel",
    review:
      "I've been struggling with chronic insomnia for years, and conventional medicine wasn't helping. Dr. Patel's holistic approach with Ashwagandha and personalized lifestyle recommendations has completely transformed my sleep quality. I'm finally getting restful nights and waking up energized. The consultation was thorough, and the follow-up care has been exceptional.",
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    date: "March 8, 2024",
    treatment: "Digestive Health",
    doctor: "Dr. Rajesh Kumar",
    review:
      "After years of digestive issues and multiple doctor visits with no real solutions, I decided to try Ayurveda. Dr. Kumar's approach was refreshing - he took time to understand my lifestyle, stress levels, and eating habits. The Triphala treatment combined with dietary changes has solved my chronic bloating and irregular digestion. I feel like a new person!",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Austin, TX",
    rating: 5,
    date: "March 5, 2024",
    treatment: "Nakshatra Wedding Consultation",
    doctor: "Pandit Vikram Joshi",
    review:
      "We consulted Pandit Joshi for our wedding muhurat, and the experience was incredible. His knowledge of Vedic astrology is profound, and he provided detailed explanations for every recommendation. Our wedding day felt perfectly aligned, and many guests commented on the positive energy. The follow-up guidance for our new home setup was also very helpful.",
    helpful: 31,
    verified: true,
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Miami, FL",
    rating: 4,
    date: "March 3, 2024",
    treatment: "Joint & Muscle Pain",
    doctor: "Dr. Meera Singh",
    review:
      "As a construction worker, I deal with constant joint pain. Dr. Singh's herbal oil treatments and specific yoga recommendations have significantly reduced my pain levels. The improvement has been gradual but consistent. I appreciate the natural approach and the fact that there are no side effects like with conventional painkillers.",
    helpful: 15,
    verified: true,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    location: "Seattle, WA",
    rating: 5,
    date: "February 28, 2024",
    treatment: "Skin Conditions",
    doctor: "Dr. Sunita Reddy",
    review:
      "I had been dealing with persistent eczema for over a decade. Dr. Reddy's combination of internal herbs and external neem-based treatments has cleared my skin remarkably. She also helped me identify food triggers I never knew about. My skin hasn't looked this good in years, and I finally feel confident again.",
    helpful: 22,
    verified: true,
  },
  {
    id: 6,
    name: "James Wilson",
    location: "Chicago, IL",
    rating: 5,
    date: "February 25, 2024",
    treatment: "Online Consultation - Immunity",
    doctor: "Dr. Priya Sharma",
    review:
      "The online consultation was surprisingly effective. Dr. Sharma was very thorough despite the virtual format. Her immunity-boosting protocol with Chyawanprash and other herbs has kept me healthy through the entire winter season. The convenience of online follow-ups and medicine delivery makes this service outstanding.",
    helpful: 19,
    verified: true,
  },
]

const stats = [
  { label: "Total Reviews", value: "1,247" },
  { label: "Average Rating", value: "4.8" },
  { label: "5-Star Reviews", value: "89%" },
  { label: "Verified Purchases", value: "94%" },
]

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Customer Reviews & Testimonials</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Read authentic experiences from our customers who have found healing and wellness through our Ayurvedic
          treatments and services.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Overall Rating */}
      <Card className="mb-8 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Based on 1,247 verified reviews</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm w-8">{rating}★</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: rating === 5 ? "89%" : rating === 4 ? "8%" : "3%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{rating === 5 ? "89%" : rating === 4 ? "8%" : "3%"}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reviews Grid */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span>
                    <strong>Treatment:</strong> {review.treatment}
                  </span>
                  <span>
                    <strong>Doctor:</strong> {review.doctor}
                  </span>
                </div>
              </div>

              <div className="relative mb-4">
                <Quote className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-gray-700 leading-relaxed pl-8">{review.review}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          size="lg"
          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
        >
          Load More Reviews
        </Button>
      </div>

      {/* Write Review CTA */}
      <Card className="mt-12 p-8 bg-green-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
          <p className="text-gray-600 mb-6">
            Help others discover the benefits of Ayurvedic healing by sharing your journey with us.
          </p>
          <Button className="bg-green-600 hover:bg-green-700" size="lg">
            Write a Review
          </Button>
        </div>
      </Card>
    </div>
  )
}
