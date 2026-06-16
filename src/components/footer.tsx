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

// lucide-react doesn't ship TikTok / Threads brand glyphs, so define them inline.
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.632 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291.503-.029 1.011-.009 1.51.06-.041-.299-.099-.598-.18-.882-.234-.822-.624-1.398-1.165-1.715-.546-.32-1.279-.485-2.18-.491h-.027c-.726 0-1.708.2-2.334 1.135l-1.681-1.13c.838-1.254 2.198-1.945 3.832-1.945h.04c2.732.017 4.36 1.694 4.522 4.604.093.04.185.08.275.123 1.27.598 2.198 1.502 2.685 2.614.679 1.554.741 4.083-1.318 6.12-1.573 1.557-3.482 2.258-6.182 2.277z" />
    </svg>
  );
}

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
