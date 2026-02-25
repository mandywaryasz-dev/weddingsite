import { Scene } from "@/components/scenes/Scene";
import { MonogramSeal } from "@/components/scenes/SceneOrnaments";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";

export function PartyScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      className={scene.className}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentAlign="center"
      contentClassName="justify-center text-center"
    >
      <ScrollRevealGroup className="mx-auto max-w-[24rem] space-y-4" threshold={0.22}>
        <ScrollRevealItem>
          <p className="text-[2.05rem] leading-tight text-ivory sm:text-5xl">{scene.content.closingLine}</p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="text-lg text-textMuted sm:text-xl">{scene.content.subLine}</p>
        </ScrollRevealItem>
        <ScrollRevealItem className="pt-8">
          <MonogramSeal />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </Scene>
  );
}
