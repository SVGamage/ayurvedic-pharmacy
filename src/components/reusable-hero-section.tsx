"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
  };
}

const themeColors = {
  green: {
    preTitle: "text-green-600",
    titleGradient1: "from-gray-900 via-green-800 to-gray-900",
    titleGradient2: "from-green-600 via-emerald-500 to-green-500",
    decorationBg: "bg-green-100",
    decorationBg2: "bg-emerald-100",
    decorationBg3: "bg-teal-100",
    descriptionBg: "from-green-50 to-emerald-50",
    badgeColors: ["text-green-700", "text-emerald-700", "text-teal-700"],
    dots: "bg-green-500",
    lineGradient: "from-transparent via-green-500 to-transparent",
  },
  blue: {
    preTitle: "text-blue-600",
    titleGradient1: "from-gray-900 via-blue-800 to-gray-900",
    titleGradient2: "from-blue-600 via-cyan-500 to-blue-500",
    decorationBg: "bg-blue-100",
    decorationBg2: "bg-cyan-100",
    decorationBg3: "bg-sky-100",
    descriptionBg: "from-blue-50 to-cyan-50",
    badgeColors: ["text-blue-700", "text-cyan-700", "text-sky-700"],
    dots: "bg-blue-500",
    lineGradient: "from-transparent via-blue-500 to-transparent",
  },
  purple: {
    preTitle: "text-purple-600",
    titleGradient1: "from-gray-900 via-purple-800 to-gray-900",
    titleGradient2: "from-purple-600 via-violet-500 to-purple-500",
    decorationBg: "bg-purple-100",
    decorationBg2: "bg-violet-100",
    decorationBg3: "bg-indigo-100",
    descriptionBg: "from-purple-50 to-violet-50",
    badgeColors: ["text-purple-700", "text-violet-700", "text-indigo-700"],
    dots: "bg-purple-500",
    lineGradient: "from-transparent via-purple-500 to-transparent",
  },
  yellow: {
    preTitle: "text-yellow-600",
    titleGradient1: "from-gray-900 via-yellow-800 to-gray-900",
    titleGradient2: "from-yellow-600 via-orange-500 to-amber-500",
    decorationBg: "bg-yellow-100",
    decorationBg2: "bg-orange-100",
    decorationBg3: "bg-amber-100",
    descriptionBg: "from-yellow-50 to-orange-50",
    badgeColors: ["text-yellow-700", "text-orange-700", "text-amber-700"],
    dots: "bg-yellow-500",
    lineGradient: "from-transparent via-yellow-500 to-transparent",
  },
  red: {
    preTitle: "text-red-600",
    titleGradient1: "from-gray-900 via-red-800 to-gray-900",
    titleGradient2: "from-red-600 via-rose-500 to-red-500",
    decorationBg: "bg-red-100",
    decorationBg2: "bg-rose-100",
    decorationBg3: "bg-pink-100",
    descriptionBg: "from-red-50 to-rose-50",
    badgeColors: ["text-red-700", "text-rose-700", "text-pink-700"],
    dots: "bg-red-500",
    lineGradient: "from-transparent via-red-500 to-transparent",
  },
};

const DefaultBackgroundDecorations = ({
  theme = "green",
}: {
  theme: HeroSectionProps["theme"];
}) => {
  const colors = themeColors[theme];

  return (
    <div className="absolute inset-0 -z-10">
      <div
        className={cn(
          "absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full opacity-30 blur-3xl",
          colors.decorationBg
        )}
      ></div>
      <div
        className={cn(
          "absolute top-12 left-1/4 w-20 h-20 rounded-full opacity-20 blur-2xl",
          colors.decorationBg2
        )}
      ></div>
      <div
        className={cn(
          "absolute top-8 right-1/3 w-16 h-16 rounded-full opacity-25 blur-2xl",
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
  description,
  badges = [],
  backgroundDecorations,
  className,
  theme = "green",
  customGradients,
}: HeroSectionProps) {
  const colors = themeColors[theme];

  // Use custom gradients if provided, otherwise use theme colors
  const gradients = {
    preTitle: customGradients?.preTitle || colors.preTitle,
    titleLine1: customGradients?.titleLine1 || colors.titleGradient1,
    titleLine2: customGradients?.titleLine2 || colors.titleGradient2,
  };

  return (
    <div className={cn("relative mb-16 text-center", className)}>
      {/* Background decorations */}
      {backgroundDecorations || <DefaultBackgroundDecorations theme={theme} />}

      {/* Main title with gradient */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center mb-4">
          <div
            className={cn("h-px bg-gradient-to-r w-16", colors.lineGradient)}
          ></div>
          <span
            className={cn(
              "mx-4 text-sm font-medium tracking-wider uppercase",
              gradients.preTitle
            )}
          >
            {preTitle}
          </span>
          <div
            className={cn("h-px bg-gradient-to-r w-16", colors.lineGradient)}
          ></div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span
            className={cn(
              "bg-gradient-to-r bg-clip-text text-transparent",
              gradients.titleLine1
            )}
          >
            {titleLine1}
          </span>
          <br />
          <span
            className={cn(
              "bg-gradient-to-r bg-clip-text text-transparent",
              gradients.titleLine2
            )}
          >
            {titleLine2}
          </span>
        </h1>
      </div>

      {/* Enhanced subtitle */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-6">
          {subtitle}
        </p>
        <div
          className={cn(
            "bg-gradient-to-r rounded-2xl p-6 max-w-3xl mx-auto",
            colors.descriptionBg
          )}
        >
          <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={cn(
                    "bg-white/80 px-3 py-1 rounded-full font-medium",
                    colors.badgeColors[index % colors.badgeColors.length]
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center items-center space-x-2">
        <div className={cn("w-2 h-2 rounded-full", colors.dots)}></div>
        <div
          className={cn("w-1 h-1 rounded-full opacity-70", colors.dots)}
        ></div>
        <div className={cn("w-3 h-3 rounded-full", colors.dots)}></div>
        <div
          className={cn("w-1 h-1 rounded-full opacity-70", colors.dots)}
        ></div>
        <div className={cn("w-2 h-2 rounded-full", colors.dots)}></div>
      </div>
    </div>
  );
}
