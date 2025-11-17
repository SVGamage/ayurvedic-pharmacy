import type React from "react";
import { Inter, Tangerine } from "next/font/google";
import "./globals.css";
import LayoutComponent from "./_components/layout-components";
import { Metadata } from "next";
import LayoutEffects from "@/components/layout-effects";

export const metadata: Metadata = {
  title: "Rathnadeepa Herbals - Natural Healing & Traditional Medicine",
  description:
    "Authentic Ayurvedic medicines, consultations, and traditional healing products. Expert Ayurvedic doctors and Nakshatra services available.",
  keywords:
    "Ayurveda, herbal medicine, natural healing, Ayurvedic consultation, traditional medicine",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  preload: true,
  variable: "--font-inter",
});
const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["cursive"],
  variable: "--font-tangerine",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${tangerine.variable} font-sans`}>
        <LayoutEffects />
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
