"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, type RefObject } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";

type ScrollRevealProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
};

type ScrollRevealGroupProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
};

type ScrollRevealItemProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const reducedMotionHidden = { opacity: 0 };
const reducedMotionShown = { opacity: 1 };

function getItemVariants(prefersReducedMotion: boolean) {
  return {
    hidden: prefersReducedMotion ? reducedMotionHidden : { opacity: 0, y: motionTokens.reveal.y, scale: 1 },
    shown: prefersReducedMotion ? reducedMotionShown : { opacity: 1, y: 0, scale: motionTokens.reveal.scale }
  };
}

export function ScrollRevealGroup({
  children,
  className,
  delayChildren = motionTokens.stagger.delayChildren,
  staggerChildren = motionTokens.stagger.children,
  ...options
}: ScrollRevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useScrollReveal(options);

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      variants={{
        hidden: {},
        shown: {
          transition: {
            delayChildren: prefersReducedMotion ? 0 : delayChildren,
            staggerChildren: prefersReducedMotion ? 0 : staggerChildren
          }
        }
      }}
      initial="hidden"
      animate={isVisible ? "shown" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children, className, delay = 0 }: ScrollRevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = getItemVariants(Boolean(prefersReducedMotion));

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{
        duration: prefersReducedMotion ? 0.01 : motionTokens.reveal.duration,
        ease: motionTokens.reveal.ease,
        delay: prefersReducedMotion ? 0 : delay
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ children, className, ...options }: ScrollRevealProps) {
  return (
    <ScrollRevealGroup className={className} {...options}>
      <ScrollRevealItem>
        {children}
      </ScrollRevealItem>
    </ScrollRevealGroup>
  );
}
