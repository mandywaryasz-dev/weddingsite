import "@testing-library/jest-dom/vitest";

class MockAudio {
  volume = 0.3;
  loop = false;
  preload = "auto";
  currentTime = 0;
  paused = true;
  src = "";
  private listeners = new Map<string, Set<() => void>>();

  constructor(src?: string) {
    if (src) this.src = src;
  }

  addEventListener(event: string, cb: () => void) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)?.add(cb);
    if (event === "canplay") cb();
  }

  removeEventListener(event: string, cb: () => void) {
    this.listeners.get(event)?.delete(cb);
  }

  load() {
    return undefined;
  }

  play() {
    this.paused = false;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
    return undefined;
  }
}

Object.defineProperty(window, "Audio", {
  writable: true,
  value: MockAudio
});

globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
  return window.setTimeout(() => cb(performance.now()), 1);
};

globalThis.cancelAnimationFrame = (id: number): void => {
  window.clearTimeout(id);
};
