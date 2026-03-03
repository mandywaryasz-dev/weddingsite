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
      contentClassName="justify-between py-20 sm:py-24"
      contentInnerClassName="mx-auto max-w-[38rem]"
      ornament={<div className="absolute inset-0 bg-[url('/images/bg-texture.png')] bg-cover bg-center opacity-[0.06] mix-blend-screen" />}
    >
      <div className="relative space-y-14">
        <div className="absolute left-0 top-0 h-full w-px bg-silver/40" aria-hidden />
        <div className="absolute right-0 top-0 h-full w-px bg-silver/40" aria-hidden />
        <ScrollReveal className="text-center">
          <h2 className="font-heading text-[2rem] uppercase tracking-[0.08em] text-silver sm:text-[2.3rem]">{scene.content.title}</h2>
          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={actions.openVenue}
              className="rounded-full border border-silver/55 bg-black/15 px-6 py-2.5 font-body text-lg text-silver shadow-[0_10px_25px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-white/15"
            >
              The Venue
            </button>
            <button
              type="button"
              onClick={actions.openPhotos}
              className="rounded-full border border-silver/55 bg-black/15 px-6 py-2.5 font-body text-lg text-silver shadow-[0_10px_25px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-white/15"
            >
              Our Story
            </button>
            <button
              type="button"
              onClick={actions.openMusic}
              className="rounded-full border border-silver/55 bg-black/15 px-6 py-2.5 font-body text-lg text-silver shadow-[0_10px_25px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-white/15"
            >
              The Party
            </button>
          </div>
        </ScrollReveal>
        <ScrollReveal className="space-y-4 text-center">
          {scene.content.subtitle ? <p className="mx-auto max-w-[30rem] font-body text-[2rem] leading-tight text-silver sm:text-[2.6rem]">{scene.content.subtitle}</p> : null}
          <p className="font-body text-xl text-silver/90 sm:text-2xl">{scene.content.body}</p>
          <div className="mx-auto mt-4 w-20" aria-hidden>
            <Image src="/images/monogram.svg" alt="" width={228} height={276} unoptimized className="h-auto w-full opacity-90" />
          </div>
        </ScrollReveal>
      </div>
    </Scene>
  );
}
