import type { SceneDefinition } from "@/lib/scenes/types";

export const sceneManifest: SceneDefinition[] = [
  {
    id: "hero",
    component: "HeroScene",
    contentKey: "hero",
    backgroundKey: "landscapePrimary",
    overlay: { intensity: "heavy" }
  },
  {
    id: "cultural",
    component: "CulturalScene",
    contentKey: "cultural",
    backgroundKey: "redPrimary",
    overlay: { intensity: "medium" }
  },
  {
    id: "reveal",
    component: "RevealScene",
    contentKey: "reveal",
    backgroundKey: "landscapeSecondary",
    overlay: { intensity: "heavy" }
  },
  {
    id: "story",
    component: "StoryScene",
    contentKey: "story",
    backgroundKey: "redSecondary",
    overlay: { intensity: "medium" }
  },
  {
    id: "explore",
    component: "ExploreScene",
    contentKey: "explore",
    backgroundKey: "bottomPrimary",
    overlay: { intensity: "light" }
  },
  {
    id: "party",
    component: "PartyScene",
    contentKey: "party",
    backgroundKey: "bottomSecondary",
    overlay: { intensity: "medium" }
  }
];
