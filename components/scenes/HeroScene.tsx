import { Scene } from "@/components/scenes/Scene";
import { LotusMark, VerticalDivider } from "@/components/scenes/SceneOrnaments";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";

export function HeroScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      className={scene.className}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentAlign="center"
      contentClassName="justify-center text-center"
    >
      <ScrollRevealGroup className="mx-auto max-w-[22rem] space-y-6" threshold={0.22}>
        <div className="space-y-2 text-[2.02rem] leading-tight text-ivory sm:text-5xl">
          {scene.content.introLines?.map((line) => (
            <ScrollRevealItem key={line}>
              <p className="font-body">{line}</p>
            </ScrollRevealItem>
          ))}
        </div>

        <ScrollRevealItem>
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-white/85">{scene.content.detailLines?.[0]}</p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-white/75">{scene.content.detailLines?.[1]}</p>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <VerticalDivider className="mx-auto h-14 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <LotusMark className="h-9 w-9" />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </Scene>
  );
}
