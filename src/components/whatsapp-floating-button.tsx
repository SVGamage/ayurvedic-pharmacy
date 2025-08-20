"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactViaWhatsApp } from "@/lib/whatsapp";
import { useState } from "react";

export function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    contactViaWhatsApp(
      "General Inquiry",
      "Hello! I'm interested in your Ayurvedic products and services. Could you please help me?"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none group"
          size="lg"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <span className="sr-only">Contact us on WhatsApp</span>
        </Button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-16 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap transition-opacity duration-300">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    </div>
  );
}
