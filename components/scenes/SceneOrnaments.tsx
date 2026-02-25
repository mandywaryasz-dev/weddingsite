"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion/tokens";

type DividerProps = {
  className?: string;
};

export function VerticalDivider({ className }: DividerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={className ?? "mx-auto h-16 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scaleY: 0.2 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: motionTokens.divider.duration, ease: motionTokens.divider.ease }}
    />
  );
}

export function HorizontalDivider({ className }: DividerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={
        className ??
        "mx-auto h-px w-[min(240px,74vw)] bg-gradient-to-r from-transparent via-white/70 to-transparent"
      }
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0.2 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: motionTokens.divider.duration, ease: motionTokens.divider.ease }}
    />
  );
}

export function LotusMark({ className = "h-10 w-10" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      aria-hidden
      animate={prefersReducedMotion ? undefined : { y: [0, -motionTokens.ornament.floatY / 2, 0] }}
      transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: motionTokens.ornament.duration, ease: "easeInOut" }}
    >
      <Image src="/images/Lotus.svg" alt="" fill sizes="40px" className="object-contain opacity-85" />
    </motion.div>
  );
}

export function MonogramSeal({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} aria-hidden>
      <Image src="/images/Monogram.svg" alt="" fill sizes="96px" className="object-contain opacity-90" />
    </div>
  );
}
