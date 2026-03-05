/**
 * Device capability checks for expensive animations.
 * Used to gate blur effects to capable devices only.
 */
export function canRunBlurAnimation(): boolean {
  if (typeof window === "undefined") return false;
  const wide = window.innerWidth >= 768;
  const powerful = navigator.hardwareConcurrency >= 4;
  const noReducedMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return wide && powerful && noReducedMotion;
}
