import { Scene } from "@/components/scenes/Scene";
import { LotusMark, VerticalDivider } from "@/components/scenes/SceneOrnaments";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";

export function StoryScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      className={scene.className}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentAlign="center"
      contentClassName="justify-center text-center"
    >
      <ScrollRevealGroup className="mx-auto max-w-[20rem] space-y-5" threshold={0.22}>
        {scene.content.introLines?.map((line) => (
          <ScrollRevealItem key={line}>
            <p className="text-[1.85rem] leading-tight text-ivory sm:text-5xl">{line}</p>
          </ScrollRevealItem>
        ))}
        {scene.content.bodyLines?.map((line) => (
          <ScrollRevealItem key={line}>
            <p className="text-xl leading-relaxed text-textMuted sm:text-2xl">{line}</p>
          </ScrollRevealItem>
        ))}
        <ScrollRevealItem>
          <VerticalDivider className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <LotusMark className="h-10 w-10" />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </Scene>
  );
}
