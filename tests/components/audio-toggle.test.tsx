import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";
import { AudioToggle } from "@/components/audio/AudioToggle";

class ToggleAudio {
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

describe("AudioToggle", () => {
  const originalAudio = window.Audio;
  const instances: ToggleAudio[] = [];

  beforeEach(() => {
    instances.length = 0;
    Object.defineProperty(window, "Audio", {
      writable: true,
      value: vi.fn(() => {
        const audio = new ToggleAudio();
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

  it("defaults to audio on", () => {
    render(
      <AudioProvider>
        <AudioToggle />
      </AudioProvider>
    );

    const button = screen.getByRole("button", { name: /pause page audio/i });
    expect(button).toHaveAttribute("data-audio-enabled", "true");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("turns audio off on the first tap and back on on the second tap", async () => {
    render(
      <AudioProvider>
        <AudioToggle />
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    fireEvent.click(overlay);

    await waitFor(() => expect(instances[0].play).toHaveBeenCalledTimes(1));

    const toggle = screen.getByTestId("audio-toggle");
    fireEvent.click(toggle);

    expect(instances[0].pause).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveAttribute("data-audio-enabled", "false");
    expect(screen.getByRole("button", { name: /resume page audio/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /resume page audio/i }));

    await waitFor(() => expect(instances[0].play).toHaveBeenCalledTimes(2));
    expect(toggle).toHaveAttribute("data-audio-enabled", "true");
    expect(toggle).toHaveAttribute("data-audio-playing", "true");
  });
});
