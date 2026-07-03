// Pure date → whole-days helper for the hero countdown.
// Kept dependency-free and side-effect-free so it is trivially unit-testable
// and safe to run on both the server (initial render) and client (hourly tick).

const MS_PER_DAY = 86_400_000;

/**
 * Whole days remaining from `now` until `target`, clamped to zero once the
 * target has passed. Matches the mockup's single-unit countdown (no HH:MM:SS).
 */
export function daysUntil(target: Date | string, now: Date | number = Date.now()): number {
  const targetMs = typeof target === "string" ? new Date(target).getTime() : target.getTime();
  const nowMs = typeof now === "number" ? now : now.getTime();
  const diff = targetMs - nowMs;
  if (!Number.isFinite(diff) || diff <= 0) return 0;
  return Math.floor(diff / MS_PER_DAY);
}
