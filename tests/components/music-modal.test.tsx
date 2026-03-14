import React from "react";
import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MusicModal } from "@/components/modals/MusicModal";

const duckAmbient = vi.fn(async () => undefined);
const restoreAmbient = vi.fn(async () => undefined);
let isAudioEnabled = true;

vi.mock("@/components/audio/AudioProvider", () => ({
  useAudio: () => ({
    duckAmbient,
    isAudioEnabled,
    restoreAmbient
  })
}));

describe("MusicModal audio behavior", () => {
  beforeEach(() => {
    duckAmbient.mockClear();
    restoreAmbient.mockClear();
    isAudioEnabled = true;
  });

  it("ducks ambient when opened and restores on close", async () => {
    const { rerender, unmount } = render(<MusicModal open onOpenChange={() => undefined} />);

    await waitFor(() => expect(duckAmbient).toHaveBeenCalledWith(0));

    rerender(<MusicModal open={false} onOpenChange={() => undefined} />);
    await waitFor(() => expect(restoreAmbient).toHaveBeenCalledWith(0.3));

    unmount();
    await waitFor(() => expect(restoreAmbient).toHaveBeenCalled());
  });

  it("does not duck or restore when ambient audio is disabled", async () => {
    isAudioEnabled = false;

    const { rerender, unmount } = render(<MusicModal open onOpenChange={() => undefined} />);

    await new Promise((resolve) => window.setTimeout(resolve, 10));
    expect(duckAmbient).not.toHaveBeenCalled();
    expect(restoreAmbient).not.toHaveBeenCalled();

    rerender(<MusicModal open={false} onOpenChange={() => undefined} />);
    await new Promise((resolve) => window.setTimeout(resolve, 10));
    expect(restoreAmbient).not.toHaveBeenCalled();

    unmount();
    await new Promise((resolve) => window.setTimeout(resolve, 10));
    expect(restoreAmbient).not.toHaveBeenCalled();
  });
});
