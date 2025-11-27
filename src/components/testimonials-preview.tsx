import { ReviewCard } from "@/components/review-card";
import { Review } from "@/types/review";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const testimonials: Review[] = [
  {
    id: "review-1",
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    text: "The Ashwagandha capsules have completely transformed my sleep quality. Dr. Patel's consultation was thorough and the personalized treatment plan worked wonders. I feel more energetic and balanced than ever before.",
    treatment: "Stress & Sleep Management",
    category: "ayurvedic",
    verified: true,
    date: "2024-07-15",
    helpful: 12,
  },
  {
    id: "review-2",
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    text: "Amazing results with the digestive health program. The Triphala powder and dietary recommendations have solved my chronic digestive issues that I've been dealing with for years.",
    treatment: "Digestive Health",
    category: "ayurvedic",
    verified: true,
    date: "2024-07-20",
    helpful: 8,
  },
  {
    id: "review-3",
    name: "Priya Sharma",
    location: "Austin, TX",
    rating: 5,
    text: "The Nakshatra consultation for my wedding was incredibly detailed and accurate. The auspicious timing recommendations made our ceremony perfect and blessed.",
    treatment: "Nakshatra Services",
    category: "nakshatra",
    verified: true,
    date: "2024-07-10",
    helpful: 15,
  },
];

export function TestimonialsPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-stone-50/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
          What Our{" "}
          <span className="text-emerald-700 italic">Customers Say</span>
        </h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Real stories from people who have experienced the healing power of
          Ayurveda and traditional wisdom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {testimonials.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            showVerified={true}
            showLocation={true}
            showHelpful={false}
            className="h-full bg-white shadow-sm hover:shadow-md border-stone-100"
          />
        ))}
      </div>

      {/* CTA to view more reviews */}
      <div className="text-center">
        <Button
          variant="outline"
          size="lg"
          className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          asChild
        >
          <Link href="/reviews">
            View All Reviews <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
