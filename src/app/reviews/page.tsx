import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ThumbsUp, MessageCircle } from "lucide-react";
import { ReusableHeroSection } from "@/components/reusable-hero-section";

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
      <ReusableHeroSection
        preTitle="Trusted by Thousands"
        titleLine1="Customer Stories &"
        titleLine2="Testimonials"
        subtitle="Read authentic experiences from our wellness community"
        description="Discover how our customers have found healing and wellness through our Ayurvedic treatments and services. Real stories, real transformations."
        badges={["Verified Reviews", "Real Results", "Trusted Care"]}
        theme="green"
      />

      {/* Rating highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-6 w-6 text-emerald-500 fill-current" />
          </div>
          <div className="text-xl font-bold text-emerald-700 mb-1 text-center">
            4.8
          </div>
          <p className="text-xs text-stone-600 text-center">Average Rating</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <div className="text-xl font-bold text-emerald-700 mb-1 text-center">
            1.2K+
          </div>
          <p className="text-xs text-stone-600 text-center">Happy Customers</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <div className="text-xl font-bold text-emerald-700 mb-1 text-center">
            89%
          </div>
          <p className="text-xs text-stone-600 text-center">5-Star Reviews</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <div className="text-xl font-bold text-emerald-700 mb-1 text-center">
            94%
          </div>
          <p className="text-xs text-stone-600 text-center">Verified</p>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="text-center p-6 bg-stone-50 border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-serif font-bold text-emerald-700 mb-2">
              {stat.value}
            </div>
            <div className="text-stone-600 font-medium">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Overall Rating */}
      <Card className="mb-8 p-6 border-stone-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-serif font-bold text-stone-900">
                4.8
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-stone-600">Based on 1,247 verified reviews</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm w-8 text-stone-600">{rating}★</span>
                <div className="w-32 bg-stone-200 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full"
                    style={{
                      width: rating === 5 ? "89%" : rating === 4 ? "8%" : "3%",
                    }}
                  ></div>
                </div>
                <span className="text-sm text-stone-600 w-8">
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
          <Card
            key={review.id}
            className="p-6 flex flex-col border-stone-200 shadow-sm"
          >
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-serif font-semibold">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif font-semibold text-stone-900">
                        {review.name}
                      </h3>
                      {review.verified && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-stone-600">{review.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-stone-500">{review.date}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-stone-600 mb-2">
                  <span>
                    <strong className="text-stone-800">Treatment:</strong>{" "}
                    {review.treatment}
                  </span>
                  <span>
                    <strong className="text-stone-800">Doctor:</strong>{" "}
                    {review.doctor}
                  </span>
                </div>
              </div>

              <div className="relative mb-4 flex-grow">
                <Quote className="h-6 w-6 text-emerald-200 mb-2 absolute -top-2 -left-2" />
                <p className="text-stone-700 leading-relaxed pl-6 relative z-10">
                  {review.review}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-stone-500 hover:text-emerald-700 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-stone-500 hover:text-emerald-700 transition-colors">
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
          className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 bg-transparent"
        >
          Load More Reviews
        </Button>
      </div>

      {/* Enhanced Write Review CTA */}
      <Card className="mt-12 bg-stone-50 border border-stone-200 shadow-sm">
        <CardContent className="p-10 text-center">
          <div className="inline-flex items-center justify-center mb-6 bg-white px-3 py-1 rounded-full border border-stone-200">
            <span className="text-sm font-medium text-stone-600 tracking-wider uppercase">
              Your Voice Matters
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
            Share Your
            <br />
            <span className="text-emerald-700">Healing Journey</span>
          </h2>

          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Help others discover the benefits of Ayurvedic healing by sharing
            your transformation story with our wellness community.
          </p>

          <Button
            className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md px-8 py-3"
            size="lg"
          >
            Write a Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
