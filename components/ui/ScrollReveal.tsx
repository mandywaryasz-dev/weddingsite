"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";

type ScrollRevealProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className, ...options }: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useScrollReveal(options);

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: motionTokens.reveal.y, scale: 1 };
  const shown = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: motionTokens.reveal.scale };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{ duration: motionTokens.reveal.duration, ease: motionTokens.reveal.ease }}
    >
      {children}
    </motion.div>
  );
}
