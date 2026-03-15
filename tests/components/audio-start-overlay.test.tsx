import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  private listeners = new Map<string, Set<() => void>>();
  readonly load = vi.fn(() => undefined);
  readonly play = vi.fn(async () => {
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
    if (event === "canplay") {
      cb();
    }
  }

  removeEventListener(event: string, cb: () => void) {
    this.listeners.get(event)?.delete(cb);
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

    expect(screen.getByText("Tap and Scroll to Begin")).toBeInTheDocument();
  });

  it("dismisses on touchend", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    fireEvent.touchEnd(overlay);

    await waitFor(() => expect(instances[0].play).toHaveBeenCalledTimes(1));
    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
  });

  it("dismisses on click", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    fireEvent.click(overlay);

    await waitFor(() => expect(instances[0].play).toHaveBeenCalledTimes(1));
    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
  });

  it("does not double-start on touchend followed by a synthetic click", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    fireEvent.touchEnd(overlay);
    fireEvent.click(overlay);

    await waitFor(() => expect(instances[0].play).toHaveBeenCalledTimes(1));
  });
});
