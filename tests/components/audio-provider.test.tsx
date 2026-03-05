import React, { useEffect } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";

class ControlledAudio {
  muted = true;
  volume = 0.3;
  loop = false;
  preload = "metadata";
  currentTime = 0;
  src = "";
  private canPlay = false;
  private listeners = new Map<string, Set<() => void>>();
  readonly play = vi.fn(async () => {
    if (!this.canPlay) {
      throw new Error("Audio not ready");
    }
  });
  readonly pause = vi.fn(() => undefined);

  constructor(src?: string) {
    if (src) this.src = src;
  }

  addEventListener(event: string, cb: () => void) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
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
}

function ForceMutedOnMount() {
  const { setMuted } = useAudio();

  useEffect(() => {
    const id = window.setTimeout(() => setMuted(true), 0);
    return () => window.clearTimeout(id);
  }, [setMuted]);

  return null;
}

describe("AudioProvider startup playback", () => {
  const originalAudio = window.Audio;
  const instances: ControlledAudio[] = [];

  beforeEach(() => {
    instances.length = 0;
    Object.defineProperty(window, "Audio", {
      writable: true,
      value: vi.fn((src?: string) => {
        const audio = new ControlledAudio(src);
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

  it("retries playback when canplay happens after first interaction", async () => {
    render(
      <AudioProvider>
        <div>probe</div>
      </AudioProvider>
    );

    const audio = instances[0];
    fireEvent.pointerDown(window);
    expect(audio.play).toHaveBeenCalledTimes(1);

    act(() => {
      audio.emit("canplay");
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));
  });

  it("starts playback path on wheel interaction and retries on canplay", async () => {
    render(
      <AudioProvider>
        <div>probe</div>
      </AudioProvider>
    );

    const audio = instances[0];
    fireEvent.wheel(window);
    expect(audio.play).toHaveBeenCalledTimes(1);

    act(() => {
      audio.emit("canplay");
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));
  });

  it("does not autoplay while muted", async () => {
    render(
      <AudioProvider>
        <ForceMutedOnMount />
      </AudioProvider>
    );

    const audio = instances[0];
    await waitFor(() => expect(audio.muted).toBe(true));

    fireEvent.pointerDown(window);
    act(() => {
      audio.emit("canplay");
    });
    await new Promise((resolve) => window.setTimeout(resolve, 10));

    expect(audio.play).not.toHaveBeenCalled();
  });
});
