'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Custom hook for scroll-based animations
 * Triggers animation when element enters viewport
 */
export function useScrollAnimation(options?: {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options || {};

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return { ref, inView };
}

/**
 * Custom hook for staggered scroll animations
 * Returns refs and visibility states for multiple elements
 */
export function useStaggeredScroll(count: number, options?: {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options || {};

  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            if (triggerOnce) {
              observer.disconnect();
            }
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [count, threshold, triggerOnce, rootMargin]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, visibleItems };
}

/**
 * Custom hook for parallax scroll effect
 * Returns a transform value based on scroll position
 */
export function useParallax(speed: number = 0.5) {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrolled;
        const offset = (scrolled - elementTop) * speed;
        setOffsetY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offsetY };
}

/**
 * Custom hook for scroll progress
 * Returns percentage of element scrolled (0-100)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate how much of the element has been scrolled past
        const scrolled = viewportHeight - rect.top;
        const total = elementHeight + viewportHeight;
        const percentage = Math.max(0, Math.min(100, (scrolled / total) * 100));

        setProgress(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}

/**
 * Custom hook for viewport visibility
 * Returns whether element is currently visible in viewport
 */
export function useIsVisible(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const { threshold = 0, rootMargin = '0px' } = options || {};
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

/**
 * Custom hook for scroll direction detection
 * Returns 'up' or 'down' based on scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > prevScroll) {
        setScrollDirection('down');
      } else if (currentScroll < prevScroll) {
        setScrollDirection('up');
      }

      setPrevScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  return scrollDirection;
}

/**
 * Custom hook for smooth scroll to element
 */
export function useSmoothScroll() {
  const scrollToElement = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return { scrollToElement };
}
