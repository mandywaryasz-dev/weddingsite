"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  motionValue,
} from "framer-motion";
import { ScrollSequenceContext } from "@/components/motion/ScrollSequenceContext";
import { motionTokens } from "@/lib/motion/tokens";
import { getItemRevealRange } from "@/lib/motion/scrollSequence";

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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldReduceMotion = hasMounted && prefersReducedMotion;

  const {
    y: yDistance,
    blurFrom,
    revealStart,
    revealEnd,
    transitionRatio,
    spring,
    pointerEnableThreshold,
  } = motionTokens.scrollSequence;

  const progress = ctx?.lockedProgress ?? staticProgress;
  const itemCount = ctx?.itemCount ?? 1;

  const { itemStart, itemEnd } = getItemRevealRange({
    itemCount,
    index,
    revealStart,
    revealEnd,
    transitionRatio,
  });

  // Always call hooks unconditionally
  const revealProgress = useTransform(progress, [itemStart, itemEnd], [0, 1], {
    clamp: true,
  });
  const smoothedProgress = useSpring(revealProgress, spring);
  const opacity = useTransform(smoothedProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothedProgress, [0, 1], [yDistance, 0]);
  const blur = useTransform(smoothedProgress, [0, 1], [blurFrom, 0]);
  const filter = useTransform(blur, (value) => `blur(${value.toFixed(2)}px)`);
  const pointerEvents = useTransform(opacity, (v) =>
    v < pointerEnableThreshold ? "none" : "auto"
  );

  const Tag = motion[as] as typeof motion.div;

  // Reduced motion or item 0: render visible immediately
  if (shouldReduceMotion || index === 0) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      style={{
        opacity,
        y,
        filter,
        pointerEvents: pointerEvents as unknown as undefined,
      }}
    >
      {children}
    </Tag>
  );
}
