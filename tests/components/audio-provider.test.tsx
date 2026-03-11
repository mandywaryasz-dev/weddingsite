import React, { useEffect } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";

class ControlledAudio {
  muted = true;
  volume = 0.3;
  loop = false;
  preload = "metadata";
  currentTime = 0;
  paused = true;
  src = "";
  private canPlay = false;
  private listeners = new Map<string, Set<() => void>>();
  readonly play = vi.fn(async () => {
    if (!this.canPlay) {
      throw new Error("Audio not ready");
    }
    this.paused = false;
  });
  readonly pause = vi.fn(() => {
    this.paused = true;
  });

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

function ForceMutedOnMount() {
  const { setMuted } = useAudio();

  useEffect(() => {
    const id = window.setTimeout(() => setMuted(true), 0);
    return () => window.clearTimeout(id);
  }, [setMuted]);

  return null;
}

function AudioControls() {
  const { duckAmbient, restoreAmbient, volume } = useAudio();

  return (
    <>
      <button type="button" onClick={() => void duckAmbient(0)}>
        Duck
      </button>
      <button type="button" onClick={() => void restoreAmbient(0.3)}>
        Restore
      </button>
      <output data-testid="ambient-volume">{volume.toFixed(2)}</output>
    </>
  );
}

describe("AudioProvider startup playback", () => {
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

  it("retries playback when canplay happens after first interaction", async () => {
    render(
      <AudioProvider>
        <div>probe</div>
      </AudioProvider>
    );

    const audio = instances[0];
    fireEvent.pointerDown(window);
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

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
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(1));

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

  it("ducks and restores ambient through a gain node when Web Audio is available", async () => {
    render(
      <AudioProvider>
        <AudioControls />
      </AudioProvider>
    );

    const audio = instances[0];
    fireEvent.pointerDown(window);
    act(() => {
      audio.emit("canplay");
    });

    await waitFor(() => expect(audioContexts).toHaveLength(1));
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));

    fireEvent.click(screen.getByRole("button", { name: "Duck" }));
    await waitFor(() => expect(audioContexts[0].gainNode.gain.value).toBeCloseTo(0, 2));
    await waitFor(() => expect(screen.getByTestId("ambient-volume")).toHaveTextContent("0.00"));

    fireEvent.click(screen.getByRole("button", { name: "Restore" }));
    await waitFor(() => expect(audioContexts[0].gainNode.gain.value).toBeCloseTo(0.3, 2));
    await waitFor(() => expect(screen.getByTestId("ambient-volume")).toHaveTextContent("0.30"));
  });

  it("pauses and resumes ambient when Web Audio is unavailable", async () => {
    Object.defineProperty(window, "AudioContext", {
      writable: true,
      value: undefined
    });

    render(
      <AudioProvider>
        <AudioControls />
      </AudioProvider>
    );

    const audio = instances[0];
    fireEvent.pointerDown(window);
    act(() => {
      audio.emit("canplay");
    });

    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));

    fireEvent.click(screen.getByRole("button", { name: "Duck" }));
    await waitFor(() => expect(audio.pause).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("ambient-volume")).toHaveTextContent("0.00"));

    fireEvent.click(screen.getByRole("button", { name: "Restore" }));
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(screen.getByTestId("ambient-volume")).toHaveTextContent("0.30"));
  });
});
