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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl   " aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-green-500  lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Brand isFooter={false} width={150} height={150} />
            </Link>
          </div>
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-green-600",
                  pathname === link.href
                    ? "text-green-600 border-b-2 border-green-600 pb-1"
                    : "text-gray-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="ml-10 hidden lg:block">
            <Button className="bg-green-600 hover:bg-green-700">
              Book Consultation
            </Button>
          </div>
          <div className="ml-6 lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-green-100 text-green-600"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
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
