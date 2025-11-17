"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ============================================================================
// GRADIENT MESH BACKGROUND
// ============================================================================

export function GradientMeshBackground({
  variant = "primary",
}: {
  variant?: "primary" | "secondary" | "tertiary";
}) {
  const prefersReducedMotion = useReducedMotion();

  const gradients = {
    primary: "from-green-50 via-emerald-50 to-teal-50",
    secondary: "from-amber-50 via-orange-50 to-yellow-50",
    tertiary: "from-blue-50 via-indigo-50 to-purple-50",
  };

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]} -z-10`}
    >
      {/* Animated gradient orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: [0, -50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  );
}

// ============================================================================
// AYURVEDIC PATTERN BACKGROUND
// ============================================================================

export function AyurvedicPattern() {
  return (
    <div className="absolute inset-0 -z-10 opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="ayurvedic-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Lotus petals */}
            <circle cx="50" cy="50" r="3" fill="#34a85a" />
            <path d="M50 35 Q45 40 50 45 Q55 40 50 35" fill="#34a85a" />
            <path d="M65 50 Q60 45 55 50 Q60 55 65 50" fill="#34a85a" />
            <path d="M50 65 Q55 60 50 55 Q45 60 50 65" fill="#34a85a" />
            <path d="M35 50 Q40 55 45 50 Q40 45 35 50" fill="#34a85a" />

            {/* Leaf patterns */}
            <path d="M20 20 Q22 15 25 20 Q22 25 20 20" fill="#34a85a" />
            <path d="M80 80 Q82 75 85 80 Q82 85 80 80" fill="#34a85a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ayurvedic-pattern)" />
      </svg>
    </div>
  );
}

// ============================================================================
// FLOATING LIGHT RAYS
// ============================================================================

export function FloatingLightRays() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-full bg-gradient-to-b from-transparent via-green-200/20 to-transparent"
          style={{
            left: `${20 + i * 15}%`,
            transform: "rotate(-10deg)",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// FLOATING HERBS PARTICLES
// ============================================================================

// Predefined positions to avoid hydration mismatch
const HERB_POSITIONS = [
  { left: 10, top: 15, duration: 12, delay: 0 },
  { left: 25, top: 75, duration: 15, delay: 1 },
  { left: 40, top: 30, duration: 18, delay: 2 },
  { left: 55, top: 85, duration: 14, delay: 0.5 },
  { left: 70, top: 20, duration: 16, delay: 1.5 },
  { left: 15, top: 60, duration: 13, delay: 2.5 },
  { left: 85, top: 45, duration: 17, delay: 3 },
  { left: 30, top: 90, duration: 15, delay: 1 },
  { left: 60, top: 10, duration: 19, delay: 2 },
  { left: 80, top: 70, duration: 14, delay: 0.5 },
  { left: 45, top: 55, duration: 16, delay: 3.5 },
  { left: 5, top: 40, duration: 13, delay: 1.5 },
  { left: 90, top: 25, duration: 18, delay: 2.5 },
  { left: 35, top: 5, duration: 15, delay: 4 },
  { left: 65, top: 95, duration: 17, delay: 0 },
];

export function FloatingHerbsParticles() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  const herbs = ["🌿", "🍃", "🌱", "🌾", "🪴"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {HERB_POSITIONS.map((position, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: position.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: position.delay,
          }}
        >
          {herbs[i % herbs.length]}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// ANIMATED DOTS GRID
// ============================================================================

// Predefined positions for dots to avoid hydration mismatch
const DOT_POSITIONS = [
  { left: 12, top: 18, scale: 1.2, duration: 3.5, delay: 0 },
  { left: 28, top: 72, scale: 1.4, duration: 4.2, delay: 0.5 },
  { left: 45, top: 35, scale: 1.3, duration: 3.8, delay: 1 },
  { left: 58, top: 88, scale: 1.5, duration: 4.5, delay: 1.5 },
  { left: 75, top: 25, scale: 1.2, duration: 3.2, delay: 0.2 },
  { left: 18, top: 65, scale: 1.4, duration: 4.0, delay: 0.8 },
  { left: 88, top: 42, scale: 1.3, duration: 3.5, delay: 1.2 },
  { left: 32, top: 92, scale: 1.5, duration: 4.8, delay: 0.4 },
  { left: 65, top: 15, scale: 1.2, duration: 3.6, delay: 1.8 },
  { left: 82, top: 68, scale: 1.4, duration: 4.3, delay: 0.6 },
  { left: 48, top: 52, scale: 1.3, duration: 3.7, delay: 1.4 },
  { left: 8, top: 38, scale: 1.5, duration: 4.1, delay: 1.0 },
  { left: 92, top: 22, scale: 1.2, duration: 3.4, delay: 0.3 },
  { left: 38, top: 8, scale: 1.4, duration: 4.6, delay: 1.6 },
  { left: 68, top: 95, scale: 1.3, duration: 3.9, delay: 0.9 },
  { left: 5, top: 55, scale: 1.5, duration: 4.4, delay: 1.1 },
  { left: 55, top: 5, scale: 1.2, duration: 3.3, delay: 0.7 },
  { left: 95, top: 78, scale: 1.4, duration: 4.7, delay: 1.3 },
  { left: 22, top: 45, scale: 1.3, duration: 3.6, delay: 1.7 },
  { left: 72, top: 82, scale: 1.5, duration: 4.0, delay: 0.5 },
];

export function AnimatedDotsGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #34a85a 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.05,
        }}
      />

      {!prefersReducedMotion && (
        <>
          {DOT_POSITIONS.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full"
              style={{
                left: `${dot.left}%`,
                top: `${dot.top}%`,
              }}
              animate={{
                scale: [1, dot.scale, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

// ============================================================================
// SECTION DIVIDER WITH ANIMATED LEAVES
// ============================================================================

export function AnimatedSectionDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-16 flex items-center justify-center my-8">
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      <motion.div
        className="relative bg-white px-6 flex items-center gap-3 z-10"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "backOut" }}
        viewport={{ once: true }}
      >
        <motion.span
          className="text-3xl"
          animate={
            !prefersReducedMotion
              ? {
                  rotate: [0, 10, -10, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍃
        </motion.span>

        <div className="w-2 h-2 bg-green-500 rounded-full" />

        <motion.span
          className="text-3xl"
          animate={
            !prefersReducedMotion
              ? {
                  rotate: [0, -10, 10, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🌿
        </motion.span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// GLOWING ORB CURSOR FOLLOWER
// ============================================================================

export function GlowingOrbFollower() {
  const prefersReducedMotion = useReducedMotion();

  // Don't render on server or if reduced motion is preferred
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed w-96 h-96 bg-green-400/10 rounded-full blur-3xl pointer-events-none -z-10"
      initial={{
        x: 0,
        y: 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    />
  );
}

// ============================================================================
// SECTION BACKGROUND WRAPPER
// ============================================================================

interface SectionBackgroundProps {
  children: React.ReactNode;
  variant?: "gradient" | "pattern" | "dots" | "mesh" | "none";
  className?: string;
}

export function SectionBackground({
  children,
  variant = "gradient",
  className = "",
}: SectionBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {variant === "gradient" && <GradientMeshBackground />}
      {variant === "pattern" && <AyurvedicPattern />}
      {variant === "dots" && <AnimatedDotsGrid />}
      {variant === "mesh" && (
        <>
          <GradientMeshBackground />
          <AyurvedicPattern />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
