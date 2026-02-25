import type { ModalId } from "@/lib/modals/types";

export type SaveTheDateSceneKey = "hero" | "cultural" | "reveal" | "story" | "explore" | "party";

export type SaveTheDateBackgroundKey =
  | "landscapePrimary"
  | "landscapeSecondary"
  | "redPrimary"
  | "redSecondary"
  | "bottomPrimary"
  | "bottomSecondary";

export type SceneButton = {
  label: string;
  modalId: ModalId;
};

export type SaveTheDateSceneContent = {
  title?: string;
  introLines?: string[];
  bodyLines?: string[];
  detailLines?: string[];
  hindiLine?: string;
  namesLine?: string;
  ctaLabel?: string;
  buttons?: SceneButton[];
  closingLine?: string;
  subLine?: string;
};

export type VenueModalContent = {
  title: string;
  description: string;
  bodyLines: string[];
  heroImageSrc: string;
  heroImageAlt: string;
  gallery: Array<{
    src: string;
    alt: string;
  }>;
};

export type StoryModalContent = {
  title: string;
  description: string;
  bodyLines: string[];
  placeholders: Array<{
    key: string;
    label: string;
    caption: string;
  }>;
};

export type PartyModalContent = {
  title: string;
  description: string;
  bodyLines: string[];
  audioSrc: string;
};

export type SaveTheDateContent = {
  scenes: Record<SaveTheDateSceneKey, SaveTheDateSceneContent>;
  backgrounds: Record<SaveTheDateBackgroundKey, SceneBackgroundMedia>;
  modals: {
    venue: VenueModalContent;
    story: StoryModalContent;
    party: PartyModalContent;
  };
};
export type SceneBackgroundMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  mobileSrc?: string;
  desktopSrc?: string;
  priority?: boolean;
};
