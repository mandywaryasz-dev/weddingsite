"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";

type RevealBlockProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade";
  as?: "div" | "span" | "p";
};

export function RevealBlock({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  as = "div",
  ...options
}: RevealBlockProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useScrollReveal(options);

  const Tag = motion[as] as typeof motion.div;

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        ...(variant === "fade-up" ? { y: motionTokens.reveal.y } : {}),
      };

  const shown = prefersReducedMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        ...(variant === "fade-up" ? { y: 0 } : {}),
      };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{
        duration: motionTokens.reveal.duration,
        ease: [...motionTokens.reveal.ease],
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </Tag>
  );
}
