import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Car, Bus, Train } from "lucide-react"

export default function LocationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Visit Our Wellness Center</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience authentic Ayurvedic healing in our serene wellness center. Located in the heart of the city, we
          provide a peaceful sanctuary for your healing journey.
        </p>
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
                <p className="text-sm text-gray-500">Google Maps integration would be placed here</p>
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
                  <p className="text-gray-600">123 Wellness Street, Natural Healing District</p>
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
                  <p className="text-gray-600">appointments@ayurvedapharmacy.com</p>
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
                  <p className="text-sm text-green-600 font-medium">Emergency consultations available 24/7</p>
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
                  Free parking available on-site. Take Exit 15 from Highway 101, then follow Wellness Street for 2
                  miles. Our center is on the right side.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Bus className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">By Bus</h3>
                <p className="text-gray-600 text-sm">
                  Bus routes 42, 67, and 89 stop directly in front of our center. The &ldquo;Wellness Center&rdquo; stop is
                  announced on all routes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Train className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">By Train</h3>
                <p className="text-gray-600 text-sm">
                  Natural Healing Station is 0.5 miles away. Take the Green Line and exit at Natural Healing Station,
                  then walk or take bus 42.
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
              <p className="text-gray-600 text-sm">Private, comfortable rooms for personalized consultations</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-semibold mb-2">Herbal Pharmacy</h3>
              <p className="text-gray-600 text-sm">Fresh, authentic herbs and medicines prepared daily</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="font-semibold mb-2">Meditation Hall</h3>
              <p className="text-gray-600 text-sm">Peaceful space for meditation and yoga sessions</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💆</span>
              </div>
              <h3 className="font-semibold mb-2">Treatment Rooms</h3>
              <p className="text-gray-600 text-sm">Specialized rooms for Panchakarma and other therapies</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Library</h3>
              <p className="text-gray-600 text-sm">Extensive collection of Ayurvedic texts and resources</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Herb Garden</h3>
              <p className="text-gray-600 text-sm">On-site medicinal plant garden for fresh ingredients</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-green-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Visit Us?</h2>
          <p className="text-gray-600 mb-6">
            Schedule your appointment today and begin your journey to natural wellness.
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
  )
}
