import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StoryScene({ scene }: SceneComponentProps) {
  return (
    <Scene id={scene.id} background={scene.background} overlayIntensity={scene.overlay?.intensity}>
      <ScrollReveal className="max-w-2xl space-y-5">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-gold">{scene.content.eyebrow}</p>
        <h2 className="font-heading text-4xl text-ivory sm:text-5xl">{scene.content.title}</h2>
        <p className="text-2xl text-gold">{scene.content.accent}</p>
        <p className="text-xl text-textMuted">{scene.content.body}</p>
      </ScrollReveal>
    </Scene>
  );
}
