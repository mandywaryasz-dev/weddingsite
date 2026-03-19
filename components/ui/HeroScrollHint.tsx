"use client";

import { useContext, useEffect, useState } from "react";
import {
  motion,
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ScrollSequenceContext } from "@/components/motion/ScrollSequenceContext";

const staticProgress = motionValue(0);
const dismissThreshold = 0.045;

export function HeroScrollHint() {
  const ctx = useContext(ScrollSequenceContext);
  const progress = ctx?.lockedProgress ?? staticProgress;
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const [dismissed, setDismissed] = useState(() => progress.get() >= dismissThreshold);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= dismissThreshold) {
      setDismissed(true);
    }
  });

  const opacity = useTransform(progress, [0, dismissThreshold], [1, 0], {
    clamp: true,
  });
  const y = useTransform(progress, [0, dismissThreshold], [0, 12], {
    clamp: true,
  });

  const shouldReduceMotion = hasMounted && prefersReducedMotion;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-6 sm:bottom-8">
      <motion.div
        aria-hidden="true"
        data-state={dismissed ? "hidden" : "visible"}
        data-testid="hero-scroll-hint"
        className={`flex flex-col items-center gap-2 text-center ${
          shouldReduceMotion ? (dismissed ? "opacity-0" : "opacity-100") : ""
        }`}
        style={shouldReduceMotion ? undefined : { opacity, y }}
      >
        <span className="font-heading text-[0.64rem] uppercase tracking-[0.24em] text-silver/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
          Scroll to begin
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-silver/72 via-silver/28 to-transparent" />
        <span className="text-gold/82 drop-shadow-[0_0_10px_rgba(199,164,93,0.26)] motion-safe:animate-scroll-hint">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
            <path d="M10 3.5v8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path
              d="m6.75 9.75 3.25 3.5 3.25-3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.div>
    </div>
  );
}
