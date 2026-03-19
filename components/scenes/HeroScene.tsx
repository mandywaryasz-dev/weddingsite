import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";
import { HeroScrollHint } from "@/components/ui/HeroScrollHint";

export function HeroScene({ scene }: SceneComponentProps) {
  const itemCount = 7;

  return (
    <ScrollSequence itemCount={itemCount}>
      <div className="relative h-full">
        <Scene
          id={scene.id}
          background={scene.background}
          overlayIntensity={scene.overlay?.intensity}
          contentInnerClassName="mx-auto max-w-measure"
          disableParallaxOrnaments
          pinned
        >
          <div className="text-center">
            <h1 className="font-body text-silver">
              <ScrollSequenceItem index={0} as="span" className="block text-[clamp(2.15rem,1.9rem+1.45vw,2.85rem)] leading-[1.02]">
                {scene.content.title}
              </ScrollSequenceItem>
              {scene.content.subtitle ? (
                <ScrollSequenceItem index={1} as="span" className="block pl-6 pt-2 text-[clamp(1.08rem,0.98rem+0.35vw,1.24rem)] italic tracking-[0.08em] text-silver/74 sm:pl-10">
                  {scene.content.subtitle}
                </ScrollSequenceItem>
              ) : null}
              <ScrollSequenceItem index={2} as="span" className="block pt-5 text-[clamp(1.52rem,1.28rem+0.72vw,1.95rem)] leading-[1.18] text-silver/94">
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
        <HeroScrollHint />
      </div>
    </ScrollSequence>
  );
}
