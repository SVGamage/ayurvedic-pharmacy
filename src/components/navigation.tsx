"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Brand from "./brand";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  // { name: "Blog", href: "/blog" },
  // { name: "Reviews", href: "/reviews" },
  { name: "Location", href: "/location" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50 transition-all duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-3 lg:py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group transition-transform hover:scale-105 duration-300">
              <Brand isFooter={false} width={150} height={150} />
            </Link>
          </div>
          <div className="ml-10 hidden space-x-1 lg:flex items-center">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-base font-medium rounded-lg transition-all duration-300",
                  pathname === link.href
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>
          <div className="ml-10 hidden lg:block">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-200 transition-all duration-300 hover:shadow-xl hover:shadow-green-300 hover:scale-105">
              Book Consultation
            </Button>
          </div>
          <div className="ml-6 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-green-50"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-green-100 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1 px-2 pb-4 pt-3">
              {navigation.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                    pathname === link.href
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 shadow-sm"
                      : "text-gray-700 hover:bg-green-50/70 hover:text-green-600 hover:shadow-sm"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-2 pt-2">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-200 transition-all duration-300 hover:shadow-xl">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
