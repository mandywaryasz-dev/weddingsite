import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";
import { AudioToggle } from "@/components/audio/AudioToggle";

describe("AudioStartOverlay", () => {
  it("shows on initial load", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass("opacity-100");
  });

  it("fades away after pointer interaction and keeps audio unmuted", () => {
    render(
      <AudioProvider>
        <AudioToggle />
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    fireEvent.pointerDown(window);

    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
    expect(screen.getByRole("button", { name: /disable page audio/i })).toBeInTheDocument();
  });

  it("fades away after wheel interaction", () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    fireEvent.wheel(window);

    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
  });
});
