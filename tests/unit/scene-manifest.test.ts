import { sceneManifest } from "@/lib/scenes/manifest";

describe("scene manifest hero background", () => {
  it("keeps hero configured as hero-loop video", () => {
    const hero = sceneManifest.find((scene) => scene.id === "hero");

    expect(hero).toBeDefined();
    expect(hero?.background.type).toBe("video");
    expect(hero?.background.src).toBe("/media/hero-loop.mp4");
    expect(hero?.background.sourceType).toBe("video/mp4");
    expect(hero?.background.fallbackSrc).toBe("/media/hero-loop.webm");
    expect(hero?.background.fallbackSourceType).toBe("video/webm");
    expect(hero?.background.poster).toBe("/images/hero-poster.png");
  });
});
