export const motionTokens = {
  reveal: {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
    y: 22,
    scale: 1.02
  },
  stagger: {
    delayChildren: 0.08,
    children: 0.12
  },
  ornament: {
    floatY: 10,
    duration: 7.2
  },
  divider: {
    duration: 0.7,
    ease: [0.2, 0.95, 0.2, 1] as const
  },
  button: {
    breatheScale: 1.02,
    duration: 2.8
  },
  modal: {
    durationIn: 0.34,
    durationOut: 0.22,
    scaleFrom: 0.94
  }
};
