import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp";
import leafDecoration from "@/assets/footer.png";
import FooterBadge from "./footer-badge";

export function Footer() {
  return (
    <footer className="bg-green-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20 justify-items-center md:justify-items-center">
          <FooterBadge />
          {/* <div className="text-center md:text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-green-100 hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-green-100 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-green-100 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-green-100 hover:text-white"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div> */}

          <div className="text-center md:text-center">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-green-100">Ayurvedic Consultation</span>
              </li>
              <li>
                <span className="text-green-100">Online Consultation</span>
              </li>
              <li>
                <span className="text-green-100">Nakshatra Services</span>
              </li>
              <li>
                <span className="text-green-100">Custom Remedies</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-center">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-100">
                  {WHATSAPP_CONFIG.displayNumber}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-green-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-green-100">
                  info@ayurvedapharmacy.com
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-green-100">
                  123 Wellness St, Natural City
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p className="text-green-100">
            © 2024 AyurVeda Pharmacy. All rights reserved. |
            <Link href="/privacy" className="hover:text-white ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-white ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>

      {/* Leaf decoration in bottom right corner */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-25 md:opacity-50 z-10">
        <Image
          src={leafDecoration}
          alt="Ayurvedic leaf decoration"
          width={400}
          height={250}
          className="object-contain "
          priority={false}
          style={{
            filter: "brightness(1.3) contrast(1.2) hue-rotate(10deg)",
          }}
        />
      </div>
    </footer>
  );
}
