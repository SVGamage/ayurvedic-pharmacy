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
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-gradient-to-r from-green-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl shadow-2xl shadow-green-100/50"
          : "bg-gradient-to-r from-white via-green-50/30 to-white"
      )}
      initial="hidden"
      animate="visible"
      variants={!prefersReducedMotion ? navbarSlideDown : {}}
    >
      {/* Animated gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Floating particles in header */}
      {!prefersReducedMotion && scrolled && (
        <>
          <motion.div
            className="absolute top-2 left-1/4 w-2 h-2 bg-green-400/30 rounded-full blur-sm"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-3 right-1/3 w-1.5 h-1.5 bg-emerald-400/30 rounded-full blur-sm"
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}

      <nav className="mx-auto max-w-7xl" aria-label="Top">
        <div className="flex w-full items-center justify-between py-1 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Brand isFooter={false} width={150} height={150} />
            </Link>
          </div>
          <div className="ml-10 hidden space-x-8 lg:flex items-center">
            {navigation.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-base font-semibold transition-all duration-300 relative group px-2 py-1",
                    pathname === link.href
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  )}
                >
                  {link.name}

                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 rounded-full"
                    initial={{ width: pathname === link.href ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />

                  {/* Glow effect on hover */}
                  {pathname === link.href && (
                    <motion.span
                      className="absolute inset-0 bg-green-100/50 rounded-md -z-10"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="ml-10 hidden lg:block">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34, 168, 90, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10">Book Consultation</span>
              </Button>
            </motion.div>
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
