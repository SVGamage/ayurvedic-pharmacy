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
import { WHATSAPP_CONFIG } from "@/config/whatsapp";
import { ReusableHeroSection } from "@/components/reusable-hero-section";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 md:pt-40">
      {/* Enhanced Header Section */}
      <ReusableHeroSection
        preTitle="Connect With Us"
        titleLine1="Get in Touch"
        titleLine2="With Our Team"
        subtitle="We're here to help you on your wellness journey"
        description="Reach out to us for consultations, product inquiries, or any questions about Ayurvedic healing. Our dedicated team is ready to guide you towards natural wellness."
        badges={["Expert Guidance", "Quick Response", "Personal Care"]}
        theme="green"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Enhanced Contact Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-stone-200">
            <CardHeader className="pb-4 bg-stone-50 border-b border-stone-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-3 bg-white px-3 py-1 rounded-full border border-stone-200">
                  <span className="text-sm font-medium text-stone-600 tracking-wider uppercase">
                    Message Us
                  </span>
                </div>
                <CardTitle className="text-2xl font-serif font-bold text-stone-800">
                  Send Us a Message
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-stone-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-stone-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-stone-700">
                      Service Interest
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange("service", value)}
                    >
                      <SelectTrigger className="border-stone-200 focus:ring-emerald-500 bg-stone-50">
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

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-stone-700">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Brief subject of your message"
                    required
                    className="border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-stone-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                    className="border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white shadow-md"
                    size="lg"
                  >
                    Send Message
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
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
          <Card className="shadow-sm border-stone-200">
            <CardHeader className="pb-3 bg-stone-50 border-b border-stone-100">
              <div className="text-center">
                <CardTitle className="text-lg font-serif text-stone-800">
                  Get in Touch
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <MessageCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">WhatsApp</p>
                  <p className="text-stone-600">
                    {WHATSAPP_CONFIG.displayNumber}
                  </p>
                  <p className="text-sm text-stone-500">
                    Quick ordering & booking
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Phone</p>
                  <p className="text-stone-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-stone-500">Mon-Fri 9AM-7PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Email</p>
                  <p className="text-stone-600">info@ayurvedapharmacy.com</p>
                  <p className="text-sm text-stone-500">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Address</p>
                  <p className="text-stone-600">123 Wellness Street</p>
                  <p className="text-stone-600">Ayurveda City, AC 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Clock className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Hours</p>
                  <p className="text-stone-600">Mon-Fri: 9AM-7PM</p>
                  <p className="text-stone-600">Sat-Sun: 10AM-5PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-stone-200">
            <CardHeader className="pb-3 bg-stone-50 border-b border-stone-100">
              <div className="text-center">
                <CardTitle className="text-lg font-serif text-stone-800">
                  Follow Us
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent border-stone-200 hover:bg-stone-50 text-stone-600"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent border-stone-200 hover:bg-stone-50 text-stone-600"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent border-stone-200 hover:bg-stone-50 text-stone-600"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent border-stone-200 hover:bg-stone-50 text-stone-600"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-stone-50 border border-stone-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <h3 className="font-bold font-serif text-stone-900 mb-2 text-lg">
                Emergency Consultation
              </h3>
              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                Need urgent Ayurvedic advice? Our emergency consultation service
                is available 24/7 for critical wellness concerns.
              </p>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white shadow-md w-full"
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
      <Card className="shadow-sm border-stone-200">
        <CardHeader className="pb-4 bg-stone-50 border-b border-stone-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3 bg-white px-3 py-1 rounded-full border border-stone-200">
              <span className="text-sm font-medium text-stone-600 tracking-wider uppercase">
                Common Questions
              </span>
            </div>
            <CardTitle className="text-2xl font-serif font-bold text-stone-800">
              Frequently Asked Questions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <h4 className="font-serif font-semibold mb-2 text-stone-800">
                How do I book a consultation?
              </h4>
              <p className="text-stone-600 text-sm">
                You can book online through our website, call us directly, or
                visit our center. Online bookings are available 24/7.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <h4 className="font-serif font-semibold mb-2 text-stone-800">
                Do you offer online consultations?
              </h4>
              <p className="text-stone-600 text-sm">
                Yes, we provide secure video consultations with our experienced
                Ayurvedic doctors. Prescriptions and follow-ups are handled
                digitally.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <h4 className="font-serif font-semibold mb-2 text-stone-800">
                Are your products certified?
              </h4>
              <p className="text-stone-600 text-sm">
                All our products are certified organic and follow traditional
                Ayurvedic preparation methods. We maintain the highest quality
                standards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <h4 className="font-serif font-semibold mb-2 text-stone-800">
                What is included in Nakshatra services?
              </h4>
              <p className="text-stone-600 text-sm">
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
