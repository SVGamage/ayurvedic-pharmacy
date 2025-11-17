"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactViaWhatsApp } from "@/lib/whatsapp";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleWhatsAppClick = () => {
    contactViaWhatsApp(
      "General Inquiry",
      "Hello! I'm interested in your Ayurvedic products and services. Could you please help me?"
    );
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative">
        {/* Ripple effect */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1.8],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1.8],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.7,
              }}
            />
          </>
        )}

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
        >
          <Button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
            size="lg"
          >
            <motion.div
              animate={!prefersReducedMotion ? {
                rotate: [0, 10, -10, 10, 0],
              } : {}}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
            <span className="sr-only">Contact us on WhatsApp</span>
          </Button>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute bottom-16 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              Chat with us on WhatsApp
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
