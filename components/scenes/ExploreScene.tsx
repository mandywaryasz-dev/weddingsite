import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { DividerRule } from "@/components/motion/DividerRule";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { ScaleSettle } from "@/components/motion/ScaleSettle";

export function ExploreScene({ scene, actions }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentClassName="flex-col"
      contentInnerClassName="mx-auto max-w-measure-lg"
      ornament={
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" aria-hidden>
          <Image src="/images/bg-texture.png" alt="" fill sizes="100vw" quality={75} unoptimized className="object-cover" />
        </div>
      }
    >
      <div className="flex flex-col gap-explore-gap">

        {/* Framed title + buttons */}
        <div className="text-center">
          <div className="relative py-10">
            <DividerRule direction="vertical" origin="top" delay={0} className="absolute left-0 top-0 h-full w-px bg-silver/40" />
            <DividerRule direction="vertical" origin="top" delay={0.06} className="absolute right-0 top-0 h-full w-px bg-silver/40" />

            <RevealBlock delay={0.12}>
              <h2 className="font-heading text-subhead uppercase tracking-heading text-silver/90">
                {scene.content.title}
              </h2>
            </RevealBlock>

            <div className="mt-5 flex flex-col items-center gap-3">
              <RevealBlock delay={0.24} variant="fade-up">
                <button
                  type="button"
                  onClick={actions.openVenue}
                  className="rounded-full border border-white/30 bg-white/10 px-[var(--btn-px)] py-[var(--btn-py)] min-h-[var(--btn-min-h)] font-body text-button text-silver/90 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
                >The Venue</button>
              </RevealBlock>
              <RevealBlock delay={0.32} variant="fade-up">
                <button
                  type="button"
                  onClick={actions.openPhotos}
                  className="rounded-full border border-white/30 bg-white/10 px-[var(--btn-px)] py-[var(--btn-py)] min-h-[var(--btn-min-h)] font-body text-button text-silver/90 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
                >Our Story</button>
              </RevealBlock>
              <RevealBlock delay={0.40} variant="fade-up">
                <button
                  type="button"
                  onClick={actions.openMusic}
                  className="rounded-full border border-white/30 bg-white/10 px-[var(--btn-px)] py-[var(--btn-py)] min-h-[var(--btn-min-h)] font-body text-button text-silver/90 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
                >The Party</button>
              </RevealBlock>
            </div>
          </div>
        </div>

        {/* Looking forward + monogram */}
        <div className="space-y-4 text-center">
          {scene.content.subtitle ? (
            <RevealBlock delay={0}>
              <p className="mx-auto max-w-[30rem] font-body text-headline text-silver/90">
                {scene.content.subtitle}
              </p>
            </RevealBlock>
          ) : null}
          <RevealBlock delay={0.12}>
            <p className="font-body text-body text-silver/90">{scene.content.body}</p>
          </RevealBlock>
          <ScaleSettle delay={0.24} className="mx-auto pt-10 w-20">
            <Image src="/images/monogram.svg" alt="" width={228} height={276} unoptimized className="h-auto w-full opacity-90" />
          </ScaleSettle>
        </div>

      </div>
    </Scene>
  );
}
