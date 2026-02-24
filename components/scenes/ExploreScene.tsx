import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ExploreScene({ scene, actions }: SceneComponentProps) {
  return (
    <Scene id={scene.id} background={scene.background} overlayIntensity={scene.overlay?.intensity}>
      <ScrollReveal className="max-w-2xl space-y-6">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-gold">{scene.content.eyebrow}</p>
        <h2 className="font-heading text-4xl text-ivory sm:text-5xl">{scene.content.title}</h2>
        <p className="text-xl text-textMuted">{scene.content.body}</p>
        <p className="text-lg text-gold">{scene.content.accent}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={actions.openVenue}
            className="rounded-full border border-gold/70 px-5 py-2 font-heading text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-forest"
          >
            Venue
          </button>
          <button
            type="button"
            onClick={actions.openPhotos}
            className="rounded-full border border-gold/70 px-5 py-2 font-heading text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-forest"
          >
            Our Photos
          </button>
        </div>
      </ScrollReveal>
    </Scene>
  );
}
