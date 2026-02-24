import { buildFadeFrames, clampVolume } from "@/lib/audio/controller";

describe("audio controller", () => {
  it("clamps volume range", () => {
    expect(clampVolume(-1)).toBe(0);
    expect(clampVolume(0.5)).toBe(0.5);
    expect(clampVolume(3)).toBe(1);
  });

  it("builds fade frame metadata", () => {
    const frames = buildFadeFrames(0.3, 0.1, 300);
    expect(frames.frameCount).toBeGreaterThan(1);
    expect(frames.delta).toBeLessThan(0);
  });
});
