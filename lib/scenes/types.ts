import type {
  SaveTheDateBackgroundKey,
  SaveTheDateSceneContent,
  SaveTheDateSceneKey,
  SceneBackgroundMedia
} from "@/lib/content/types";
import type { ModalId } from "@/lib/modals/types";

export type SceneId = SaveTheDateSceneKey;

export type SceneComponentKey =
  | "HeroScene"
  | "StoryScene"
  | "CulturalScene"
  | "RevealScene"
  | "ExploreScene"
  | "PartyScene";

export type BackgroundMedia = SceneBackgroundMedia;

export type SceneDefinition = {
  id: SceneId;
  component: SceneComponentKey;
  className?: string;
  contentKey: SaveTheDateSceneKey;
  backgroundKey: SaveTheDateBackgroundKey;
  overlay?: {
    intensity?: "light" | "medium" | "heavy";
  };
};

export type ResolvedSceneDefinition = SceneDefinition & {
  content: SaveTheDateSceneContent;
  background: BackgroundMedia;
};

export type SceneRenderActions = {
  openModal: (modalId: ModalId) => void;
};
