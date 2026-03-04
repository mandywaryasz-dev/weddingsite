import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ExploreScene({ scene, actions }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentClassName="flex-col py-28 sm:py-40"
      contentInnerClassName="mx-auto max-w-[38rem]"
      ornament={
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" aria-hidden>
          <Image src="/images/bg-texture.png" alt="" fill sizes="100vw" quality={75} className="object-cover" />
        </div>
      }
    >
      <div className="flex flex-col gap-48 sm:gap-64">

        {/* Framed title + buttons */}
        <ScrollReveal className="text-center">
          <div className="relative py-10">
            <div className="absolute left-0 top-0 h-full w-px bg-silver/40" aria-hidden />
            <div className="absolute right-0 top-0 h-full w-px bg-silver/40" aria-hidden />
            <h2 className="font-heading text-[2rem] uppercase tracking-[0.08em] text-silver sm:text-[2.3rem]">
              {scene.content.title}
            </h2>
            <div className="mt-5 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={actions.openVenue}
                className="rounded-full border border-white/30 bg-white/10 px-10 py-3.5 font-body text-xl text-silver shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
              >The Venue</button>
              <button
                type="button"
                onClick={actions.openPhotos}
                className="rounded-full border border-white/30 bg-white/10 px-10 py-3.5 font-body text-xl text-silver shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
              >Our Story</button>
              <button
                type="button"
                onClick={actions.openMusic}
                className="rounded-full border border-white/30 bg-white/10 px-10 py-3.5 font-body text-xl text-silver shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:bg-white/20"
              >The Party</button>
            </div>
          </div>
        </ScrollReveal>

        {/* Looking forward + monogram */}
        <ScrollReveal className="space-y-4 text-center">
          {scene.content.subtitle ? (
            <p className="mx-auto max-w-[30rem] font-body text-[2rem] leading-tight text-silver sm:text-[2.6rem]">
              {scene.content.subtitle}
            </p>
          ) : null}
          <p className="font-body text-xl text-silver/90 sm:text-2xl">{scene.content.body}</p>
          <div className="mx-auto pt-10 w-20" aria-hidden>
            <Image src="/images/monogram.svg" alt="" width={228} height={276} unoptimized className="h-auto w-full opacity-90" />
          </div>
        </ScrollReveal>

      </div>
    </Scene>
  );
}
