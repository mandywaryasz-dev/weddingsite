import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CulturalScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      ornament={
        <svg viewBox="0 0 500 500" className="absolute -right-24 top-20 h-72 w-72 text-gold/25" fill="none">
          <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="1" />
        </svg>
      }
    >
      <ScrollReveal className="max-w-2xl space-y-5">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-gold">{scene.content.eyebrow}</p>
        <h2 className="font-heading text-4xl text-ivory sm:text-5xl">{scene.content.title}</h2>
        <p className="text-xl text-textMuted">{scene.content.body}</p>
        <p className="text-lg uppercase tracking-[0.14em] text-gold">{scene.content.accent}</p>
      </ScrollReveal>
    </Scene>
  );
}
