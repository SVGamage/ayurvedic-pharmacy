import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp";
import leafDecoration from "@/assets/footer.png";
import FooterBadge from "./footer-badge";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <FooterBadge />
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-green-100 border-b border-green-700/50 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-green-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Products</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-green-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Services</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-green-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Location</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-green-100 border-b border-green-700/50 pb-2">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-green-200 hover:text-white transition-colors duration-300 cursor-default">
                Ayurvedic Consultation
              </li>
              <li className="text-green-200 hover:text-white transition-colors duration-300 cursor-default">
                Online Consultation
              </li>
              <li className="text-green-200 hover:text-white transition-colors duration-300 cursor-default">
                Nakshatra Services
              </li>
              <li className="text-green-200 hover:text-white transition-colors duration-300 cursor-default">
                Custom Remedies
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-green-100 border-b border-green-700/50 pb-2">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-green-200 hover:text-white transition-all duration-300 group justify-center md:justify-start"
              >
                <MessageCircle className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline underline-offset-4">
                  {WHATSAPP_CONFIG.displayNumber}
                </span>
              </a>
              <a
                href="tel:+94473477938"
                className="flex items-center space-x-3 text-green-200 hover:text-white transition-all duration-300 group justify-center md:justify-start"
              >
                <Phone className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline underline-offset-4">+94 (047) 347-7938</span>
              </a>
              <a
                href="mailto:info@ayurvedapharmacy.com"
                className="flex items-center space-x-3 text-green-200 hover:text-white transition-all duration-300 group justify-center md:justify-start"
              >
                <Mail className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline underline-offset-4 text-sm">
                  info@ayurvedapharmacy.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700/50 mt-12 pt-8 text-center">
          <p className="text-green-200 text-sm">
            © {new Date().getFullYear()} AyurVeda Pharmacy. All rights reserved.
            <span className="mx-2 text-green-600">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2 text-green-600">|</span>
            <Link href="/terms" className="hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>

      {/* Leaf decoration in bottom right corner */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-20 md:opacity-30 z-0">
        <Image
          src={leafDecoration}
          alt="Ayurvedic leaf decoration"
          width={400}
          height={250}
          className="object-contain"
          priority={false}
          style={{
            filter: "brightness(1.3) contrast(1.2) hue-rotate(10deg)",
          }}
        />
      </div>
    </footer>
  );
}
