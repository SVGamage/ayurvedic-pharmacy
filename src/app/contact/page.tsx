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
  MessageCircle,
} from "lucide-react";
import {
  contactViaWhatsApp,
  emergencyConsultationViaWhatsApp,
} from "@/lib/whatsapp";
import { WHATSAPP_BUSINESS_CONFIG } from "@/config/whatsapp";

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
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-12 left-1/4 w-20 h-20 bg-emerald-100 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute top-8 right-1/3 w-16 h-16 bg-teal-100 rounded-full opacity-25 blur-2xl"></div>
        </div>

        {/* Main title with gradient */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
              Connect With Us
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-16"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent">
              Get in Touch
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 bg-clip-text text-transparent">
              With Our Team
            </span>
          </h1>
        </div>

        {/* Enhanced subtitle */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-6">
            We&apos;re here to help you on your wellness journey
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Reach out to us for consultations, product inquiries, or any
              questions about Ayurvedic healing. Our dedicated team is ready to
              guide you towards natural wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/80 px-3 py-1 rounded-full text-green-700 font-medium">
                Expert Guidance
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-emerald-700 font-medium">
                Quick Response
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-teal-700 font-medium">
                Personal Care
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Enhanced Contact Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-purple-100">
            <CardHeader className="pb-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-12"></div>
                  <span className="mx-4 text-sm font-medium text-purple-600 tracking-wider uppercase">
                    Message Us
                  </span>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-12"></div>
                </div>
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Send Us a Message
                  </span>
                </CardTitle>
              </div>
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

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Send Message
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    size="lg"
                    onClick={() =>
                      contactViaWhatsApp(formData.subject, formData.message)
                    }
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Contact Information */}
        <div className="space-y-6">
          <Card className="shadow-sm border-green-100">
            <CardHeader className="pb-3">
              <div className="text-center">
                <CardTitle className="text-lg">
                  <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    Get in Touch
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp Business</p>
                  <p className="text-gray-600">
                    {WHATSAPP_BUSINESS_CONFIG.displayNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quick ordering & booking
                  </p>
                </div>
              </div>

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

          <Card className="shadow-sm border-blue-100">
            <CardHeader className="pb-3">
              <div className="text-center">
                <CardTitle className="text-lg">
                  <span className="bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                    Follow Us
                  </span>
                </CardTitle>
              </div>
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

          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                <span className="bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent">
                  Emergency Consultation
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Need urgent Ayurvedic advice? Our emergency consultation service
                is available 24/7 for critical wellness concerns.
              </p>
              <Button
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg"
                size="sm"
                onClick={emergencyConsultationViaWhatsApp}
              >
                Emergency Contact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-12"></div>
              <span className="mx-4 text-sm font-medium text-gray-600 tracking-wider uppercase">
                Common Questions
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-12"></div>
            </div>
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </CardTitle>
          </div>
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
