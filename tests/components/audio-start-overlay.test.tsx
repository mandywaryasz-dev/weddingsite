import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";

class OverlayAudio {
  volume = 0.3;
  loop = false;
  preload = "auto";
  currentTime = 0;
  paused = true;
  src = "";
  private canPlay = false;
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
    Object.defineProperty(window, "Audio", {
      writable: true,
      value: originalAudio
    });
  });

  it("shows the updated entrance copy", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    expect(screen.getByText("Loading audio...")).toBeInTheDocument();
  });

  it("shows the ready copy once ambient audio can play", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    act(() => {
      instances[0].emit("canplay");
    });

    expect(screen.getByText("Tap to begin")).toBeInTheDocument();
  });

  it("starts playback from the overlay control and hides only after play resolves", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");
    audio.blockNextPlay();

    act(() => {
      audio.emit("canplay");
    });

    fireEvent.click(overlay);

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Starting audio...")).toBeInTheDocument();
    expect(overlay).toHaveClass("opacity-100");

    act(() => {
      audio.releasePlay();
    });

    await waitFor(() => expect(overlay).toHaveClass("opacity-0"));
    expect(overlay).toHaveClass("pointer-events-none");
  });

  it("keeps the overlay visible after an early failed start and prompts again once ready", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");

    fireEvent.click(overlay);

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
    expect(overlay).toHaveClass("opacity-100");
    expect(screen.getByText("Loading audio...")).toBeInTheDocument();

    act(() => {
      audio.emit("canplay");
    });

    await waitFor(() => expect(screen.getByText("Tap to begin")).toBeInTheDocument());
    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it("does not double-start on touchend followed by a synthetic click", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const audio = instances[0];
    const overlay = screen.getByTestId("audio-start-overlay");

    act(() => {
      audio.emit("canplay");
    });

    fireEvent.touchEnd(overlay);
    fireEvent.click(overlay);

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));
  });
});
