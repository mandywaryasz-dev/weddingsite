import { Scene } from "@/components/scenes/Scene";
import { HorizontalDivider, LotusMark } from "@/components/scenes/SceneOrnaments";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { AddToCalendarButton } from "@/components/ui/AddToCalendarButton";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";

export function RevealScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      className={scene.className}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentAlign="center"
      contentClassName="justify-center text-center"
    >
      <ScrollRevealGroup className="mx-auto max-w-[22rem] space-y-5" threshold={0.24}>
        <ScrollRevealItem>
          <HorizontalDivider />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <LotusMark className="h-8 w-8" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <h2 className="font-heading text-5xl uppercase tracking-[0.07em] text-ivory sm:text-6xl">{scene.content.title}</h2>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="text-lg text-textMuted sm:text-xl">{scene.content.namesLine}</p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-white/80">{scene.content.detailLines?.[0]}</p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-white/75">{scene.content.detailLines?.[1]}</p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <AddToCalendarButton label={scene.content.ctaLabel} />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <LotusMark className="h-8 w-8" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <HorizontalDivider />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </Scene>
  );
}
