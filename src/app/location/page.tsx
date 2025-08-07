import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Car, Bus, Train } from "lucide-react";

export default function LocationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header Section */}
      <div className="relative mb-16 text-center">
        {/* Background decoration with map-inspired elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-full opacity-40 blur-3xl"></div>
          {/* Map pin style decorations */}
          <div className="absolute top-8 left-1/4 w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
          <div className="absolute top-16 right-1/3 w-3 h-3 bg-blue-500 rounded-full shadow-md"></div>
          <div className="absolute top-4 right-1/4 w-2 h-2 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Location badge */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Find Our Sanctuary
          </div>
        </div>

        {/* Main title with location theme */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="block text-gray-900 mb-2">Visit Our</span>
          <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Wellness Sanctuary
          </span>
        </h1>

        {/* Enhanced subtitle */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-6">
            Experience authentic Ayurvedic healing in our serene wellness center
          </p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed">
              Located in the heart of the city, our center provides a peaceful
              sanctuary where ancient healing traditions meet modern comfort.
              Step into our tranquil space and begin your journey to natural
              wellness.
            </p>
          </div>
        </div>

        {/* Location highlights */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Car className="h-4 w-4 text-green-600" />
            <span>Free Parking</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Extended Hours</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Phone className="h-4 w-4 text-emerald-600" />
            <span>24/7 Emergency</span>
          </div>
        </div>

        {/* Decorative map-style lines */}
        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-green-300"></div>
          <MapPin className="h-5 w-5 text-green-600" />
          <div className="w-16 h-px bg-green-300"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-16 h-px bg-blue-300"></div>
          <MapPin className="h-4 w-4 text-blue-500" />
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-300"></div>
        </div>
      </div>

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
            <div className="aspect-video bg-green-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">
                  Google Maps integration would be placed here
                </p>
              </div>
            </div>
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
                  <p className="text-gray-600">
                    123 Wellness Street, Natural Healing District
                  </p>
                  <p className="text-gray-600">Ayurveda City, AC 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 123-4568 (Emergency)</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@ayurvedapharmacy.com</p>
                  <p className="text-gray-600">
                    appointments@ayurvedapharmacy.com
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
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-green-600 font-medium">
                    Emergency consultations available 24/7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transportation Options */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How to Reach Us</CardTitle>
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

      {/* Facilities */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Facilities</CardTitle>
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

      {/* CTA Section */}
      <Card className="bg-green-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Visit Us?
          </h2>
          <p className="text-gray-600 mb-6">
            Schedule your appointment today and begin your journey to natural
            wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700" size="lg">
              Book Appointment
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
              size="lg"
            >
              Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
