"use client";

import { type ComponentType, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioStartOverlay } from "@/components/audio/AudioStartOverlay";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { CulturalScene } from "@/components/scenes/CulturalScene";
import { ExploreScene } from "@/components/scenes/ExploreScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { PartyScene } from "@/components/scenes/PartyScene";
import { RevealScene } from "@/components/scenes/RevealScene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { sceneManifest } from "@/lib/scenes/manifest";
import { SceneComponentKey } from "@/lib/scenes/types";

const VenueModal = dynamic(() =>
  import("@/components/modals/VenueModal").then((mod) => mod.VenueModal)
);
const PhotosModal = dynamic(() =>
  import("@/components/modals/PhotosModal").then((mod) => mod.PhotosModal)
);
const MusicModal = dynamic(() =>
  import("@/components/modals/MusicModal").then((mod) => mod.MusicModal)
);

const sceneComponentMap: Record<SceneComponentKey, ComponentType<SceneComponentProps>> = {
  HeroScene,
  CulturalScene,
  RevealScene,
  PartyScene,
  ExploreScene
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
        <AudioStartOverlay />

        {sceneManifest.map((scene) => {
          const Component = sceneComponentMap[scene.component];
          return <Component key={scene.id} scene={scene} actions={actions} />;
        })}

        {venueOpen ? <VenueModal open={venueOpen} onOpenChange={setVenueOpen} /> : null}
        {photosOpen ? <PhotosModal open={photosOpen} onOpenChange={setPhotosOpen} /> : null}
        {musicOpen ? <MusicModal open={musicOpen} onOpenChange={setMusicOpen} /> : null}
      </main>
    </AudioProvider>
  );
}
