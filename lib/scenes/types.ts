export type SceneId = "hero" | "cultural" | "reveal" | "party" | "explore";

export type SceneComponentKey = "HeroScene" | "CulturalScene" | "RevealScene" | "PartyScene" | "ExploreScene";

export type BackgroundMedia = {
  type: "image" | "video";
  src: string;
  sourceType?: string;
  fallbackSrc?: string;
  fallbackSourceType?: string;
  poster?: string;
  mobileSrc?: string;
  desktopSrc?: string;
  priority?: boolean;
};

export type SceneContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body: string;
  secondaryBody?: string;
  accent?: string;
  hindiLine?: string;
  ctaLabel?: string;
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
