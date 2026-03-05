"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";

type DividerDirection = "horizontal" | "vertical";
type HOrigin = "center" | "left" | "right";
type VOrigin = "center" | "top" | "bottom";

type DividerRuleProps = UseScrollRevealOptions & {
  direction: DividerDirection;
  origin?: HOrigin | VOrigin;
  delay?: number;
  className?: string;
};

const originMap: Record<string, string> = {
  center: "50% 50%",
  left: "0% 50%",
  right: "100% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
};

export function DividerRule({
  direction,
  origin = "center",
  delay = 0,
  className,
  ...options
}: DividerRuleProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useScrollReveal(options);

  const isH = direction === "horizontal";
  const scaleKey = isH ? "scaleX" : "scaleY";

  const hidden = { [scaleKey]: prefersReducedMotion ? 1 : 0 };
  const shown = { [scaleKey]: 1 };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{ transformOrigin: originMap[origin] }}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{
        duration: motionTokens.divider.duration,
        ease: [...motionTokens.divider.ease],
        delay: prefersReducedMotion ? 0 : delay,
      }}
      aria-hidden
    />
  );
}
