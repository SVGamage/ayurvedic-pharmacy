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
    <div className="fixed bottom-6 right-6 z-50 group/floating">
      <div className="relative">
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-30 blur-md group-hover/floating:opacity-50 transition-opacity duration-300"></div>

        <Button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white rounded-full w-16 h-16 p-0 flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
          size="lg"
        >
          <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform drop-shadow-lg" />
          <span className="sr-only">Contact us on WhatsApp</span>
        </Button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-20 right-0 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl">
              Chat with us on WhatsApp
              <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900/95"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
