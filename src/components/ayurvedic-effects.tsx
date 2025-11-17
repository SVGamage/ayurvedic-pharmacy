'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// ============================================================================
// FALLING LEAVES EFFECT
// ============================================================================

interface Leaf {
  id: number;
  startX: number;
  duration: number;
  delay: number;
  size: number;
}

export function FallingLeaves({ count = 15 }: { count?: number }) {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const newLeaves: Leaf[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 20 + Math.random() * 20,
    }));
    setLeaves(newLeaves);
  }, [count]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-green-600/30"
          style={{
            left: `${leaf.startX}%`,
            top: '-50px',
            fontSize: `${leaf.size}px`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(leaf.id) * 100, 0],
            rotate: [0, 360, 720],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// HERB PARTICLES EFFECT
// ============================================================================

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  color: string;
}

export function HerbParticles({
  x,
  y,
  count = 20,
  colors = ['#34a85a', '#86efac', '#dcfce7'],
}: {
  x: number;
  y: number;
  count?: number;
  colors?: string[];
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 50 + Math.random() * 50;
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        size: 4 + Math.random() * 6,
        duration: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles(newParticles);

    // Auto-remove after animation
    const timer = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timer);
  }, [x, y, count, colors]);

  if (prefersReducedMotion || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: particle.duration,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// CHAKRA ROTATION EFFECT
// ============================================================================

export function ChakraSpinner({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      animate={prefersReducedMotion ? {} : { rotate: 360 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#chakraGradient)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle cx="50" cy="10" r="4" fill="currentColor" />
        <circle cx="50" cy="90" r="4" fill="currentColor" />
        <circle cx="10" cy="50" r="4" fill="currentColor" />
        <circle cx="90" cy="50" r="4" fill="currentColor" />
        <circle cx="28" cy="28" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="72" cy="72" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="72" cy="28" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="28" cy="72" r="3" fill="currentColor" opacity="0.7" />
        <defs>
          <linearGradient id="chakraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34a85a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// ============================================================================
// MORTAR & PESTLE GRINDING ANIMATION
// ============================================================================

export function MortarPestleLoader({ size = 60 }: { size?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Mortar (Bowl) */}
      <div className="absolute bottom-0 w-full h-3/5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full border-4 border-amber-800" />

      {/* Pestle (Grinding stick) */}
      <motion.div
        className="absolute z-10 w-2 h-2/3 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full origin-bottom"
        style={{ transformOrigin: 'bottom center' }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: [0, -20, 20, -20, 20, 0],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Herb particles */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute w-1 h-1 bg-green-600 rounded-full"
            style={{ left: '40%', bottom: '30%' }}
            animate={{ scale: [1, 0, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-green-600 rounded-full"
            style={{ right: '40%', bottom: '30%' }}
            animate={{ scale: [1, 0, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </div>
  );
}

// ============================================================================
// WATER RIPPLE EFFECT
// ============================================================================

export function WaterRipple() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400/30"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
          style={{ width: 100, height: 100 }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// STEAM RISING EFFECT
// ============================================================================

export function SteamRising({ count = 5 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none h-32">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-8 h-8 bg-gradient-to-t from-gray-300/40 to-transparent rounded-full blur-md"
          style={{ left: `${20 + i * 15}%` }}
          animate={{
            y: [0, -100],
            opacity: [0.6, 0],
            scale: [1, 1.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// GROWING HERB ANIMATION
// ============================================================================

export function GrowingHerb({ delay = 0 }: { delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full h-full origin-bottom"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={
        prefersReducedMotion
          ? { scaleY: 1, opacity: 1 }
          : { scaleY: 1, opacity: 1 }
      }
      transition={{
        duration: prefersReducedMotion ? 0.01 : 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-green-600"
        fill="currentColor"
      >
        <path d="M50 100 L50 40 Q45 45 40 40 Q38 35 45 30 L50 40 Q55 35 60 40 Q62 45 55 50 L50 40 Q48 25 50 10 Q52 25 50 40 Z" />
        <circle cx="40" cy="35" r="8" opacity="0.7" />
        <circle cx="60" cy="45" r="8" opacity="0.7" />
      </svg>
    </motion.div>
  );
}

// ============================================================================
// SANSKRIT TEXT SHIMMER
// ============================================================================

export function SanskritShimmer({ text, className = '' }: { text: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={
        prefersReducedMotion
          ? {}
          : {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        background: 'linear-gradient(90deg, #34a85a, #f59e0b, #dc2626, #34a85a)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </motion.span>
  );
}

// ============================================================================
// FLOATING ELEMENT (Generic)
// ============================================================================

export function FloatingElement({
  children,
  duration = 6,
  yOffset = 20,
  xOffset = 10,
  className = '',
}: {
  children: React.ReactNode;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -yOffset, 0],
              x: [0, xOffset, -xOffset, 0],
              rotate: [0, 5, -5, 0],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// PULSE GLOW EFFECT
// ============================================================================

export function PulseGlow({
  children,
  color = 'rgba(52, 168, 90, 0.3)',
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        prefersReducedMotion
          ? {}
          : {
              boxShadow: [
                `0 0 20px ${color}`,
                `0 0 40px ${color}`,
                `0 0 20px ${color}`,
              ],
            }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
