"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { motionTokens } from "@/lib/motion/tokens";
import { useViewportFlag } from "@/components/motion/useViewportFlag";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  mobileIntensity?: number;
};

export function ParallaxLayer({
  children,
  className,
  intensity = motionTokens.parallax.intensity,
  mobileIntensity = motionTokens.parallax.mobileIntensity,
}: ParallaxLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  useViewportFlag(containerRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isMobile =
    typeof window !== "undefined"
      ? window.innerWidth < motionTokens.parallax.breakpoint
      : false;

  const activeIntensity = isMobile ? mobileIntensity : intensity;
  const range = activeIntensity * 100; // px

  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
