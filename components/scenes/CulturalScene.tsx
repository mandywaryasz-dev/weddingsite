import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";

export function CulturalScene({ scene }: SceneComponentProps) {
  const itemCount = 8;

  return (
    <ScrollSequence itemCount={itemCount}>
      <Scene
        id={scene.id}
        background={scene.background}
        overlayIntensity={scene.overlay?.intensity}
        contentInnerClassName="mx-auto max-w-measure"
        pinned
        ornament={
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen" aria-hidden>
            <Image src="/images/bg-texture.png" alt="" fill sizes="100vw" quality={75} unoptimized className="object-cover" />
          </div>
        }
      >
        <div className="relative px-6">
          {/* Frame lines — static, not scroll-driven */}
          <div className="absolute left-0 top-0 h-full w-px bg-silver/40" />
          <div className="absolute right-0 top-0 h-full w-px bg-silver/40" />

          <div className="text-center">
            <ScrollSequenceItem index={0} className="mx-auto mb-stack-sm w-8 opacity-95">
              <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
            </ScrollSequenceItem>

            <h2 className="font-heading text-headline tracking-heading text-silver/90">
              <ScrollSequenceItem index={1} as="span" className="block">
                {scene.content.title}
              </ScrollSequenceItem>
              {scene.content.subtitle ? (
                <ScrollSequenceItem index={2} as="span" className="block">
                  {scene.content.subtitle}
                </ScrollSequenceItem>
              ) : null}
              <ScrollSequenceItem index={3} as="span" className="block">
                {scene.content.body}
              </ScrollSequenceItem>
            </h2>

            <ScrollSequenceItem index={4} className="mx-auto mb-stack-sm h-14 w-px bg-silver/75" />

            <ScrollSequenceItem index={5}>
              <p className="text-body text-silver/90">{scene.content.accent}</p>
            </ScrollSequenceItem>

            {scene.content.secondaryBody ? (
              <ScrollSequenceItem index={6}>
                <p className="mt-1 text-body text-silver/90">{scene.content.secondaryBody}</p>
                {scene.content.hindiLine ? (
                  <p className="mt-4 font-devanagari text-body-sm text-silver/90">{scene.content.hindiLine}</p>
                ) : null}
              </ScrollSequenceItem>
            ) : null}

            <ScrollSequenceItem index={7} className="mx-auto mt-divider w-14 opacity-80">
              <Image src="/images/culture-flower.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
            </ScrollSequenceItem>
          </div>
        </div>
      </Scene>
    </ScrollSequence>
  );
}
