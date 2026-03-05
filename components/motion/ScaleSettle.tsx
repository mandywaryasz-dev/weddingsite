"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";

type ScaleSettleProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  delay?: number;
};

export function ScaleSettle({
  children,
  className,
  scaleFrom = motionTokens.scaleSettle.from,
  delay = 0,
  ...options
}: ScaleSettleProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useScrollReveal(options);

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: scaleFrom };

  const shown = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: motionTokens.scaleSettle.to };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{
        duration: motionTokens.scaleSettle.duration,
        ease: [...motionTokens.scaleSettle.ease],
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
