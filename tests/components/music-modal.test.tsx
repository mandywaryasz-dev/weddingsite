import React from "react";
import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MusicModal } from "@/components/modals/MusicModal";

const duckAmbient = vi.fn(async () => undefined);
const restoreAmbient = vi.fn(async () => undefined);

vi.mock("@/components/audio/AudioProvider", () => ({
  useAudio: () => ({
    duckAmbient,
    restoreAmbient
  })
}));

describe("MusicModal audio behavior", () => {
  it("ducks ambient when opened and restores on close", async () => {
    const { rerender, unmount } = render(<MusicModal open onOpenChange={() => undefined} />);

    await waitFor(() => expect(duckAmbient).toHaveBeenCalledWith(0));

    rerender(<MusicModal open={false} onOpenChange={() => undefined} />);
    await waitFor(() => expect(restoreAmbient).toHaveBeenCalledWith(0.3));

    unmount();
    await waitFor(() => expect(restoreAmbient).toHaveBeenCalled());
  });
});
