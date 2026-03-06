import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";

export function PartyScene({ scene }: SceneComponentProps) {
  const itemCount = 5;

  return (
    <ScrollSequence itemCount={itemCount}>
      <Scene
        id={scene.id}
        background={scene.background}
        overlayIntensity={scene.overlay?.intensity}
        contentInnerClassName="mx-auto max-w-[31rem]"
        pinned
      >
        <div className="text-center">
          <ScrollSequenceItem index={0}>
            <div className="mx-auto mb-[calc(var(--space-divider)+0.75rem)] h-14 w-px bg-silver/70" />
          </ScrollSequenceItem>

          <h2 className="font-body text-subhead leading-[1.55] text-silver/84">
            <ScrollSequenceItem index={1} as="span" className="block">
              {scene.content.title}
            </ScrollSequenceItem>
            {scene.content.subtitle ? (
              <ScrollSequenceItem index={2} as="span" className="mt-2 block">
                {scene.content.subtitle}
              </ScrollSequenceItem>
            ) : null}
            <ScrollSequenceItem index={3} as="span" className="mt-3 block">
              {scene.content.body}
            </ScrollSequenceItem>
          </h2>

          <ScrollSequenceItem index={4} className="mx-auto mt-[calc(var(--space-divider)+0.5rem)] w-16 sm:w-[4.5rem]">
            <Image src="/images/party-flower.svg" alt="" width={180} height={180} unoptimized className="h-auto w-full opacity-90" />
          </ScrollSequenceItem>
        </div>
      </Scene>
    </ScrollSequence>
  );
}
