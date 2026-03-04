"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/lib/hooks/useScrollReveal";
import { motionTokens } from "@/lib/motion/tokens";
import { canRunBlurAnimation } from "@/lib/motion/capabilities";
import { ScaleSettle } from "@/components/motion/ScaleSettle";

type FocusPullProps = UseScrollRevealOptions & {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FocusPull({
  children,
  className,
  delay = 0,
  ...options
}: FocusPullProps) {
  const [useBlur, setUseBlur] = useState(false);

  useEffect(() => {
    setUseBlur(canRunBlurAnimation());
  }, []);

  // Fall back to ScaleSettle on mobile / low-power / reduced-motion
  if (!useBlur) {
    return (
      <ScaleSettle className={className} delay={delay} {...options}>
        {children}
      </ScaleSettle>
    );
  }

  return (
    <FocusPullInner className={className} delay={delay} {...options}>
      {children}
    </FocusPullInner>
  );
}

/** Inner component — only rendered when blur is enabled. */
function FocusPullInner({
  children,
  className,
  delay = 0,
  ...options
}: FocusPullProps) {
  const { ref, isVisible } = useScrollReveal(options);

  const hidden = {
    opacity: 0,
    scale: motionTokens.scaleSettle.from,
    filter: `blur(${motionTokens.focusPull.blurFrom}px)`,
  };

  const shown = {
    opacity: 1,
    scale: motionTokens.scaleSettle.to,
    filter: `blur(${motionTokens.focusPull.blurTo}px)`,
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{
        duration: motionTokens.focusPull.duration,
        ease: [...motionTokens.focusPull.ease],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
