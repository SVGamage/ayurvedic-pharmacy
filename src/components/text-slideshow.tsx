"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextSlideshowProps {
  /** Array of strings or React nodes to cycle through */
  texts: React.ReactNode[];
  /** Time in milliseconds between slide transitions (default: 5000ms) */
  interval?: number;
  /** Additional classes for the outer wrapper container */
  className?: string;
  /** Additional classes for each text item */
  textClassName?: string;
  /** HTML element tag to render for each item (default: "p") */
  as?: React.ElementType;
}

export function TextSlideshow({
  texts,
  interval = 5000,
  className,
  textClassName,
  as: Component = "p",
}: TextSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  if (!texts || texts.length === 0) return null;

  return (
    <div className={cn("grid items-center", className)}>
      {texts.map((text, index) => (
        <Component
          key={index}
          aria-hidden={index !== currentIndex}
          className={cn(
            "col-start-1 row-start-1 transition-all duration-700 ease-in-out",
            index === currentIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none select-none",
            textClassName,
          )}
        >
          {text}
        </Component>
      ))}
    </div>
  );
}
