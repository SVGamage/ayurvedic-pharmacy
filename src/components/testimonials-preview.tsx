import { ReviewCard } from "@/components/review-card";
import { Review } from "@/types/review";

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real stories from people who have experienced the healing power of
          Ayurveda and traditional wisdom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            showVerified={true}
            showLocation={true}
            showHelpful={false}
            className="h-full"
          />
        ))}
      </div>

      {/* CTA to view more reviews */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-200">
          View All Reviews
        </button>
      </div>
    </section>
  );
}
