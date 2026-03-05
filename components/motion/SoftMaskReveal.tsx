"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";

type SoftMaskRevealProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
  direction?: "bottom" | "top";
  delay?: number;
};

export function SoftMaskReveal({
  children,
  className,
  direction = "bottom",
  delay = 0,
  ...options
}: SoftMaskRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useScrollReveal(options);

  // bottom: crop from bottom → inset(0 0 100% 0) → inset(0)
  // top: crop from top → inset(100% 0 0 0) → inset(0)
  const clipHidden =
    direction === "bottom" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)";
  const clipShown = "inset(0 0 0 0)";

  // Reduced motion: opacity-only snap, no clip
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={className}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: motionTokens.mask.duration, ease: [...motionTokens.mask.ease], delay: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  // Full animation: outer div handles opacity + IO ref, inner div handles clipPath
  const transition = {
    duration: motionTokens.mask.duration,
    ease: [...motionTokens.mask.ease] as [number, number, number, number],
    delay,
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={transition}
    >
      <motion.div
        initial={{ clipPath: clipHidden }}
        animate={isVisible ? { clipPath: clipShown } : { clipPath: clipHidden }}
        transition={transition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
