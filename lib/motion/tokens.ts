export const motionTokens = {
  reveal: {
    duration: 0.62,
    ease: [0.22, 1, 0.36, 1] as const,
    y: 16,
    scale: 1.01,
  },
  stagger: { baseDelay: 0.12, maxDelay: 0.72 },
  parallax: { intensity: 0.08, mobileIntensity: 0.04, breakpoint: 768 },
  divider: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  mask: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  scaleSettle: {
    from: 1.04,
    to: 1.0,
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  focusPull: {
    blurFrom: 5,
    blurTo: 0,
    duration: 1.0,
    ease: [0.22, 1, 0.36, 1] as const,
  },
} as const;
