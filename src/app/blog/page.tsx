"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Clock, Search, ArrowRight } from "lucide-react"

const blogCategories = [
  "All Categories",
  "Herbal Wisdom",
  "Healing Through Ayurveda",
  "Power of Nature",
  "Ayurveda for Daily Life",
]

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
    excerpt: "A beginner's guide to growing medicinal herbs at home for daily wellness and natural remedies.",
    category: "Power of Nature",
    author: "Dr. Sunita Reddy",
    date: "March 3, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=250&width=400",
    featured: false,
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Wellness Blog</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the wisdom of Ayurveda through our comprehensive articles on natural healing, herbal remedies, and
          holistic wellness practices.
        </p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="bg-green-600 mb-4">{featuredPost.category}</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
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
          <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-green-600">{post.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-3 group-hover:text-green-600 transition-colors">{post.title}</CardTitle>
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
              <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                Read More
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="bg-green-50 rounded-lg p-8 mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Our Wellness Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get the latest articles on Ayurveda, natural healing, and wellness tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
