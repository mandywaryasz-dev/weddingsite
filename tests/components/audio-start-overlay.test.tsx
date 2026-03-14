import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByText("Scroll to Begin")).toBeInTheDocument();
  });

  it("fades away after pointer interaction and keeps audio unmuted", async () => {
    render(
      <AudioProvider>
        <AudioToggle />
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    await act(async () => {
      fireEvent.pointerDown(overlay);
    });

    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
    expect(screen.getByRole("button", { name: /disable page audio/i })).toBeInTheDocument();
  });

  it("fades away after touch interaction on the overlay", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    await act(async () => {
      fireEvent.touchStart(overlay);
    });

    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
  });

  it("fades away after click interaction on the overlay", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    await act(async () => {
      fireEvent.click(overlay);
    });

    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
  });

  it("fades away after wheel interaction", async () => {
    render(
      <AudioProvider>
        <AudioStartOverlay />
      </AudioProvider>
    );

    const overlay = screen.getByTestId("audio-start-overlay");
    await act(async () => {
      fireEvent.wheel(window);
    });

    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("pointer-events-none");
  });
});
