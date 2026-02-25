import "@testing-library/jest-dom/vitest";

class MockAudio {
  muted = true;
  volume = 0.3;
  loop = false;
  preload = "metadata";
  currentTime = 0;
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

  play() {
    return Promise.resolve();
  }

  pause() {
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

class MockIntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target
        } as IntersectionObserverEntry
      ],
      this as unknown as IntersectionObserver
    );
  }
  unobserve() {
    return undefined;
  }
  disconnect() {
    return undefined;
  }
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "0px";
  thresholds = [0];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false
  })
});
