import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ThumbsUp, MessageCircle } from "lucide-react";

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
];

const stats = [
  { label: "Total Reviews", value: "1,247" },
  { label: "Average Rating", value: "4.8" },
  { label: "5-Star Reviews", value: "89%" },
  { label: "Verified Purchases", value: "94%" },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header Section */}
      <div className="relative mb-16 text-center">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-8 left-1/4 w-20 h-20 bg-emerald-100 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute top-16 right-1/3 w-16 h-16 bg-teal-100 rounded-full opacity-25 blur-2xl"></div>
        </div>

        {/* Main title with gradient */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
              Trusted by Thousands
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-16"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent">
              Customer Stories &
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h1>
        </div>

        {/* Enhanced subtitle */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-6">
            Read authentic experiences from our wellness community
          </p>
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Discover how our customers have found healing and wellness through
              our Ayurvedic treatments and services. Real stories, real
              transformations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/80 px-3 py-1 rounded-full text-green-700 font-medium">
                Verified Reviews
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-emerald-700 font-medium">
                Real Results
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-teal-700 font-medium">
                Trusted Care
              </span>
            </div>
          </div>
        </div>

        {/* Rating highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-green-500 fill-current" />
            </div>
            <div className="text-xl font-bold text-green-600 mb-1">4.8</div>
            <p className="text-xs text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-emerald-100">
            <div className="text-xl font-bold text-emerald-600 mb-1">1.2K+</div>
            <p className="text-xs text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-teal-100">
            <div className="text-xl font-bold text-teal-600 mb-1">89%</div>
            <p className="text-xs text-gray-600">5-Star Reviews</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-green-100">
            <div className="text-xl font-bold text-green-600 mb-1">94%</div>
            <p className="text-xs text-gray-600">Verified</p>
          </div>
        </div>

        {/* Decorative stars pattern */}
        <div className="flex justify-center items-center space-x-3">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300 to-orange-300"></div>
          <Star className="h-4 w-4 text-amber-500 fill-current" />
          <div className="w-6 h-px bg-orange-300"></div>
          <Star className="h-5 w-5 text-orange-500 fill-current" />
          <div className="w-6 h-px bg-yellow-300"></div>
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <div className="w-8 h-px bg-gradient-to-l from-transparent via-yellow-300 to-orange-300"></div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="text-center p-6 bg-gradient-to-br from-white to-amber-50 border-amber-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
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
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
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
                    style={{
                      width: rating === 5 ? "89%" : rating === 4 ? "8%" : "3%",
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {rating === 5 ? "89%" : rating === 4 ? "8%" : "3%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reviews Grid */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 flex flex-col">
            <CardContent className="p-0 flex flex-col h-full">
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
                      <h3 className="font-semibold text-gray-900">
                        {review.name}
                      </h3>
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
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
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

              <div className="relative mb-4 flex-grow">
                <Quote className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-gray-700 leading-relaxed pl-8">
                  {review.review}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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

      {/* Enhanced Write Review CTA */}
      <Card className="mt-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-0 shadow-lg">
        <CardContent className="p-10 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-amber-600 tracking-wider uppercase">
              Your Voice Matters
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-16"></div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-amber-800 bg-clip-text text-transparent">
              Share Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Healing Journey
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Help others discover the benefits of Ayurvedic healing by sharing
            your transformation story with our wellness community.
          </p>

          <Button
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg px-8 py-3"
            size="lg"
          >
            Write a Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
