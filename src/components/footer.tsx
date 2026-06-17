import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  Smartphone,
  Share2,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";
import leafDecoration from "@/assets/footer.png";
import Brand from "./brand";
import { TikTokIcon, ThreadsIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="bg-emerald-900 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex justify-center mb-6">
              <Brand isFooter={true} isColumn={true} width={120} height={120} />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-xs text-emerald-200 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-emerald-200 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-xs text-emerald-200 hover:text-white transition-colors"
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs text-emerald-200 hover:text-white transition-colors"
                >
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-xs text-emerald-200 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">
              Contacts
            </h5>
            <div className="space-y-4">
              <a
                href="tel:+94702048015"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-800 rounded-full text-emerald-300 group-hover:bg-emerald-700 transition-colors">
                  <Smartphone className="h-3 w-3" />
                </div>
                <span className="text-xs text-emerald-200 group-hover:text-white transition-colors">
                  +94 70 204 8015
                </span>
              </a>
              <a
                href="tel:+94473477938"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-800 rounded-full text-emerald-300 group-hover:bg-emerald-700 transition-colors">
                  <Phone className="h-3 w-3" />
                </div>
                <span className="text-xs text-emerald-200 group-hover:text-white transition-colors">
                  +94 47 34 77 938
                </span>
              </a>
              <a
                href="mailto:rathnadeepaherbal@gmail.com"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-800 rounded-full text-emerald-300 group-hover:bg-emerald-700 transition-colors">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="text-xs text-emerald-200 group-hover:text-white transition-colors break-all">
                  rathnadeepaherbal@gmail.com
                </span>
              </a>
              <Link href="/contact" className="flex items-center space-x-3 group">
                <div className="p-2 bg-emerald-800 rounded-full text-emerald-300 group-hover:bg-emerald-700 transition-colors">
                  <Share2 className="h-3 w-3" />
                </div>
                <span className="text-xs text-emerald-200 group-hover:text-white transition-colors">
                  Contact through social media
                </span>
              </Link>
              <Link
                href="/location"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-800 rounded-full text-emerald-300 group-hover:bg-emerald-700 transition-colors">
                  <MapPin className="h-3 w-3" />
                </div>
                <span className="text-xs text-emerald-200 group-hover:text-white transition-colors">
                  Meet us in our stores
                </span>
              </Link>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">
              Follow Us
            </h5>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/share/17qai7aUM5/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-emerald-800 rounded-full text-emerald-300 hover:bg-emerald-700 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/rathnadeepa_herbals/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-emerald-800 rounded-full text-emerald-300 hover:bg-emerald-700 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="p-2 bg-emerald-800 rounded-full text-emerald-300 hover:bg-emerald-700 hover:text-white transition-colors"
              >
                <TikTokIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="p-2 bg-emerald-800 rounded-full text-emerald-300 hover:bg-emerald-700 hover:text-white transition-colors"
              >
                <ThreadsIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-[10px] text-emerald-300">
            © 2024 Rathnadeepa Herbals. All rights reserved.
          </p>
        </div>
      </div>

      {/* Leaf decoration in bottom right corner */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-15 md:opacity-25 z-0">
        <Image
          src={leafDecoration}
          alt="Ayurvedic leaf decoration"
          width={400}
          height={400}
          className="object-contain"
          priority={false}
        />
      </div>
    </footer>
  );
}
