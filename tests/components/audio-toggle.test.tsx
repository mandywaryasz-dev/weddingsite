import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { AUDIO_MUTED_KEY } from "@/lib/audio/constants";

describe("AudioToggle", () => {
  it("persists mute state in sessionStorage", () => {
    render(
      <AudioProvider>
        <AudioToggle />
      </AudioProvider>
    );

    const button = screen.getByRole("button", { name: /enable page audio/i });
    fireEvent.click(button);

    expect(window.sessionStorage.getItem(AUDIO_MUTED_KEY)).toBe("false");
  });
});
