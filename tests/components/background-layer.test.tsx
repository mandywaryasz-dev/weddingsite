import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { BackgroundLayer } from "@/components/scenes/layers/BackgroundLayer";

describe("BackgroundLayer video rendering", () => {
  const canPlayTypeSpy = vi.spyOn(HTMLVideoElement.prototype, "canPlayType");

  beforeEach(() => {
    canPlayTypeSpy.mockImplementation(() => "probably");
  });

  afterEach(() => {
    canPlayTypeSpy.mockReset();
  });

  afterAll(() => {
    canPlayTypeSpy.mockRestore();
  });

  it("renders hero-loop video with expected playback attributes", () => {
    const { container } = render(
      <BackgroundLayer
        background={{
          type: "video",
          src: "/media/hero-loop.mp4",
          sourceType: "video/mp4",
          fallbackSrc: "/media/hero-loop.webm",
          fallbackSourceType: "video/webm",
          poster: "/images/hero-poster.png",
          priority: true
        }}
        overlayIntensity="medium"
      />
    );

    const video = container.querySelector("video");
    const sources = container.querySelectorAll("video source");

    expect(video).toBeInTheDocument();
    expect(video?.hasAttribute("autoplay")).toBe(true);
    expect(video?.muted).toBe(true);
    expect(video?.hasAttribute("loop")).toBe(true);
    expect(video?.hasAttribute("playsinline")).toBe(true);
    expect(video?.hasAttribute("disablepictureinpicture")).toBe(true);
    expect(video?.getAttribute("poster")).toBe("/images/hero-poster.png");
    expect(sources.length).toBe(2);
    expect(sources[0]?.getAttribute("src")).toBe("/media/hero-loop.mp4");
    expect(sources[0]?.getAttribute("type")).toBe("video/mp4");
    expect(sources[1]?.getAttribute("src")).toBe("/media/hero-loop.webm");
    expect(sources[1]?.getAttribute("type")).toBe("video/webm");
  });

  it("falls back to poster image on video error", async () => {
    const { container } = render(
      <BackgroundLayer
        background={{
          type: "video",
          src: "/media/hero-loop.mp4",
          sourceType: "video/mp4",
          fallbackSrc: "/media/hero-loop.webm",
          fallbackSourceType: "video/webm",
          poster: "/images/hero-poster.png",
          priority: true
        }}
      />
    );

    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
    fireEvent.error(video!);

    await waitFor(() => {
      expect(container.querySelector("video")).not.toBeInTheDocument();
      expect(container.querySelector("img")).toBeInTheDocument();
    });
  });

  it("falls back to poster image when no sources are playable", async () => {
    canPlayTypeSpy.mockImplementation(() => "");

    const { container } = render(
      <BackgroundLayer
        background={{
          type: "video",
          src: "/media/hero-loop.mp4",
          sourceType: "video/mp4",
          fallbackSrc: "/media/hero-loop.webm",
          fallbackSourceType: "video/webm",
          poster: "/images/hero-poster.png",
          priority: true
        }}
      />
    );

    await waitFor(() => {
      expect(container.querySelector("video")).not.toBeInTheDocument();
      expect(container.querySelector("img")).toBeInTheDocument();
    });
  });
});
