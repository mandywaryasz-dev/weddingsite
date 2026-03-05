import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { AUDIO_MUTED_KEY } from "@/lib/audio/constants";

describe("AudioToggle", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("defaults to unmuted on first visit and toggles to muted on click", () => {
    render(
      <AudioProvider>
        <AudioToggle />
      </AudioProvider>
    );

    const button = screen.getByRole("button", { name: /disable page audio/i });
    expect(screen.queryByText(/audio on/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/audio off/i)).not.toBeInTheDocument();
    expect(button.querySelector("svg")).not.toBeNull();

    fireEvent.click(button);

    const toggledButton = screen.getByRole("button", { name: /enable page audio/i });
    expect(toggledButton.querySelector("svg")).not.toBeNull();
  });

  it("ignores saved muted preference and still starts unmuted", () => {
    window.sessionStorage.setItem(AUDIO_MUTED_KEY, "true");

    render(
      <AudioProvider>
        <AudioToggle />
      </AudioProvider>
    );

    expect(screen.getByRole("button", { name: /disable page audio/i })).toBeInTheDocument();
  });
});
