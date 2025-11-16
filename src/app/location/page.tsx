"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Car, Bus, Train } from "lucide-react";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import EmbeddedMap from "@/components/embedded-map";
import { pharmacyLocation, locationInfo } from "@/config/location";

export default function LocationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  Our shop is conveniently located along the
                  Tissamaharama–Matara main road. From the Highway: Exit at the
                  Mattala Interchange, then continue towards Tissamaharama to
                  reach the Tissa–Matara main road. Free parking available
                  on-site.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Bus className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">By Bus</h3>
                <p className="text-gray-600 text-sm">
                  Bus routes 2, 334/1, and 32 stop directly in front of our
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
                  Train services are not available in this area.
                </p>
              </div>
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
              Ready to Visit
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Our Rathnadeepa Ayurvedic Shop?
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Visit us anytime to explore our wide range of authentic Ayurvedic
            products. No appointment needed, all are welcome.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent shadow-lg px-8 py-3"
              size="lg"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d991.4650981398622!2d81.266109!3d6.282077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69d4cb29100cd%3A0xbc057c7a6a52befa!2sRathnadeepa%20Aurvedic%20Pharmacy!5e0!3m2!1sen!2sus!4v1759433053036!5m2!1sen!2sus`,
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
