'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if user prefers reduced motion
 * Respects system-level accessibility preferences
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;

    // Check for matchMedia support
    if (!window.matchMedia) {
      setPrefersReducedMotion(false);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Helper function to get animation duration based on reduced motion preference
 */
export function getAnimationDuration(
  normalDuration: number,
  prefersReducedMotion: boolean
): number {
  return prefersReducedMotion ? 0.01 : normalDuration;
}

/**
 * Helper function to conditionally apply animations
 */
export function conditionalAnimation<T>(
  animation: T,
  prefersReducedMotion: boolean,
  fallback?: T
): T | undefined {
  if (prefersReducedMotion) {
    return fallback;
  }
  return animation;
}
