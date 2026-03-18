import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";
import { AudioToggle } from "@/components/audio/AudioToggle";

type NextAudioConfig = {
  ready?: boolean;
  requireGesture?: boolean;
  blockOnPlay?: boolean;
};

let gestureInProgress = false;
let nextAudioConfig: NextAudioConfig = {};

function withUserGesture(action: () => void) {
  gestureInProgress = true;
  try {
    action();
  } finally {
    gestureInProgress = false;
  }
}

function prepareNextAudio(config: NextAudioConfig) {
  nextAudioConfig = config;
}

class ControlledAudio {
  volume = 0.3;
  loop = false;
  preload = "auto";
  currentTime = 0;
  paused = true;
  src = "";
  requireGesture = nextAudioConfig.requireGesture ?? false;
  private canPlay = nextAudioConfig.ready ?? false;
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
    if (nextAudioConfig.blockOnPlay) {
      this.blockNextPlay();
    }
    nextAudioConfig = {};
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
  const { duckAmbient, enterSilently, restoreAmbient } = useAudio();

  return (
    <>
      <button type="button" onClick={() => void duckAmbient(0)}>
        Duck
      </button>
      <button type="button" onClick={() => void restoreAmbient(0.3)}>
        Restore
      </button>
      <button type="button" onClick={enterSilently}>
        Silent
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
    gestureInProgress = false;
    nextAudioConfig = {};

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
    vi.useRealTimers();

    Object.defineProperty(window, "Audio", {
      writable: true,
      value: originalAudio
    });

    Object.defineProperty(window, "AudioContext", {
      writable: true,
      value: originalAudioContext
    });
  });

  it("does not request ambient audio on initial mount", () => {
    renderAudioExperience();

    expect(window.Audio).not.toHaveBeenCalled();
    expect(screen.getByText("Tap to begin")).toBeInTheDocument();
  });

  it("starts ambient from a click unlock gesture", async () => {
    prepareNextAudio({ ready: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(audio.paused).toBe(false);
    await waitFor(() =>
      expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0")
    );
    expect(screen.getByTestId("audio-toggle")).toHaveAttribute("data-audio-playing", "true");
    expect(screen.getByTestId("audio-toggle")).toHaveAttribute("data-audio-startup", "playing");
  });

  it("enters immediately while the first sound-start attempt is still pending", async () => {
    prepareNextAudio({ ready: true, blockOnPlay: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const shell = screen.getByTestId("audio-start-overlay-shell");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(shell).toHaveClass("opacity-0");
    expect(toggle).toHaveAttribute("data-audio-enabled", "true");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-pending", "true");
    expect(toggle).toHaveAttribute("data-audio-startup", "starting");

    act(() => {
      audio.releasePlay();
    });

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(toggle).toHaveAttribute("data-audio-playing", "true");
    expect(toggle).toHaveAttribute("data-audio-pending", "false");
    expect(toggle).toHaveAttribute("data-audio-startup", "playing");
  });

  it("does not start ambient from scroll", async () => {
    renderAudioExperience();

    fireEvent.scroll(window);
    await new Promise((resolve) => window.setTimeout(resolve, 10));

    expect(window.Audio).not.toHaveBeenCalled();
    expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-100");
  });

  it("calls audio.play before any post-start audio graph setup", async () => {
    prepareNextAudio({ ready: true, blockOnPlay: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(audioContexts).toHaveLength(0);

    act(() => {
      audio.releasePlay();
    });

    await waitFor(() => expect(audioContexts).toHaveLength(1));
  });

  it("falls back to silent mode if the background startup watchdog expires", async () => {
    vi.useFakeTimers();
    prepareNextAudio({ ready: true, blockOnPlay: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0");

    await act(async () => {
      vi.advanceTimersByTime(8000);
      await Promise.resolve();
    });

    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-pending", "false");
    expect(toggle).toHaveAttribute("data-audio-startup", "silent");
    expect(audio.pause).toHaveBeenCalled();
  });

  it("enterSilently cancels a pending start attempt", async () => {
    prepareNextAudio({ ready: true, blockOnPlay: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(toggle).toHaveAttribute("data-audio-pending", "true");

    fireEvent.click(screen.getByRole("button", { name: "Silent" }));

    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-pending", "false");
    expect(toggle).toHaveAttribute("data-audio-startup", "silent");
    expect(audio.pause).toHaveBeenCalled();

    act(() => {
      audio.releasePlay();
    });

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
  });

  it("turning audio off pauses playback immediately", async () => {
    prepareNextAudio({ ready: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

    withUserGesture(() => {
      fireEvent.click(toggle);
    });

    expect(audio.pause).toHaveBeenCalledTimes(1);
    expect(audio.paused).toBe(true);
    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-pending", "false");
    expect(toggle).toHaveAttribute("data-audio-startup", "silent");
  });

  it("turning audio on from the button resumes playback", async () => {
    prepareNextAudio({ ready: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

    withUserGesture(() => {
      fireEvent.click(toggle);
    });
    expect(audio.pause).toHaveBeenCalledTimes(1);

    audio.currentTime = 42;
    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(toggle);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));
    expect(audio.currentTime).toBe(42);
    expect(audio.paused).toBe(false);
    expect(toggle).toHaveAttribute("data-audio-enabled", "true");
    expect(toggle).toHaveAttribute("data-audio-playing", "true");
    expect(toggle).toHaveAttribute("data-audio-startup", "playing");
  });

  it("falls back to silent entry when the first start attempt fails and allows retry", async () => {
    prepareNextAudio({ ready: false });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0")
    );
    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(toggle).toHaveAttribute("data-audio-playing", "false");
    expect(toggle).toHaveAttribute("data-audio-startup", "silent");

    act(() => {
      audio.emit("canplay");
    });

    withUserGesture(() => {
      fireEvent.click(toggle);
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));
    expect(toggle).toHaveAttribute("data-audio-enabled", "true");
    expect(toggle).toHaveAttribute("data-audio-playing", "true");
    expect(toggle).toHaveAttribute("data-audio-startup", "playing");
  });

  it("manual audio-off prevents restoreAmbient from re-enabling sound", async () => {
    Object.defineProperty(window, "AudioContext", {
      writable: true,
      value: undefined
    });

    prepareNextAudio({ ready: true });
    renderAudioExperience();

    const overlay = screen.getByTestId("audio-start-overlay");
    const toggle = screen.getByTestId("audio-toggle");

    withUserGesture(() => {
      fireEvent.click(overlay);
    });

    const audio = instances[0];
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
