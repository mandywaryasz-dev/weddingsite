import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { AddToCalendarButton } from "@/components/ui/AddToCalendarButton";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";

export function RevealScene({ scene }: SceneComponentProps) {
  const itemCount = 7;

  return (
    <ScrollSequence itemCount={itemCount}>
      <Scene
        id={scene.id}
        background={scene.background}
        overlayIntensity={scene.overlay?.intensity}
        contentInnerClassName="mx-auto max-w-measure-lg"
        pinned
      >
        <div className="text-center">
          <ScrollSequenceItem index={0}>
            <div className="mb-[calc(var(--space-divider)+0.75rem)] flex items-center justify-center gap-5" aria-hidden>
              <div className="h-px w-20 bg-silver/70 sm:w-24" />
              <div className="w-8 opacity-95">
                <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
              </div>
              <div className="h-px w-20 bg-silver/70 sm:w-24" />
            </div>
          </ScrollSequenceItem>

          <ScrollSequenceItem index={1}>
            <h2 className="font-heading text-display tracking-display text-silver/84">{scene.content.title}</h2>
          </ScrollSequenceItem>

          {scene.content.subtitle ? (
            <ScrollSequenceItem index={2}>
              <p className="mt-5 font-body text-body text-silver/84">{scene.content.subtitle}</p>
            </ScrollSequenceItem>
          ) : null}

          {scene.content.accent ? (
            <ScrollSequenceItem index={3}>
              <p className="mt-4 font-heading text-detail uppercase tracking-[0.18em] text-silver/94">{scene.content.accent}</p>
            </ScrollSequenceItem>
          ) : null}

          <ScrollSequenceItem index={4}>
            <p className="mt-5 text-body text-silver/84">{scene.content.body}</p>
          </ScrollSequenceItem>

          <ScrollSequenceItem index={5}>
            <AddToCalendarButton label={scene.content.ctaLabel} className="mt-10" />
          </ScrollSequenceItem>

          <ScrollSequenceItem index={6}>
            <div className="mt-[calc(var(--space-divider)+1rem)] flex items-center justify-center gap-5" aria-hidden>
              <div className="h-px w-20 bg-silver/70 sm:w-24" />
              <div className="w-8 opacity-95">
                <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
              </div>
              <div className="h-px w-20 bg-silver/70 sm:w-24" />
            </div>
          </ScrollSequenceItem>
        </div>
      </Scene>
    </ScrollSequence>
  );
}
