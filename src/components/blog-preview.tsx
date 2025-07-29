import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "The Power of Turmeric in Daily Wellness",
    excerpt:
      "Discover how this golden spice can transform your health with its anti-inflammatory and antioxidant properties.",
    category: "Herbal Wisdom",
    author: "Dr. Anjali Patel",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Ayurvedic Morning Routines for Better Health",
    excerpt:
      "Learn ancient practices that can help you start your day with energy, clarity, and balance.",
    category: "Ayurveda for Daily Life",
    author: "Dr. Rajesh Kumar",
    date: "March 12, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Natural Remedies for Seasonal Allergies",
    excerpt:
      "Explore time-tested Ayurvedic solutions to combat seasonal allergies without side effects.",
    category: "Healing Through Ayurveda",
    author: "Dr. Meera Singh",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export function BlogPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Latest from Our Blog
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay informed with the latest insights on Ayurvedic healing, natural
          remedies, and wellness tips.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="group hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-4 left-4 bg-green-600">
                {post.category}
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-3 group-hover:text-green-600 transition-colors">
                {post.title}
              </CardTitle>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <span>{post.readTime}</span>
              </div>
              <Button
                variant="ghost"
                className="p-0 h-auto text-green-600 hover:text-green-700"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-1" />
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
          <Link href="/blog">View All Articles</Link>
        </Button>
      </div>
    </section>
  );
}
