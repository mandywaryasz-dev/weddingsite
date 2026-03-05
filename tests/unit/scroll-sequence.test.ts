import {
  getItemRevealRange,
  getNextLockedProgress,
} from "@/lib/motion/scrollSequence";

describe("scroll sequence helpers", () => {
  describe("getNextLockedProgress", () => {
    it("locks progress forward and never regresses", () => {
      const inputs = [0, 0.28, 0.2, 0.61, 0.59, 0.93];
      const results = inputs.reduce<number[]>((acc, value) => {
        const previous = acc.length === 0 ? 0 : acc[acc.length - 1];
        acc.push(getNextLockedProgress(previous, value));
        return acc;
      }, []);

      expect(results).toEqual([0, 0.28, 0.28, 0.61, 0.61, 0.93]);
    });

    it("clamps invalid or out-of-range values safely", () => {
      expect(getNextLockedProgress(0.4, 2)).toBe(1);
      expect(getNextLockedProgress(0.4, -1)).toBe(0.4);
      expect(getNextLockedProgress(Number.NaN, 0.3)).toBe(0.3);
    });
  });

  describe("getItemRevealRange", () => {
    it("computes per-item reveal range from segmented timing", () => {
      const range = getItemRevealRange({
        itemCount: 5,
        index: 2,
        revealStart: 0.04,
        revealEnd: 0.32,
        transitionRatio: 0.72,
      });

      expect(range.segmentSize).toBeCloseTo(0.2, 6);
      expect(range.itemStart).toBeCloseTo(0.408, 6);
      expect(range.itemEnd).toBeCloseTo(0.44832, 6);
    });

    it("guards item count and index bounds", () => {
      const range = getItemRevealRange({
        itemCount: 0,
        index: 5,
        revealStart: 0.04,
        revealEnd: 0.32,
        transitionRatio: 0.72,
      });

      expect(range.segmentSize).toBe(1);
      expect(range.itemStart).toBeCloseTo(0.04, 6);
      expect(range.itemEnd).toBeGreaterThan(range.itemStart);
      expect(range.itemEnd).toBeLessThanOrEqual(1);
    });
  });
});
