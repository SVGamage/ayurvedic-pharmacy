"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, User, Clock, Search, ArrowRight } from "lucide-react";
import { ReusableHeroSection } from "@/components/reusable-hero-section";

const blogCategories = [
  "All Categories",
  "Herbal Wisdom",
  "Healing Through Ayurveda",
  "Power of Nature",
  "Ayurveda for Daily Life",
];

const blogPosts = [
  {
    id: 1,
    title: "The Ancient Wisdom of Turmeric: Nature's Golden Healer",
    excerpt:
      "Discover the incredible healing properties of turmeric and how this golden spice has been used for thousands of years in Ayurvedic medicine.",
    category: "Herbal Wisdom",
    author: "Dr. Anjali Patel",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Morning Rituals: Starting Your Day the Ayurvedic Way",
    excerpt:
      "Learn how to create a morning routine that aligns with Ayurvedic principles for better health, energy, and mental clarity throughout the day.",
    category: "Ayurveda for Daily Life",
    author: "Dr. Rajesh Kumar",
    date: "March 12, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: false,
  },
  {
    id: 3,
    title: "Seasonal Detox: Cleansing Your Body Naturally",
    excerpt:
      "Explore traditional Ayurvedic detoxification methods that help your body eliminate toxins and restore balance naturally.",
    category: "Healing Through Ayurveda",
    author: "Dr. Meera Singh",
    date: "March 10, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "The Power of Ashwagandha in Modern Stress Management",
    excerpt:
      "Understanding how this adaptogenic herb can help combat modern stress and anxiety while promoting overall well-being.",
    category: "Power of Nature",
    author: "Dr. Priya Sharma",
    date: "March 8, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "Digestive Fire: Understanding Agni in Ayurveda",
    excerpt:
      "Learn about the concept of digestive fire (Agni) and how to maintain optimal digestion for better health and vitality.",
    category: "Healing Through Ayurveda",
    author: "Dr. Vikram Joshi",
    date: "March 5, 2024",
    readTime: "9 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: false,
  },
  {
    id: 6,
    title: "Creating Your Home Herbal Garden",
    excerpt:
      "A beginner's guide to growing medicinal herbs at home for daily wellness and natural remedies.",
    category: "Power of Nature",
    author: "Dr. Sunita Reddy",
    date: "March 3, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: false,
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header Section */}
      <ReusableHeroSection
        preTitle="Ancient Wisdom Hub"
        titleLine1="Wellness"
        titleLine2="Knowledge Center"
        subtitle="Discover the wisdom of Ayurveda through our comprehensive articles"
        description="Explore natural healing, herbal remedies, and holistic wellness practices through expertly crafted articles by our experienced practitioners."
        badges={["Expert Articles", "Daily Wisdom", "Practical Tips"]}
        theme="green"
      />

      {/* Search and Filter */}
      <div className="bg-stone-50 p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-stone-200 focus:ring-emerald-500 bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {blogCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "All Categories" && !searchTerm && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">
            Featured Article
          </h2>
          <Card className="overflow-hidden border-stone-200 shadow-sm">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                  width={400}
                  height={250}
                />
              </div>
              <div className="md:w-1/2 p-8 bg-stone-50">
                <Badge className="bg-emerald-700 hover:bg-emerald-800 mb-4">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-stone-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md">
                  Read Full Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Regular Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
          <Card
            key={post.id}
            className="group cursor-pointer overflow-hidden border-stone-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CardHeader className="p-0 relative">
              <div className="overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={250}
                />
                <Badge className="absolute top-4 left-4 bg-emerald-700/90 backdrop-blur-sm">
                  {post.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <CardTitle className="text-xl font-serif mb-3 text-stone-800 group-hover:text-emerald-700 transition-colors">
                {post.title}
              </CardTitle>
              <p className="text-stone-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-stone-500 mb-4">
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
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="p-0 h-auto text-emerald-700 hover:text-emerald-800 hover:bg-transparent font-medium"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-500 text-lg">
            No articles found matching your criteria.
          </p>
        </div>
      )}

      {/* Enhanced Newsletter Signup */}
      <section className="bg-stone-50 rounded-3xl p-10 mt-16 border border-stone-200 shadow-sm">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6 bg-white px-3 py-1 rounded-full border border-stone-200">
            <span className="text-sm font-medium text-stone-600 tracking-wider uppercase">
              Stay Connected
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
            Stay Updated with Our
            <br />
            <span className="text-emerald-700">Wellness Newsletter</span>
          </h2>

          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Get the latest articles on Ayurveda, natural healing, and wellness
            tips delivered to your inbox every week.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 h-12 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
            />
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md px-8 h-12">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
