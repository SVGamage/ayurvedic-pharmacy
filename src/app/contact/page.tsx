"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header Section */}
      <div className="relative mb-16 text-center">
        {/* Background decoration with communication theme */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-52 h-52 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-full opacity-40 blur-3xl"></div>
          {/* Communication wave patterns */}
          <div className="absolute top-12 left-1/4 w-6 h-6 border-2 border-green-300 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-8 right-1/3 w-4 h-4 border-2 border-blue-300 rounded-full animate-ping opacity-30 animation-delay-200"></div>
          <div className="absolute top-16 right-1/4 w-5 h-5 border-2 border-purple-300 rounded-full animate-ping opacity-25 animation-delay-400"></div>
        </div>

        {/* Contact badge */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Let&apos;s Connect
          </div>
        </div>

        {/* Main title with communication theme */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="block text-gray-900 mb-2">Get in</span>
          <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Touch With Us
          </span>
        </h1>

        {/* Enhanced subtitle with contact methods */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-6">
            We&apos;re here to help you on your wellness journey
          </p>
          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Reach out to us for consultations, product inquiries, or any
              questions about Ayurvedic healing. Our dedicated team is ready to
              guide you towards natural wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/80 px-3 py-1 rounded-full text-purple-700 font-medium">
                Expert Guidance
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-blue-700 font-medium">
                Quick Response
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-green-700 font-medium">
                Personal Care
              </span>
            </div>
          </div>
        </div>

        {/* Contact method highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-purple-100">
            <Phone className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Instant Support</p>
            <p className="text-xs text-gray-600">Call us anytime</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-blue-100">
            <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Email Response</p>
            <p className="text-xs text-gray-600">Within 24 hours</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-green-100">
            <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Visit Us</p>
            <p className="text-xs text-gray-600">In-person consultation</p>
          </div>
        </div>

        {/* Decorative communication waves */}
        <div className="flex justify-center items-center space-x-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-300 to-blue-300"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-8 h-px bg-blue-300"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-px bg-green-300"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-300"></div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-green-300 to-blue-300"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange("service", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ayurvedic-consultation">
                          Ayurvedic Consultation
                        </SelectItem>
                        <SelectItem value="online-consultation">
                          Online Consultation
                        </SelectItem>
                        <SelectItem value="nakshatra-services">
                          Nakshatra Services
                        </SelectItem>
                        <SelectItem value="product-inquiry">
                          Product Inquiry
                        </SelectItem>
                        <SelectItem value="general-inquiry">
                          General Inquiry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Brief subject of your message"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-7PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@ayurvedapharmacy.com</p>
                  <p className="text-sm text-gray-500">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">123 Wellness Street</p>
                  <p className="text-gray-600">Ayurveda City, AC 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-600">Mon-Fri: 9AM-7PM</p>
                  <p className="text-gray-600">Sat-Sun: 10AM-5PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Emergency Consultation
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Need urgent Ayurvedic advice? Our emergency consultation service
                is available 24/7.
              </p>
              <Button className="bg-red-600 hover:bg-red-700" size="sm">
                Emergency Contact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                How do I book a consultation?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                You can book online through our website, call us directly, or
                visit our center. Online bookings are available 24/7.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Do you offer online consultations?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes, we provide secure video consultations with our experienced
                Ayurvedic doctors. Prescriptions and follow-ups are handled
                digitally.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Are your products certified?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                All our products are certified organic and follow traditional
                Ayurvedic preparation methods. We maintain the highest quality
                standards.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                What is included in Nakshatra services?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Our Nakshatra services include horoscope reading, auspicious
                timing calculations, name selection, and personalized ritual
                guidance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
