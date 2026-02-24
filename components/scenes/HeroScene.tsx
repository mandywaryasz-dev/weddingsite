import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";

export function HeroScene({ scene }: SceneComponentProps) {
  return (
    <Scene id={scene.id} background={scene.background} overlayIntensity={scene.overlay?.intensity}>
      <ScrollReveal className="max-w-2xl space-y-6">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-gold">{scene.content.eyebrow}</p>
        <h1 className="font-heading text-5xl text-ivory sm:text-6xl">{scene.content.title}</h1>
        <p className="text-2xl italic text-textMuted">{scene.content.accent}</p>
        <p className="text-xl text-textMuted">{scene.content.body}</p>
        {scene.content.hindiLine ? <p className="font-devanagari text-3xl text-ivory">{scene.content.hindiLine}</p> : null}
      </ScrollReveal>
    </Scene>
  );
}
