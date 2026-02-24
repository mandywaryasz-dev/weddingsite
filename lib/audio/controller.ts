export function clampVolume(volume: number) {
  return Math.min(1, Math.max(0, volume));
}

export function buildFadeFrames(from: number, to: number, durationMs: number, frameMs = 16) {
  const safeDuration = Math.max(1, durationMs);
  const frameCount = Math.max(1, Math.ceil(safeDuration / frameMs));
  const delta = (to - from) / frameCount;
  return { frameCount, delta };
}
