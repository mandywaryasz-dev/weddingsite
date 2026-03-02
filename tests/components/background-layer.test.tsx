import React from "react";
import { render } from "@testing-library/react";
import { BackgroundLayer } from "@/components/scenes/layers/BackgroundLayer";

describe("BackgroundLayer video rendering", () => {
  it("renders hero-loop video with expected playback attributes", () => {
    const { container } = render(
      <BackgroundLayer
        background={{
          type: "video",
          src: "/media/hero-loop.mp4",
          sourceType: "video/quicktime",
          fallbackSrc: "/images/video-1.mp4",
          fallbackSourceType: "video/mp4",
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
    expect(video?.getAttribute("poster")).toBe("/images/hero-poster.png");
    expect(sources.length).toBe(2);
    expect(sources[0]?.getAttribute("src")).toBe("/media/hero-loop.mp4");
    expect(sources[0]?.getAttribute("type")).toBe("video/quicktime");
    expect(sources[1]?.getAttribute("src")).toBe("/images/video-1.mp4");
    expect(sources[1]?.getAttribute("type")).toBe("video/mp4");
  });
});
