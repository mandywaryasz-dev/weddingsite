export type SceneId = "hero" | "story" | "cultural" | "reveal" | "explore" | "party";

export type SceneComponentKey =
  | "HeroScene"
  | "StoryScene"
  | "CulturalScene"
  | "RevealScene"
  | "ExploreScene"
  | "PartyScene";

export type BackgroundMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  mobileSrc?: string;
  desktopSrc?: string;
  priority?: boolean;
};

export type SceneContent = {
  eyebrow: string;
  title: string;
  body: string;
  accent?: string;
  hindiLine?: string;
};

export type SceneDefinition = {
  id: SceneId;
  component: SceneComponentKey;
  className?: string;
  background: BackgroundMedia;
  overlay?: {
    intensity?: "light" | "medium" | "heavy";
  };
  content: SceneContent;
};

export type SceneRenderActions = {
  openVenue: () => void;
  openPhotos: () => void;
  openMusic: () => void;
};
