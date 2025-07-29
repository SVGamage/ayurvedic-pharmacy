"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We&apos;re here to help you on your wellness journey. Reach out to us for consultations, product inquiries, or any
          questions about Ayurvedic healing.
        </p>
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
                    <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ayurvedic-consultation">Ayurvedic Consultation</SelectItem>
                        <SelectItem value="online-consultation">Online Consultation</SelectItem>
                        <SelectItem value="nakshatra-services">Nakshatra Services</SelectItem>
                        <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                        <SelectItem value="general-inquiry">General Inquiry</SelectItem>
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

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
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
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
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
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Emergency Consultation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Need urgent Ayurvedic advice? Our emergency consultation service is available 24/7.
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
              <h4 className="font-semibold mb-2">How do I book a consultation?</h4>
              <p className="text-gray-600 text-sm mb-4">
                You can book online through our website, call us directly, or visit our center. Online bookings are
                available 24/7.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Do you offer online consultations?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes, we provide secure video consultations with our experienced Ayurvedic doctors. Prescriptions and
                follow-ups are handled digitally.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Are your products certified?</h4>
              <p className="text-gray-600 text-sm mb-4">
                All our products are certified organic and follow traditional Ayurvedic preparation methods. We maintain
                the highest quality standards.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What is included in Nakshatra services?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Our Nakshatra services include horoscope reading, auspicious timing calculations, name selection, and
                personalized ritual guidance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
