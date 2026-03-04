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

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, clipPath: clipHidden };

  const shown = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, clipPath: clipShown };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{
        duration: motionTokens.mask.duration,
        ease: [...motionTokens.mask.ease],
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
