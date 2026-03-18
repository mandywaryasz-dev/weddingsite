import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";

type NextAudioConfig = {
  ready?: boolean;
  blockOnPlay?: boolean;
};

let nextAudioConfig: NextAudioConfig = {};

function prepareNextAudio(config: NextAudioConfig) {
  nextAudioConfig = config;
}

class OverlayAudio {
  volume = 0.3;
  loop = false;
  preload = "auto";
  currentTime = 0;
  paused = true;
  src = "";
  private canPlay = nextAudioConfig.ready ?? false;
  private listeners = new Map<string, Set<() => void>>();
  private playBlock: Promise<void> | null = null;
  private releasePlayBlock: (() => void) | null = null;
  readonly load = vi.fn(() => undefined);
  readonly play = vi.fn(async () => {
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

  constructor() {
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

describe("AudioStartOverlay", () => {
  const originalAudio = window.Audio;
  const instances: OverlayAudio[] = [];

  beforeEach(() => {
    instances.length = 0;
    nextAudioConfig = {};
    Object.defineProperty(window, "Audio", {
      writable: true,
      value: vi.fn(() => {
        const audio = new OverlayAudio();
        instances.push(audio);
        return audio;
      })
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    Object.defineProperty(window, "Audio", {
      writable: true,
      value: originalAudio
    });
  });

  it("shows the entrance copy and silent fallback before requesting audio", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    expect(screen.getByText("Tap to begin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue without sound" })).toBeInTheDocument();
    expect(window.Audio).not.toHaveBeenCalled();
  });

  it("allows immediate silent entry without creating the audio element", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    fireEvent.click(screen.getByTestId("audio-skip-button"));

    await waitFor(() =>
      expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0")
    );
    expect(window.Audio).not.toHaveBeenCalled();
  });

  it("enters immediately from the overlay control while audio keeps starting", async () => {
    prepareNextAudio({ ready: true, blockOnPlay: true });

    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    const shell = screen.getByTestId("audio-start-overlay-shell");

    fireEvent.click(overlay);

    const audio = instances[0];
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(shell).toHaveClass("opacity-0");
    expect(shell).toHaveClass("pointer-events-none");
    expect(audio.pause).not.toHaveBeenCalled();

    act(() => {
      audio.releasePlay();
    });

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(audio.paused).toBe(false);
  });

  it("falls back to silent mode if background startup never finishes", async () => {
    vi.useFakeTimers();
    prepareNextAudio({ ready: true, blockOnPlay: true });

    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    fireEvent.click(screen.getByTestId("audio-start-overlay"));

    const audio = instances[0];
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0");

    await act(async () => {
      vi.advanceTimersByTime(8000);
      await Promise.resolve();
    });

    expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0");
    expect(audio.pause).toHaveBeenCalled();
  });
});
