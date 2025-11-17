"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Brand from "./brand";
import { motion, AnimatePresence } from "framer-motion";
import { mobileMenuSlide, mobileMenuOverlay, navbarSlideDown, staggerFastContainer, fadeInUp } from "@/lib/animation-variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "shadow-sm sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      )}
      initial="hidden"
      animate="visible"
      variants={!prefersReducedMotion ? navbarSlideDown : {}}
    >
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                variants={mobileMenuOverlay}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setMobileMenuOpen(false)}
                style={{ top: '72px' }}
              />

              {/* Mobile Menu */}
              <motion.div
                className="lg:hidden bg-white border-t border-green-100"
                variants={!prefersReducedMotion ? staggerFastContainer : {}}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((link, index) => (
                    <motion.div
                      key={link.name}
                      variants={!prefersReducedMotion ? fadeInUp : {}}
                      custom={index}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-base font-medium transition-colors flex items-center gap-2",
                          pathname === link.href
                            ? "bg-green-100 text-green-600"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Leaf className="w-4 h-4" />
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    className="px-3 py-2"
                    variants={!prefersReducedMotion ? fadeInUp : {}}
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Book Consultation
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
