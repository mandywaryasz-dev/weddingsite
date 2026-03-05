"use client";

import { ReactNode, useRef, useState } from "react";
import { useScroll, useReducedMotion, motionValue, useMotionValueEvent, MotionValue } from "framer-motion";
import { ScrollSequenceContext } from "@/components/motion/ScrollSequenceContext";
import { motionTokens } from "@/lib/motion/tokens";
import clsx from "clsx";

type ScrollSequenceProps = {
  children: ReactNode;
  itemCount: number;
  className?: string;
};

function DebugProgress({ progress }: { progress: MotionValue<number> }) {
  const [val, setVal] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setVal(v));
  return (
    <div className="fixed bottom-4 left-4 z-50 rounded bg-black/80 px-2 py-1 font-mono text-xs text-white">
      {val.toFixed(3)}
    </div>
  );
}

const staticProgress = motionValue(1);

export function ScrollSequence({ children, itemCount, className }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const vhPerItem = motionTokens.scrollSequence.defaultScrollPerItem;
  const extraHeight = (itemCount - 1) * vhPerItem;

  // Reduced motion: no sticky, no scroll tracking
  if (prefersReducedMotion) {
    return (
      <ScrollSequenceContext.Provider value={{ progress: staticProgress, itemCount }}>
        <div className={className}>{children}</div>
      </ScrollSequenceContext.Provider>
    );
  }

  return (
    <ScrollSequenceContext.Provider value={{ progress: scrollYProgress, itemCount }}>
      <div
        ref={containerRef}
        className={clsx("bg-[var(--background)]", className)}
        style={{ height: `calc(100vh + ${extraHeight}vh)` }}
      >
        <div className="sticky top-0 h-screen">
          {children}
          <DebugProgress progress={scrollYProgress} />
        </div>
      </div>
    </ScrollSequenceContext.Provider>
  );
}
