import type React from "react";
import type { Metadata } from "next";
import { Inter, Tangerine } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";

const inter = Inter({ subsets: ["latin"] });
const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
});

export const metadata: Metadata = {
  title: "Rathnadeepa Herbals - Natural Healing & Traditional Medicine",
  description:
    "Authentic Ayurvedic medicines, consultations, and traditional healing products. Expert Ayurvedic doctors and Nakshatra services available.",
  keywords:
    "Ayurveda, herbal medicine, natural healing, Ayurvedic consultation, traditional medicine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${tangerine.variable}`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
