"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Car, Bus, Train } from "lucide-react";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import CarouselGrid from "@/components/carousel-grid";
import EmbeddedMap from "@/components/embedded-map";
import { pharmacyLocation, locationInfo } from "@/config/location";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.png";
import heroImage3 from "@/assets/hero-3.jpg";

const heroSlides = [
  {
    id: 1,
    image: heroImage1,
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 2,
    image: heroImage2, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 3,
    image: heroImage3, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
];
export default function LocationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Three carousels in a row on large screens, single carousel on tablet/mobile */}
      <CarouselGrid heroSlidesArray={[heroSlides, heroSlides, heroSlides]} />
      {/* Enhanced Header Section */}
      <ReusableHeroSection
        preTitle="Find Our Sanctuary"
        titleLine1="Visit Our"
        titleLine2="Wellness Center"
        subtitle="Experience authentic Ayurvedic healing in our serene wellness center"
        description="Located in the heart of the city, our center provides a peaceful sanctuary where ancient healing traditions meet modern comfort. Step into our tranquil space and begin your journey to natural wellness."
        badges={["Free Parking", "Extended Hours", "24/7 Emergency"]}
        theme="green"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Map Section */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>Our Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <EmbeddedMap height="400px" />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{pharmacyLocation.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{pharmacyLocation.phone}</p>
                  <p className="text-gray-600">
                    {locationInfo.emergencyPhone} (Emergency)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{locationInfo.email.general}</p>
                  <p className="text-gray-600">
                    {locationInfo.email.appointments}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span>Operating Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(locationInfo.operatingHours).map(
                  ([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  )
                )}
                <div className="pt-2 border-t">
                  <p className="text-sm text-green-600 font-medium">
                    {locationInfo.emergencyNote}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Transportation Options */}
      <Card className="mb-8 shadow-sm border-green-100">
        <CardHeader className="pb-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-12"></div>
              <span className="mx-4 text-sm font-medium text-blue-600 tracking-wider uppercase">
                Transportation
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-12"></div>
            </div>
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                How to Reach Us
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Car className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">By Car</h3>
                <p className="text-gray-600 text-sm">
                  Free parking available on-site. Take Exit 15 from Highway 101,
                  then follow Wellness Street for 2 miles. Our center is on the
                  right side.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Bus className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">By Bus</h3>
                <p className="text-gray-600 text-sm">
                  Bus routes 42, 67, and 89 stop directly in front of our
                  center. The &ldquo;Wellness Center&rdquo; stop is announced on
                  all routes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Train className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">By Train</h3>
                <p className="text-gray-600 text-sm">
                  Natural Healing Station is 0.5 miles away. Take the Green Line
                  and exit at Natural Healing Station, then walk or take bus 42.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Facilities */}
      <Card className="mb-8 shadow-sm border-green-100">
        <CardHeader className="pb-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-12"></div>
              <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
                Wellness Spaces
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-12"></div>
            </div>
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Our Healing Facilities
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="font-semibold mb-2">Consultation Rooms</h3>
              <p className="text-gray-600 text-sm">
                Private, comfortable rooms for personalized consultations
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-semibold mb-2">Herbal Pharmacy</h3>
              <p className="text-gray-600 text-sm">
                Fresh, authentic herbs and medicines prepared daily
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="font-semibold mb-2">Meditation Hall</h3>
              <p className="text-gray-600 text-sm">
                Peaceful space for meditation and yoga sessions
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💆</span>
              </div>
              <h3 className="font-semibold mb-2">Treatment Rooms</h3>
              <p className="text-gray-600 text-sm">
                Specialized rooms for Panchakarma and other therapies
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Library</h3>
              <p className="text-gray-600 text-sm">
                Extensive collection of Ayurvedic texts and resources
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Herb Garden</h3>
              <p className="text-gray-600 text-sm">
                On-site medicinal plant garden for fresh ingredients
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced CTA Section */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg">
        <CardContent className="p-10 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-16"></div>
            <span className="mx-4 text-sm font-medium text-green-600 tracking-wider uppercase">
              Visit Us Today
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-16"></div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
              Ready to Visit Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Wellness Sanctuary?
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Schedule your appointment today and begin your journey to natural
            wellness in our peaceful healing environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-green-600 hover:bg-green-700 shadow-lg px-8 py-3"
              size="lg"
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent shadow-lg px-8 py-3"
              size="lg"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${pharmacyLocation.lat},${pharmacyLocation.lng}`,
                  "_blank"
                )
              }
            >
              Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
