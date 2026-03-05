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
  scrollSequence: {
    y: 10,
    blurFrom: 2.4,
    revealStart: 0.04,
    revealEnd: 0.32,
    transitionRatio: 0.72,
    pointerEnableThreshold: 0.14,
    spring: {
      stiffness: 320,
      damping: 34,
      mass: 0.34,
    },
    ease: [0.22, 1, 0.36, 1] as const,
    defaultScrollPerItem: 25, // vh per item
  },
} as const;
