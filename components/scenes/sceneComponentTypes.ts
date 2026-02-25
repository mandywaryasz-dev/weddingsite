import type { ResolvedSceneDefinition, SceneRenderActions } from "@/lib/scenes/types";

export type SceneComponentProps = {
  scene: ResolvedSceneDefinition;
  actions: SceneRenderActions;
};
