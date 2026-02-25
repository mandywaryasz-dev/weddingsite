"use client";

import { type ComponentType, useMemo, useState } from "react";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { PartyModal } from "@/components/modals/PartyModal";
import { StoryModal } from "@/components/modals/StoryModal";
import { VenueModal } from "@/components/modals/VenueModal";
import { CulturalScene } from "@/components/scenes/CulturalScene";
import { ExploreScene } from "@/components/scenes/ExploreScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { PartyScene } from "@/components/scenes/PartyScene";
import { RevealScene } from "@/components/scenes/RevealScene";
import { StoryScene } from "@/components/scenes/StoryScene";
import type { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { saveTheDateContent } from "@/lib/content/saveTheDate";
import type { ModalId } from "@/lib/modals/types";
import { sceneManifest } from "@/lib/scenes/manifest";
import type { SceneComponentKey } from "@/lib/scenes/types";

const sceneComponentMap: Record<SceneComponentKey, ComponentType<SceneComponentProps>> = {
  HeroScene,
  StoryScene,
  CulturalScene,
  RevealScene,
  ExploreScene,
  PartyScene
};

export function SaveTheDateExperience() {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const scenes = useMemo(
    () =>
      sceneManifest.map((scene) => ({
        ...scene,
        content: saveTheDateContent.scenes[scene.contentKey],
        background: saveTheDateContent.backgrounds[scene.backgroundKey]
      })),
    []
  );

  const actions = useMemo(
    () => ({
      openModal: (modalId: ModalId) => setActiveModal(modalId)
    }),
    []
  );

  return (
    <AudioProvider>
      <main className="relative isolate">
        <AudioToggle />

        {scenes.map((scene) => {
          const Component = sceneComponentMap[scene.component];
          return <Component key={scene.id} scene={scene} actions={actions} />;
        })}

        <VenueModal open={activeModal === "venue"} onOpenChange={(open) => setActiveModal(open ? "venue" : null)} />
        <StoryModal open={activeModal === "story"} onOpenChange={(open) => setActiveModal(open ? "story" : null)} />
        <PartyModal open={activeModal === "party"} onOpenChange={(open) => setActiveModal(open ? "party" : null)} />
      </main>
    </AudioProvider>
  );
}
