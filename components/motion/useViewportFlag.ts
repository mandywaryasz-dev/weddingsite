"use client";

import { RefObject, useEffect } from "react";

/**
 * Toggles `will-change: transform` on an element while it's near the viewport.
 * Uses a generous rootMargin so the hint is applied before the element scrolls
 * into view and removed after it leaves, avoiding permanent compositing costs.
 */
export function useViewportFlag(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.style.willChange = entry.isIntersecting ? "transform" : "auto";
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
}
