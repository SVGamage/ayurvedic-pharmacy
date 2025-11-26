"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface HeroSectionProps {
  /** Pre-title text that appears above the main title */
  preTitle: string;
  /** Main title - first line (usually in gray-black gradient) */
  titleLine1: string;
  /** Main title - second line (usually in green gradient) */
  titleLine2: string;
  /** Subtitle text that appears below the main title */
  subtitle: string;
  /** Description text that appears in the highlighted box */
  description: string;
  /** Array of badge texts to display in the description box */
  badges?: string[];
  /** Custom background decorations (optional) */
  backgroundDecorations?: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Color theme for the hero section */
  theme?: "green" | "blue" | "purple" | "yellow" | "red";
  /** Custom gradient colors for the title lines */
  customGradients?: {
    preTitle?: string;
    titleLine1?: string;
    titleLine2?: string;
    titleLine2Text?: string;
  };
}

export const themeColors = {
  green: {
    preTitle: "text-emerald-600",
    titleColor1: "text-stone-800",
    titleColor2: "text-emerald-700",
    decorationBg: "bg-emerald-100",
    decorationBg2: "bg-emerald-50",
    decorationBg3: "bg-stone-100",
    descriptionBg: "bg-stone-50",
    badgeColors: ["text-emerald-700", "text-emerald-800", "text-emerald-900"],
    dots: "bg-emerald-500",
    lineGradient: "from-transparent via-emerald-500 to-transparent",
    iconColor: "text-emerald-600",
  },
  blue: {
    preTitle: "text-blue-600",
    titleColor1: "text-stone-800",
    titleColor2: "text-blue-700",
    decorationBg: "bg-blue-100",
    decorationBg2: "bg-blue-50",
    decorationBg3: "bg-stone-100",
    descriptionBg: "bg-stone-50",
    badgeColors: ["text-blue-700", "text-blue-800", "text-blue-900"],
    dots: "bg-blue-500",
    lineGradient: "from-transparent via-blue-500 to-transparent",
    iconColor: "text-blue-600",
  },
  purple: {
    preTitle: "text-purple-600",
    titleColor1: "text-stone-800",
    titleColor2: "text-purple-700",
    decorationBg: "bg-purple-100",
    decorationBg2: "bg-purple-50",
    decorationBg3: "bg-stone-100",
    descriptionBg: "bg-stone-50",
    badgeColors: ["text-purple-700", "text-purple-800", "text-purple-900"],
    dots: "bg-purple-500",
    lineGradient: "from-transparent via-purple-500 to-transparent",
    iconColor: "text-purple-600",
  },
  yellow: {
    preTitle: "text-amber-600",
    titleColor1: "text-stone-800",
    titleColor2: "text-amber-700",
    decorationBg: "bg-amber-100",
    decorationBg2: "bg-amber-50",
    decorationBg3: "bg-stone-100",
    descriptionBg: "bg-stone-50",
    badgeColors: ["text-amber-700", "text-amber-800", "text-amber-900"],
    dots: "bg-amber-500",
    lineGradient: "from-transparent via-amber-500 to-transparent",
    iconColor: "text-amber-600",
  },
  red: {
    preTitle: "text-rose-600",
    titleColor1: "text-stone-800",
    titleColor2: "text-rose-700",
    decorationBg: "bg-rose-100",
    decorationBg2: "bg-rose-50",
    decorationBg3: "bg-stone-100",
    descriptionBg: "bg-stone-50",
    badgeColors: ["text-rose-700", "text-rose-800", "text-rose-900"],
    dots: "bg-rose-500",
    lineGradient: "from-transparent via-rose-500 to-transparent",
    iconColor: "text-rose-600",
  },
};

const DefaultBackgroundDecorations = ({
  theme = "green",
}: {
  theme: HeroSectionProps["theme"];
}) => {
  const colors = themeColors[theme];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className={cn(
          "absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl",
          colors.decorationBg
        )}
      ></div>
      <div
        className={cn(
          "absolute top-20 left-10 w-32 h-32 rounded-full opacity-30 blur-2xl",
          colors.decorationBg2
        )}
      ></div>
      <div
        className={cn(
          "absolute bottom-10 right-10 w-40 h-40 rounded-full opacity-30 blur-2xl",
          colors.decorationBg3
        )}
      ></div>
    </div>
  );
};

export function ReusableHeroSection({
  preTitle,
  titleLine1,
  titleLine2,
  subtitle,
  backgroundDecorations,
  className,
  theme = "green",
  customGradients,
}: HeroSectionProps) {
  const colors = themeColors[theme];

  // Use custom colors if provided, otherwise use theme colors
  const textColors = {
    preTitle: customGradients?.preTitle || colors.preTitle,
    titleLine1: customGradients?.titleLine1 || colors.titleColor1,
    titleLine2: customGradients?.titleLine2Text || colors.titleColor2,
  };

  return (
    <div className={cn("relative py-12 text-center", className)}>
      {/* Background decorations */}
      {backgroundDecorations || <DefaultBackgroundDecorations theme={theme} />}

      {/* Main title with gradient */}
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center justify-center mb-6 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-stone-100">
          <Leaf className={cn("h-4 w-4 mr-2", colors.iconColor)} />
          <span
            className={cn(
              "text-sm font-medium tracking-wider uppercase",
              textColors.preTitle
            )}
          >
            {preTitle}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
          <span className={cn("block mb-2", textColors.titleLine1)}>
            {titleLine1}
          </span>
          <span className={cn("block italic", textColors.titleLine2)}>
            {titleLine2}
          </span>
        </h1>
      </div>

      {/* Enhanced subtitle */}
      <div className="max-w-3xl mx-auto mb-10 relative z-10">
        <p className="text-xl text-stone-600 leading-relaxed font-light">
          {subtitle}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center items-center space-x-3">
        <div
          className={cn("w-1.5 h-1.5 rounded-full opacity-40", colors.dots)}
        ></div>
        <div
          className={cn("w-2 h-2 rounded-full opacity-60", colors.dots)}
        ></div>
        <div className={cn("w-3 h-3 rounded-full", colors.dots)}></div>
        <div
          className={cn("w-2 h-2 rounded-full opacity-60", colors.dots)}
        ></div>
        <div
          className={cn("w-1.5 h-1.5 rounded-full opacity-40", colors.dots)}
        ></div>
      </div>
    </div>
  );
}
