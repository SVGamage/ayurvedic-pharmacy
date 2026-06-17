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
import Link from "next/link";
import {
  Phone,
  Smartphone,
  Mail,
  MapPin,
  Clock,
  Share2,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import {
  contactViaWhatsApp,
  emergencyConsultationViaWhatsApp,
  submitContactFormViaWhatsApp,
} from "@/lib/whatsapp";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import { TikTokIcon, ThreadsIcon } from "@/components/social-icons";

const SERVICE_OPTIONS = [
  { value: "ayurvedic-consultation", label: "Ayurvedic Consultation" },
  { value: "online-consultation", label: "Online Consultation" },
  { value: "nakshatra-services", label: "Nakshatra Services" },
  { value: "product-inquiry", label: "Product Inquiry" },
  { value: "general-inquiry", label: "General Inquiry" },
] as const;

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
    const serviceLabel = SERVICE_OPTIONS.find(
      (option) => option.value === formData.service
    )?.label;
    submitContactFormViaWhatsApp({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: serviceLabel,
      subject: formData.subject,
      message: formData.message,
    });
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
                        {SERVICE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
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
              <a
                href="tel:+94702048015"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                  <Smartphone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Mobile</p>
                  <p className="text-stone-600 group-hover:text-emerald-700 transition-colors">
                    +94 70 204 8015
                  </p>
                </div>
              </a>

              <a
                href="tel:+94473477938"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                  <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Telephone</p>
                  <p className="text-stone-600 group-hover:text-emerald-700 transition-colors">
                    +94 47 34 77 938
                  </p>
                </div>
              </a>

              <a
                href="mailto:rathnadeepaherbal@gmail.com"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                  <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Email</p>
                  <p className="text-stone-600 break-all group-hover:text-emerald-700 transition-colors">
                    rathnadeepaherbal@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Share2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Social Media</p>
                  <p className="text-stone-600">Contact through social media</p>
                </div>
              </div>

              <Link
                href="/location"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                  <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Our Stores</p>
                  <p className="text-stone-600 group-hover:text-emerald-700 transition-colors">
                    Meet us in our stores
                  </p>
                </div>
              </Link>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Clock className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Hours</p>
                  <p className="text-stone-600">Mon-Sat: 8:30AM-7PM</p>
                  <p className="text-stone-600">Sun: 9AM-1PM</p>
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
                <Link
                  href="https://www.facebook.com/share/17qai7aUM5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center space-x-2 rounded-md border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-emerald-700 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Link>
                <Link
                  href="https://www.instagram.com/rathnadeepa_herbals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center space-x-2 rounded-md border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-emerald-700 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex items-center justify-center space-x-2 rounded-md border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-emerald-700 transition-colors"
                >
                  <TikTokIcon className="h-4 w-4" />
                  <span>TikTok</span>
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                  className="flex items-center justify-center space-x-2 rounded-md border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-emerald-700 transition-colors"
                >
                  <ThreadsIcon className="h-4 w-4" />
                  <span>Threads</span>
                </Link>
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
