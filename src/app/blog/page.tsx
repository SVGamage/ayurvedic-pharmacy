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
      <div className="relative mb-16 text-center">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 h-44 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-emerald-100 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute top-16 right-1/3 w-16 h-16 bg-teal-100 rounded-full opacity-25 blur-2xl"></div>
        </div>

        {/* Main title with gradient */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
              Ancient Wisdom Hub
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-16"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent">
              Wellness
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 bg-clip-text text-transparent">
              Knowledge Center
            </span>
          </h1>
        </div>

        {/* Enhanced subtitle */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-6">
            Discover the wisdom of Ayurveda through our comprehensive articles
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Explore natural healing, herbal remedies, and holistic wellness
              practices through expertly crafted articles by our experienced
              practitioners.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/80 px-3 py-1 rounded-full text-green-700 font-medium">
                Expert Articles
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-emerald-700 font-medium">
                Daily Wisdom
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-teal-700 font-medium">
                Practical Tips
              </span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Article
          </h2>
          <Card className="overflow-hidden">
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
              <div className="md:w-1/2 p-8">
                <Badge className="bg-green-600 mb-4">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                <Button className="bg-green-600 hover:bg-green-700">
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
          <Card key={post.id} className="group cursor-pointer overflow-hidden">
            <CardHeader className="p-0 relative">
              <div className="overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={250}
                />
                <Badge className="absolute top-4 left-4 bg-green-600">
                  {post.category}
                </Badge>
              </div>
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
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
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

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No articles found matching your criteria.
          </p>
        </div>
      )}

      {/* Enhanced Newsletter Signup */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-3xl p-10 mt-16 border-0 shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-indigo-600 tracking-wider uppercase">
              Stay Connected
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent w-16"></div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
              Stay Updated with Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Wellness Newsletter
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the latest articles on Ayurveda, natural healing, and wellness
            tips delivered to your inbox every week.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 h-12 border-indigo-200 focus:border-indigo-500"
            />
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg px-8 h-12">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
