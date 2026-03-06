import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";

export function HeroScene({ scene }: SceneComponentProps) {
  const itemCount = 7;

  return (
    <ScrollSequence itemCount={itemCount}>
      <Scene
        id={scene.id}
        background={scene.background}
        overlayIntensity={scene.overlay?.intensity}
        contentInnerClassName="mx-auto max-w-measure"
        disableParallaxOrnaments
        pinned
      >
        <div className="text-center">
          <h1 className="font-body text-headline text-silver">
            <ScrollSequenceItem index={0} as="span" className="block">
              {scene.content.title}
            </ScrollSequenceItem>
            {scene.content.subtitle ? (
              <ScrollSequenceItem index={1} as="span" className="block">
                {scene.content.subtitle}
              </ScrollSequenceItem>
            ) : null}
            <ScrollSequenceItem index={2} as="span" className="block">
              {scene.content.body}
            </ScrollSequenceItem>
          </h1>

          <ScrollSequenceItem index={3}>
            <p className="mt-10 font-heading text-detail uppercase tracking-label text-silver/95">
              {scene.content.accent}
            </p>
          </ScrollSequenceItem>

          {scene.content.secondaryBody ? (
            <ScrollSequenceItem index={4}>
              <p className="mt-3 font-heading text-detail uppercase tracking-label text-silver/95">
                {scene.content.secondaryBody}
              </p>
            </ScrollSequenceItem>
          ) : null}

          <ScrollSequenceItem index={5} className="mx-auto mt-[calc(var(--space-divider)+0.5rem)] h-16 w-px bg-silver/75" />

          <ScrollSequenceItem index={6} className="mx-auto mt-[calc(var(--space-divider)+0.25rem)] w-14 opacity-95 sm:w-16">
            <Image src="/images/lotus.svg" alt="" width={120} height={120} unoptimized className="h-auto w-full" />
          </ScrollSequenceItem>
        </div>
      </Scene>
    </ScrollSequence>
  );
}
