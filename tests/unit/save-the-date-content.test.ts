import { saveTheDateContent } from "@/lib/content/saveTheDate";
import { sceneManifest } from "@/lib/scenes/manifest";

describe("save-the-date content integrity", () => {
  it("provides content and backgrounds for every manifest scene", () => {
    for (const scene of sceneManifest) {
      expect(saveTheDateContent.scenes[scene.contentKey]).toBeDefined();
      expect(saveTheDateContent.backgrounds[scene.backgroundKey]).toBeDefined();
    }
  });

  it("exposes required modal content blocks", () => {
    expect(saveTheDateContent.modals.venue.title).toBe("The Venue");
    expect(saveTheDateContent.modals.story.title).toBe("Our Story");
    expect(saveTheDateContent.modals.party.title).toBe("The Party");
  });
});
