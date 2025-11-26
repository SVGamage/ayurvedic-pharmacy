"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Car, Bus, Train } from "lucide-react";
import { ReusableHeroSection } from "@/components/reusable-hero-section";
import EmbeddedMap from "@/components/embedded-map";
import { pharmacyLocation, locationInfo } from "@/config/location";

export default function LocationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 md:pt-40">
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
        <Card className="overflow-hidden border-stone-200 shadow-sm">
          <CardHeader className="bg-stone-50 border-b border-stone-100">
            <CardTitle className="flex items-center space-x-2 font-serif text-stone-800">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span>Our Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <EmbeddedMap height="400px" />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="bg-stone-50 border-b border-stone-100">
              <CardTitle className="font-serif text-stone-800">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Address</p>
                  <p className="text-stone-600">{pharmacyLocation.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Phone</p>
                  <p className="text-stone-600">{pharmacyLocation.phone}</p>
                  <p className="text-stone-600">
                    {locationInfo.emergencyPhone} (Emergency)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">Email</p>
                  <p className="text-stone-600">{locationInfo.email.general}</p>
                  <p className="text-stone-600">
                    {locationInfo.email.appointments}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="bg-stone-50 border-b border-stone-100">
              <CardTitle className="flex items-center space-x-2 font-serif text-stone-800">
                <Clock className="h-5 w-5 text-emerald-600" />
                <span>Operating Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {Object.entries(locationInfo.operatingHours).map(
                  ([day, hours]) => (
                    <div
                      key={day}
                      className="flex justify-between items-center border-b border-stone-100 pb-2 last:border-0"
                    >
                      <span className="font-medium text-stone-700">{day}</span>
                      <span className="text-stone-600">{hours}</span>
                    </div>
                  )
                )}
                <div className="pt-4">
                  <p className="text-sm text-emerald-700 font-medium bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center">
                    {locationInfo.emergencyNote}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Transportation Options */}
      <Card className="mb-8 shadow-sm border-stone-200">
        <CardHeader className="pb-4 bg-stone-50 border-b border-stone-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3 bg-white px-3 py-1 rounded-full border border-stone-200">
              <span className="text-sm font-medium text-stone-600 tracking-wider uppercase">
                Transportation
              </span>
            </div>
            <CardTitle className="text-2xl font-serif font-bold text-stone-800">
              How to Reach Us
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3 p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
              <div className="p-2 bg-emerald-100 rounded-full mt-1">
                <Car className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-serif font-semibold mb-2 text-stone-800">
                  By Car
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Our shop is conveniently located along the
                  Tissamaharama–Matara main road. From the Highway: Exit at the
                  Mattala Interchange, then continue towards Tissamaharama to
                  reach the Tissa–Matara main road. Free parking available
                  on-site.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
              <div className="p-2 bg-emerald-100 rounded-full mt-1">
                <Bus className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-serif font-semibold mb-2 text-stone-800">
                  By Bus
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Bus routes 2, 334/1, and 32 stop directly in front of our
                  center. The &ldquo;Wellness Center&rdquo; stop is announced on
                  all routes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
              <div className="p-2 bg-emerald-100 rounded-full mt-1">
                <Train className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-serif font-semibold mb-2 text-stone-800">
                  By Train
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Train services are not available in this area.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced CTA Section */}
      <Card className="bg-stone-50 border border-stone-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full -mr-20 -mt-20 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-100 rounded-full -ml-10 -mb-10 opacity-30 blur-3xl"></div>

        <CardContent className="p-10 text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-6 bg-white px-4 py-1.5 rounded-full shadow-sm border border-stone-100">
            <span className="text-sm font-medium text-emerald-700 tracking-wider uppercase">
              Visit Us Today
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-stone-800">
            Ready to Visit <br />
            <span className="text-emerald-700 italic">
              Our Rathnadeepa Ayurvedic Shop?
            </span>
          </h2>

          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Visit us anytime to explore our wide range of authentic Ayurvedic
            products. No appointment needed, all are welcome.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 bg-transparent shadow-sm px-8 py-6 text-lg font-serif"
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
