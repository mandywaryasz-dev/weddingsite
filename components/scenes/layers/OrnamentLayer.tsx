"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type OrnamentLayerProps = {
  children?: ReactNode;
  parallax?: boolean;
};

export function OrnamentLayer({ children, parallax = true }: OrnamentLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2400], [0, -56]);

  if (!children) return null;
  return (
    <motion.div
      style={!prefersReducedMotion && parallax ? { y } : undefined}
      className="pointer-events-none absolute inset-0 -z-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}
