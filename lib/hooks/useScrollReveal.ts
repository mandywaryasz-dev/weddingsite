"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  externalRef?: RefObject<HTMLElement | null>;
};

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.2, rootMargin = "0px", once = true, externalRef } = options;
  const internalRef = useRef<HTMLElement | null>(null);
  const ref = externalRef ?? internalRef;
  const [isVisible, setIsVisible] = useState(false);

  const thresholdMemo = useMemo(() => threshold, [threshold]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once && entry.intersectionRatio < 0.8) {
          setIsVisible(false);
        }
      },
      { threshold: thresholdMemo, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, ref, rootMargin, thresholdMemo]);

  return { ref, isVisible };
}
