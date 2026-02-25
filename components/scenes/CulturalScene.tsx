import { Scene } from "@/components/scenes/Scene";
import { LotusMark, VerticalDivider } from "@/components/scenes/SceneOrnaments";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";

export function CulturalScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      className={scene.className}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentAlign="center"
      contentClassName="justify-center text-center"
    >
      <ScrollRevealGroup className="mx-auto max-w-[22rem] space-y-6" threshold={0.2}>
        <div className="space-y-2">
          {scene.content.introLines?.map((line) => (
            <ScrollRevealItem key={line}>
              <p className="font-heading text-xl uppercase tracking-[0.11em] text-white sm:text-2xl">{line}</p>
            </ScrollRevealItem>
          ))}
        </div>

        <ScrollRevealItem>
          <VerticalDivider className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="text-lg leading-relaxed text-textMuted sm:text-xl">{scene.content.bodyLines?.[0]}</p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="text-lg leading-relaxed text-textMuted sm:text-xl">{scene.content.bodyLines?.[1]}</p>
        </ScrollRevealItem>
        {scene.content.hindiLine ? (
          <ScrollRevealItem>
            <p className="font-devanagari text-xl leading-relaxed text-ivory sm:text-2xl">{scene.content.hindiLine}</p>
          </ScrollRevealItem>
        ) : null}
        <ScrollRevealItem>
          <LotusMark className="h-8 w-8" />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </Scene>
  );
}
