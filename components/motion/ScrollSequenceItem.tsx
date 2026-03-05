"use client";

import { ReactNode, useContext } from "react";
import { motion, useTransform, useReducedMotion, motionValue } from "framer-motion";
import { ScrollSequenceContext } from "@/components/motion/ScrollSequenceContext";
import { motionTokens } from "@/lib/motion/tokens";

type ScrollSequenceItemProps = {
  children?: ReactNode;
  index: number;
  as?: "div" | "span" | "p";
  className?: string;
};

const staticProgress = motionValue(0);

export function ScrollSequenceItem({
  children,
  index,
  as = "div",
  className,
}: ScrollSequenceItemProps) {
  const ctx = useContext(ScrollSequenceContext);
  const prefersReducedMotion = useReducedMotion();

  const { y: yDistance, revealStart, revealEnd, transitionRatio } =
    motionTokens.scrollSequence;

  const progress = ctx?.progress ?? staticProgress;
  const itemCount = ctx?.itemCount ?? 1;

  // Calculate the scroll range for this item
  const segmentSize = 1 / itemCount;
  const itemStart = index * segmentSize + revealStart * segmentSize;
  const itemEnd = itemStart + (revealEnd - revealStart) * segmentSize * transitionRatio;

  // Always call hooks unconditionally
  const opacity = useTransform(progress, [itemStart, itemEnd], [0, 1]);
  const y = useTransform(progress, [itemStart, itemEnd], [yDistance, 0]);
  const pointerEvents = useTransform(opacity, (v) =>
    v < 0.1 ? "none" : "auto"
  );

  const Tag = motion[as] as typeof motion.div;

  // Reduced motion or item 0: render visible immediately
  if (prefersReducedMotion || index === 0) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      style={{
        opacity,
        y,
        pointerEvents: pointerEvents as unknown as undefined,
      }}
    >
      {children}
    </Tag>
  );
}
