"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight, Leaf } from "lucide-react";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.png";
import heroImage3 from "@/assets/hero-3.jpg";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  breathingEffect,
  arrowSlide,
  buttonHover,
  buttonTap,
} from "@/lib/animation-variants";
import { FloatingElement, SanskritShimmer, ChakraSpinner } from "@/components/ayurvedic-effects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Hero slides data - only background images and gradients change
const heroSlides = [
  {
    id: 1,
    image: heroImage1,
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 2,
    image: heroImage2, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
  {
    id: 3,
    image: heroImage3, // Using same image for now - replace with different hero images
    gradient: "from-black/80 via-black/60 to-transparent",
  },
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSanskrit, setShowSanskrit] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // Toggle between Sanskrit and English
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowSanskrit(false);
      return;
    }

    const interval = setInterval(() => {
      setShowSanskrit((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background Carousel - Only images change */}
      <Carousel
        setApi={setApi}
        className="w-full h-full absolute inset-0"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative min-h-[80vh]">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
                  style={{
                    backgroundImage: `url(${slide.image.src || slide.image})`,
                  }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30 z-20" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30 z-20" />
      </Carousel>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <FloatingElement duration={8} yOffset={30} className="absolute top-20 left-10 opacity-30">
          <Leaf className="w-16 h-16 text-green-400" />
        </FloatingElement>
        <FloatingElement duration={10} yOffset={25} xOffset={15} className="absolute top-40 right-20 opacity-20">
          <ChakraSpinner className="w-20 h-20 text-amber-400" />
        </FloatingElement>
        <FloatingElement duration={7} yOffset={20} className="absolute bottom-32 left-1/4 opacity-25">
          <Leaf className="w-12 h-12 text-green-300 rotate-45" />
        </FloatingElement>
      </div>

      {/* Animated Content */}
      <div className="relative z-10 min-h-[80vh] flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading with Sanskrit/English Toggle */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                <AnimatePresence mode="wait">
                  {showSanskrit ? (
                    <motion.span
                      key="sanskrit"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SanskritShimmer text="आयुर्वेद" className="text-5xl md:text-7xl block mb-2" />
                      <span className="text-2xl md:text-3xl text-white/80">
                        (Science of Life)
                      </span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="english"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      Natural Healing with
                      <span className="text-primary"> Ayurvedic </span>
                      Wisdom
                    </motion.span>
                  )}
                </AnimatePresence>
              </h1>
            </motion.div>

            {/* Subtitle with Breathing Effect */}
            <motion.div variants={fadeInUp}>
              <motion.p
                className="text-xl text-white/90 mb-8 leading-relaxed"
                variants={breathingEffect}
                animate="animate"
              >
                Discover the power of traditional Ayurvedic medicine with our
                premium quality products and expert consultations for holistic
                wellness.
              </motion.p>
            </motion.div>

            {/* Animated Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
            >
              <motion.div
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button size="lg" className="group relative overflow-hidden">
                  <motion.span className="relative z-10 flex items-center">
                    Shop Products
                    <motion.span variants={arrowSlide}>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.span>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                >
                  Book Consultation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Slide Indicators */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: index === currentSlide ? 24 : 12,
                height: 12,
              }}
              transition={{ duration: 0.3 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
