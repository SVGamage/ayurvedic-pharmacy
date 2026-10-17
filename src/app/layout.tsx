import type React from "react";
import { Inter, Noto_Sans_Sinhala, Source_Serif_4, Tangerine } from "next/font/google";
import "./globals.css";
import LayoutComponent from "./_components/layout-components";
import { Metadata } from "next";

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
// Headline serif. The optical-size axis lets display sizes tighten up and small headings stay sturdy.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  variable: "--font-source-serif",
});
// Sinhala glyphs. Inter has none; this sits behind Inter in the sans stack and
// is only fetched (via unicode-range) on pages that render Sinhala text.
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  display: "swap",
  preload: false,
  variable: "--font-sinhala",
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
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${notoSinhala.variable} ${tangerine.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
