import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";
import { AudioToggle } from "@/components/audio/AudioToggle";

let gestureInProgress = false;

function withUserGesture(action: () => void) {
  gestureInProgress = true;
  try {
    action();
  } finally {
    gestureInProgress = false;
  }
}

class ControlledAudio {
  volume = 0.3;
  loop = false;
  preload = "auto";
  currentTime = 0;
  paused = true;
  src = "";
  requireGesture = false;
  private canPlay = false;
  private listeners = new Map<string, Set<() => void>>();
  private playBlock: Promise<void> | null = null;
  private releasePlayBlock: (() => void) | null = null;
  readonly load = vi.fn(() => undefined);
  readonly play = vi.fn(async () => {
    if (this.requireGesture && !gestureInProgress) {
      throw new Error("Gesture required");
    }
    if (!this.canPlay) {
      throw new Error("Audio not ready");
    }
    if (this.playBlock) {
      await this.playBlock;
    }
    this.paused = false;
  });
  readonly pause = vi.fn(() => {
    this.paused = true;
  });

  constructor(src?: string) {
    if (src) {
      this.src = src;
    }
  }

  addEventListener(event: string, cb: () => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(cb);
  }

  removeEventListener(event: string, cb: () => void) {
    this.listeners.get(event)?.delete(cb);
  }

  emit(event: string) {
    if (event === "canplay") {
      this.canPlay = true;
    }
    this.listeners.get(event)?.forEach((cb) => cb());
  }

  blockNextPlay() {
    this.playBlock = new Promise<void>((resolve) => {
      this.releasePlayBlock = resolve;
    });
  }

  releasePlay() {
    this.releasePlayBlock?.();
    this.playBlock = null;
    this.releasePlayBlock = null;
  }
}

class MockGainNode {
  gain = { value: 0.3 };
  readonly connect = vi.fn(() => undefined);
  readonly disconnect = vi.fn(() => undefined);
}

class MockMediaElementAudioSourceNode {
  readonly connect = vi.fn(() => undefined);
  readonly disconnect = vi.fn(() => undefined);
}

class MockAudioContext {
  state: AudioContextState = "running";
  destination = {};
  readonly gainNode = new MockGainNode();
  readonly sourceNode = new MockMediaElementAudioSourceNode();
  readonly resume = vi.fn(async () => {
    this.state = "running";
  });
  readonly close = vi.fn(async () => undefined);
  readonly createGain = vi.fn(() => this.gainNode);
  readonly createMediaElementSource = vi.fn(() => this.sourceNode);
}

function AudioControls() {
  const { duckAmbient, restoreAmbient } = useAudio();

  return (
    <>
      <button type="button" onClick={() => void duckAmbient(0)}>
        Duck
      </button>
      <button type="button" onClick={() => void restoreAmbient(0.3)}>
        Restore
      </button>
    </>
  );
}

function renderAudioExperience() {
  render(
    <AudioProvider>
      <AudioToggle />
      <AudioStartOverlay />
      <AudioControls />
    </AudioProvider>
  );
}

describe("AudioProvider trusted activation", () => {
  const originalAudio = window.Audio;
  const originalAudioContext = window.AudioContext;
  const instances: ControlledAudio[] = [];
  const audioContexts: MockAudioContext[] = [];

  beforeEach(() => {
    instances.length = 0;
    audioContexts.length = 0;

    Object.defineProperty(window, "Audio", {
      writable: true,
      value: vi.fn((src?: string) => {
        const audio = new ControlledAudio(src);
        instances.push(audio);
        return audio;
      })
    });

    Object.defineProperty(window, "AudioContext", {
      writable: true,
      value: vi.fn(() => {
        const context = new MockAudioContext();
        audioContexts.push(context);
        return context;
      })
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "Audio", {
      writable: true,
      value: originalAudio
    });

    Object.defineProperty(window, "AudioContext", {
      writable: true,
      value: originalAudioContext
    });
  });

  it("starts ambient from a touchend unlock gesture", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.touchEnd(overlay);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(audio.paused).toBe(false);
    expect(overlay).toHaveClass("opacity-0");
    expect(screen.getByTestId("audio-toggle")).toHaveAttribute("data-audio-playing", "true");
  });

  it("starts ambient from a click unlock gesture", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(audio.paused).toBe(false);
    expect(screen.getByTestId("audio-toggle")).toHaveAttribute("data-audio-playing", "true");
  });

  it("ignores touchstart, touchmove, scroll, and wheel as startup unlock events", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.touchStart(overlay);
      fireEvent.touchMove(window);
      fireEvent.scroll(window);
      fireEvent.wheel(window);
    });

    await new Promise((resolve) => window.setTimeout(resolve, 10));

    expect(audio.play).not.toHaveBeenCalled();
    expect(overlay).toHaveClass("opacity-100");
    expect(screen.getByTestId("audio-toggle")).toHaveAttribute("data-audio-playing", "false");
  });

  it("calls audio.play before any post-start audio graph setup", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");

    audio.blockNextPlay();
    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(audioContexts).toHaveLength(0);

    act(() => {
      audio.releasePlay();
    });

    await waitFor(() => expect(audioContexts).toHaveLength(1));
  });

  it("turning audio off pauses playback immediately", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

    withUserGesture(() => {
      fireEvent.click(toggle);
    });

    expect(audio.pause).toHaveBeenCalledTimes(1);
    expect(audio.paused).toBe(true);
    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-pending", "false");
  });

  it("turning audio on from the button resumes playback", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(overlay);
    });
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

    withUserGesture(() => {
      fireEvent.click(toggle);
    });
    expect(audio.pause).toHaveBeenCalledTimes(1);

    audio.currentTime = 42;

    withUserGesture(() => {
      fireEvent.click(toggle);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));
    expect(audio.currentTime).toBe(42);
    expect(audio.paused).toBe(false);
    expect(toggle).toHaveAttribute("data-audio-enabled", "true");
    expect(toggle).toHaveAttribute("data-audio-playing", "true");
  });

  it("keeps retrying only on the next trusted gesture when the first attempt happens before readiness", async () => {
    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    audio.requireGesture = true;

    withUserGesture(() => {
      fireEvent.touchEnd(overlay);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(audio.paused).toBe(true);
    expect(toggle).toHaveAttribute("data-audio-pending", "true");

    act(() => {
      audio.emit("canplay");
    });

    await new Promise((resolve) => window.setTimeout(resolve, 10));
    expect(audio.play).toHaveBeenCalledTimes(1);

    withUserGesture(() => {
      fireEvent.click(window);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));
    expect(audio.paused).toBe(false);
    expect(toggle).toHaveAttribute("data-audio-playing", "true");
    expect(toggle).toHaveAttribute("data-audio-pending", "false");
  });

  it("manual audio-off prevents restoreAmbient from re-enabling sound", async () => {
    Object.defineProperty(window, "AudioContext", {
      writable: true,
      value: undefined
    });

    renderAudioExperience();

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(overlay);
    });
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole("button", { name: "Duck" }));
    await waitFor(() => expect(audio.pause).toHaveBeenCalledTimes(1));

    withUserGesture(() => {
      fireEvent.click(toggle);
    });

    fireEvent.click(screen.getByRole("button", { name: "Restore" }));
    await new Promise((resolve) => window.setTimeout(resolve, 10));

    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
  });
});
