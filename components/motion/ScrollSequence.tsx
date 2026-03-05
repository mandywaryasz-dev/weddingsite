"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  useScroll,
  useReducedMotion,
  motionValue,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import { ScrollSequenceContext } from "@/components/motion/ScrollSequenceContext";
import { motionTokens } from "@/lib/motion/tokens";
import { getNextLockedProgress } from "@/lib/motion/scrollSequence";
import clsx from "clsx";

type ScrollSequenceProps = {
  children: ReactNode;
  itemCount: number;
  className?: string;
};

const staticProgress = motionValue(1);

export function ScrollSequence({ children, itemCount, className }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const lockedProgress = useMotionValue(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldReduceMotion = hasMounted && prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const previous = lockedProgress.get();
    const next = getNextLockedProgress(previous, latest);

    if (next !== previous) {
      lockedProgress.set(next);
    }
  });

  const vhPerItem = motionTokens.scrollSequence.defaultScrollPerItem;
  const extraHeight = (itemCount - 1) * vhPerItem;

  // Reduced motion: no sticky, no scroll tracking
  if (shouldReduceMotion) {
    return (
      <ScrollSequenceContext.Provider
        value={{ progress: staticProgress, lockedProgress: staticProgress, itemCount }}
      >
        <div className={className}>{children}</div>
      </ScrollSequenceContext.Provider>
    );
  }

  return (
    <ScrollSequenceContext.Provider
      value={{ progress: scrollYProgress, lockedProgress, itemCount }}
    >
      <div
        ref={containerRef}
        className={clsx("bg-[var(--background)]", className)}
        style={{ height: `calc(100vh + ${extraHeight}vh)` }}
      >
        <div className="sticky top-0 h-screen">{children}</div>
      </div>
    </ScrollSequenceContext.Provider>
  );
}
