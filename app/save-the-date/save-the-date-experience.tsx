"use client";

import { type ComponentType, useMemo, useState } from "react";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { MusicModal } from "@/components/modals/MusicModal";
import { PhotosModal } from "@/components/modals/PhotosModal";
import { VenueModal } from "@/components/modals/VenueModal";
import { CulturalScene } from "@/components/scenes/CulturalScene";
import { ExploreScene } from "@/components/scenes/ExploreScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { PartyScene } from "@/components/scenes/PartyScene";
import { RevealScene } from "@/components/scenes/RevealScene";
import { StoryScene } from "@/components/scenes/StoryScene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { sceneManifest } from "@/lib/scenes/manifest";
import { SceneComponentKey } from "@/lib/scenes/types";

const sceneComponentMap: Record<SceneComponentKey, ComponentType<SceneComponentProps>> = {
  HeroScene,
  StoryScene,
  CulturalScene,
  RevealScene,
  ExploreScene,
  PartyScene
};

export function SaveTheDateExperience() {
  const [venueOpen, setVenueOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);

  const actions = useMemo(
    () => ({
      openVenue: () => setVenueOpen(true),
      openPhotos: () => setPhotosOpen(true),
      openMusic: () => setMusicOpen(true)
    }),
    []
  );

  return (
    <AudioProvider>
      <main className="relative isolate">
        <AudioToggle />

        {sceneManifest.map((scene) => {
          const Component = sceneComponentMap[scene.component];
          return <Component key={scene.id} scene={scene} actions={actions} />;
        })}

        <VenueModal open={venueOpen} onOpenChange={setVenueOpen} />
        <PhotosModal open={photosOpen} onOpenChange={setPhotosOpen} />
        <MusicModal open={musicOpen} onOpenChange={setMusicOpen} />
      </main>
    </AudioProvider>
  );
}
