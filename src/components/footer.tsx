import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp";
import leafDecoration from "@/assets/footer.png";
import Brand from "./brand";

export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex justify-center mb-6">
              <Brand
                isFooter={false}
                isColumn={true}
                width={120}
                height={120}
              />
            </Link>
            <div className="flex space-x-6 mt-4 md:mt-0 justify-center">
              <Link
                href="#"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-6">
              Shop
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=herbal-supplements"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Herbal Supplements
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=oils-balms"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Oils &amp; Balms
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=immunity-kits"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Immunity Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h5 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-6">
              Services
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Ayurvedic Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Nakshatra Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  Custom Remedies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-6">
              Contact
            </h5>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-emerald-50 rounded-full text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <MessageCircle className="h-3 w-3" />
                </div>
                <span className="text-xs text-stone-500 group-hover:text-emerald-700 transition-colors">
                  {WHATSAPP_CONFIG.displayNumber}
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-emerald-50 rounded-full text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <Phone className="h-3 w-3" />
                </div>
                <span className="text-xs text-stone-500 group-hover:text-emerald-700 transition-colors">
                  +94 (047) 347-7938
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-emerald-50 rounded-full text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="text-xs text-stone-500 group-hover:text-emerald-700 transition-colors">
                  info@ayurvedapharmacy.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-[10px] text-stone-400">
            © 2024 Rathnadeepa Herbals. All rights reserved.
          </p>
        </div>
      </div>

      {/* Leaf decoration in bottom right corner */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-10 md:opacity-20 z-0">
        <Image
          src={leafDecoration}
          alt="Ayurvedic leaf decoration"
          width={400}
          height={250}
          className="object-contain"
          priority={false}
          style={{
            filter: "grayscale(100%) contrast(1.2)",
          }}
        />
      </div>
    </footer>
  );
}
