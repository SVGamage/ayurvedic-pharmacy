"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Brand from "./brand";

const navigation = [
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Location", href: "/location" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-stone-50/80 backdrop-blur-md border-stone-200/60 shadow-sm"
          : "bg-transparent border-transparent shadow-none"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <Brand isFooter={false} width={128} height={128} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-md font-medium transition-colors hover:text-emerald-700",
                pathname === link.href
                  ? "text-emerald-800 font-semibold"
                  : "text-stone-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/services">
            <Button className="hidden md:flex items-center space-x-2 bg-emerald-900 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition-all text-xs font-medium tracking-wide shadow-lg shadow-emerald-900/20">
              <span>Book Consult</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
          <button
            className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-stone-50 border-b border-stone-200 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="space-y-1 px-4 py-6">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-stone-600 hover:bg-stone-100 hover:text-emerald-700"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-900 hover:bg-emerald-800 text-white rounded-full py-6">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
