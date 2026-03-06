import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";

export function CulturalScene({ scene }: SceneComponentProps) {
  const itemCount = 10;
  const accentLines = scene.content.accent
    ?.match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((line) => line.trim())
    .filter(Boolean) ?? [];
  const [accentFirstLine, accentSecondLine] = accentLines;

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
          <div className="text-center">
            <ScrollSequenceItem index={0} className="mx-auto mb-6 w-10 opacity-95">
              <Image src="/images/lotus.svg" alt="" width={108} height={108} unoptimized className="h-auto w-full" />
            </ScrollSequenceItem>

            <div className="font-body text-silver">
              <ScrollSequenceItem index={1} as="p" className="text-[clamp(1.9rem,1.65rem+0.95vw,2.45rem)] leading-[1.04] text-silver/92">
                {scene.content.title}
              </ScrollSequenceItem>

              {scene.content.subtitle ? (
                <ScrollSequenceItem
                  index={2}
                  as="p"
                  className="pl-7 pt-2 text-[clamp(1.02rem,0.95rem+0.28vw,1.18rem)] italic tracking-[0.08em] text-silver/72 sm:pl-12"
                >
                  {scene.content.subtitle}
                </ScrollSequenceItem>
              ) : null}

              <ScrollSequenceItem
                index={3}
                as="p"
                className="pt-5 text-[clamp(1.38rem,1.22rem+0.62vw,1.8rem)] leading-[1.18] text-silver/94"
              >
                {scene.content.body}
              </ScrollSequenceItem>
            </div>

            <ScrollSequenceItem index={4} className="mx-auto mt-8 mb-7 h-16 w-px bg-silver/75" />

            {accentFirstLine ? (
              <ScrollSequenceItem index={5} as="p" className="font-body text-[clamp(1.24rem,1.12rem+0.38vw,1.46rem)] leading-[1.3] text-silver/90">
                {accentFirstLine}
              </ScrollSequenceItem>
            ) : null}

            {accentSecondLine ? (
              <ScrollSequenceItem
                index={6}
                as="p"
                className="pl-5 pt-3 font-body text-[clamp(1.16rem,1.06rem+0.32vw,1.34rem)] leading-[1.34] text-silver/82 sm:pl-8"
              >
                {accentSecondLine}
              </ScrollSequenceItem>
            ) : scene.content.accent ? (
              <ScrollSequenceItem index={6} as="p" className="pt-3 font-body text-[clamp(1.16rem,1.06rem+0.32vw,1.34rem)] leading-[1.34] text-silver/82">
                {scene.content.accent}
              </ScrollSequenceItem>
            ) : null}

            {scene.content.secondaryBody ? (
              <ScrollSequenceItem
                index={7}
                as="p"
                className="pt-5 font-heading text-detail uppercase tracking-[0.18em] text-silver/88"
              >
                {scene.content.secondaryBody}
              </ScrollSequenceItem>
            ) : null}

            {scene.content.hindiLine ? (
              <ScrollSequenceItem index={8}>
                <p className="mt-6 font-devanagari text-body-sm text-silver/84">{scene.content.hindiLine}</p>
              </ScrollSequenceItem>
            ) : null}

            <ScrollSequenceItem index={9} className="mx-auto mt-[calc(var(--space-divider)+0.75rem)] w-14 opacity-80">
              <Image src="/images/culture-flower.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
            </ScrollSequenceItem>
          </div>
        </div>
      </Scene>
    </ScrollSequence>
  );
}
