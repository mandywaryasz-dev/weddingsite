export type ScrollSequenceRangeInput = {
  itemCount: number;
  index: number;
  revealStart: number;
  revealEnd: number;
  transitionRatio: number;
};

export type ScrollSequenceRange = {
  segmentSize: number;
  itemStart: number;
  itemEnd: number;
};

export function getItemRevealRange({
  itemCount,
  index,
  revealStart,
  revealEnd,
  transitionRatio,
}: ScrollSequenceRangeInput): ScrollSequenceRange {
  const safeItemCount = Math.max(1, itemCount);
  const safeIndex = Math.max(0, Math.min(index, safeItemCount - 1));
  const segmentSize = 1 / safeItemCount;
  const itemStart = safeIndex * segmentSize + revealStart * segmentSize;
  const itemEnd = Math.min(
    1,
    itemStart + (revealEnd - revealStart) * segmentSize * transitionRatio
  );

  return { segmentSize, itemStart, itemEnd };
}

export function getNextLockedProgress(previous: number, latest: number): number {
  const safePrevious = Number.isFinite(previous)
    ? Math.max(0, Math.min(previous, 1))
    : 0;
  const safeLatest = Number.isFinite(latest)
    ? Math.max(0, Math.min(latest, 1))
    : safePrevious;

  return safeLatest > safePrevious ? safeLatest : safePrevious;
}
