import Image from "next/image";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { ScrollSequenceItem } from "@/components/motion/ScrollSequenceItem";
import { BackgroundLayer } from "@/components/scenes/layers/BackgroundLayer";
import { AtmosphereLayer } from "@/components/scenes/layers/AtmosphereLayer";
import { OrnamentLayer } from "@/components/scenes/layers/OrnamentLayer";
import { ContentLayer } from "@/components/scenes/layers/ContentLayer";

export function ExploreScene({ scene, actions }: SceneComponentProps) {
  return (
    <section id={scene.id} className="relative w-full overflow-clip isolate">
      <div className="sticky top-0 h-screen -mb-[100vh]">
        <BackgroundLayer background={scene.background} overlayIntensity={scene.overlay?.intensity} />
        <AtmosphereLayer />
        <OrnamentLayer>
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" aria-hidden>
            <Image src="/images/bg-texture.png" alt="" fill sizes="100vw" quality={75} unoptimized className="object-cover" />
          </div>
        </OrnamentLayer>
      </div>

      <ScrollSequence transparent itemCount={4} className="relative">
        <ContentLayer align="center" className="flex-col" innerClassName="mx-auto max-w-measure-lg" pinned>
          <div className="flex flex-col gap-explore-gap">
            <div className="text-center">
              <div className="relative py-10">
                <ScrollSequenceItem index={0}>
                  <h2 className="font-heading text-subhead uppercase tracking-heading text-silver/84">
                    {scene.content.title}
                  </h2>
                </ScrollSequenceItem>

                <div className="mt-8 flex flex-col items-center gap-5">
                  <ScrollSequenceItem index={1}>
                    <button
                      type="button"
                      onClick={actions.openVenue}
                      className="rounded-full border border-white/30 bg-white/10 px-[var(--btn-px)] py-[var(--btn-py)] min-h-[var(--btn-min-h)] font-body text-button text-silver/84 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
                    >The Venue</button>
                  </ScrollSequenceItem>
                  <ScrollSequenceItem index={2}>
                    <button
                      type="button"
                      onClick={actions.openPhotos}
                      className="rounded-full border border-white/30 bg-white/10 px-[var(--btn-px)] py-[var(--btn-py)] min-h-[var(--btn-min-h)] font-body text-button text-silver/84 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
                    >Our Story</button>
                  </ScrollSequenceItem>
                  <ScrollSequenceItem index={3}>
                    <button
                      type="button"
                      onClick={actions.openMusic}
                      className="rounded-full border border-white/30 bg-white/10 px-[var(--btn-px)] py-[var(--btn-py)] min-h-[var(--btn-min-h)] font-body text-button text-silver/84 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
                    >The Party</button>
                  </ScrollSequenceItem>
                </div>
              </div>
            </div>
          </div>
        </ContentLayer>
      </ScrollSequence>

      <ScrollSequence transparent itemCount={4} className="relative">
        <ContentLayer align="center" className="flex-col" innerClassName="mx-auto max-w-measure-lg" pinned>
          <div className="space-y-6 text-center">
            <ScrollSequenceItem index={0} className="flex w-full justify-center">
              <div className="h-10 w-px bg-silver/65" aria-hidden />
            </ScrollSequenceItem>
            {scene.content.subtitle ? (
              <ScrollSequenceItem index={1}>
                <p className="mx-auto max-w-[30rem] font-body text-headline text-silver/84">
                  {scene.content.subtitle}
                </p>
              </ScrollSequenceItem>
            ) : null}
            <ScrollSequenceItem index={2}>
              <p className="font-body text-body text-silver/84">{scene.content.body}</p>
            </ScrollSequenceItem>
            <ScrollSequenceItem index={3} className="mx-auto pt-14">
              <div className="relative mx-auto flex justify-center">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,239,228,0.2),rgba(245,239,228,0.06)_40%,transparent_72%)] blur-xl"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.24),rgba(0,0,0,0.12)_46%,transparent_74%)] blur-md"
                />
                <div className="relative w-24 sm:w-28">
                  <Image
                    src="/images/monogram.png"
                    alt=""
                    width={260}
                    height={314}
                    unoptimized
                    className="h-auto w-full opacity-[0.98] drop-shadow-[0_1px_1px_rgba(0,0,0,0.14)]"
                  />
                </div>
              </div>
            </ScrollSequenceItem>
          </div>
        </ContentLayer>
      </ScrollSequence>
    </section>
  );
}
