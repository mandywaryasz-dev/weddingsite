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
  const originalScrollTo = window.scrollTo;
  const instances: OverlayAudio[] = [];

  beforeEach(() => {
    instances.length = 0;
    nextAudioConfig = {};
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: vi.fn()
    });
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
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: originalScrollTo
    });
  });

  it("shows the entrance copy and silent fallback before requesting audio", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    expect(screen.getByTestId("audio-start-overlay-lotus")).toBeInTheDocument();
    expect(screen.getByText("Save the Date")).toBeInTheDocument();
    expect(
      screen.getByText("For the full atmosphere, enter with sound.")
    ).toBeInTheDocument();
    expect(screen.queryByText("Amanda & Dushyant")).not.toBeInTheDocument();
    expect(
      screen.queryByText("October 2, 2026 • Asheville, North Carolina")
    ).not.toBeInTheDocument();
    const primaryButton = screen.getByRole("button", { name: "Enter with sound" });
    expect(primaryButton).toBeInTheDocument();
    const silentButton = screen.getByRole("button", { name: "Continue without sound" });
    expect(silentButton).toBeInTheDocument();
    const sharedCtaClasses = [
      "min-h-[var(--btn-min-h)]",
      "w-full",
      "rounded-full",
      "border",
      "border-ivory/[0.3]",
      "bg-[linear-gradient(165deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]",
      "px-[var(--btn-px)]",
      "py-[var(--btn-py)]",
      "font-heading",
      "text-[0.68rem]",
      "uppercase",
      "tracking-[0.22em]",
      "text-ivory/[0.88]",
      "shadow-[0_12px_28px_rgba(0,0,0,0.2)]",
      "transition"
    ];

    for (const button of [primaryButton, silentButton]) {
      expect(button).toHaveClass(...sharedCtaClasses);
    }

    expect(primaryButton).toHaveClass("disabled:cursor-wait", "disabled:opacity-100");
    expect(silentButton).not.toHaveClass("border-ivory/12");
    expect(silentButton).not.toHaveClass("text-ivory/56");
    expect(silentButton).not.toHaveClass("hover:border-ivory/16");
    expect(window.Audio).not.toHaveBeenCalled();
  });

  it("locks document scrolling while the overlay is visible and restores it after entry", async () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 148
    });

    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-148px");
    expect(document.body.style.width).toBe("100%");
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overscrollBehavior).toBe("none");

    fireEvent.click(screen.getByTestId("audio-skip-button"));

    await waitFor(() =>
      expect(screen.getByTestId("audio-start-overlay-shell")).toHaveClass("opacity-0")
    );
    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.width).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.documentElement.style.overscrollBehavior).toBe("");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 148);
  });

  it("does not start audio when the shell itself is clicked", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    fireEvent.click(screen.getByTestId("audio-start-overlay-shell"));

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

  it("prepares audio on pointer down before starting playback on click", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const primaryButton = screen.getByTestId("audio-start-overlay");

    fireEvent.pointerDown(primaryButton);

    expect(window.Audio).toHaveBeenCalledTimes(1);
    expect(instances[0].play).not.toHaveBeenCalled();
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
    expect(screen.getByTestId("audio-start-overlay")).toHaveTextContent("Starting audio...");
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
