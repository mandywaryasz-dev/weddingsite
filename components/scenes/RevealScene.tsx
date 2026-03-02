import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { AddToCalendarButton } from "@/components/ui/AddToCalendarButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function RevealScene({ scene }: SceneComponentProps) {
  return (
    <Scene id={scene.id} background={scene.background} overlayIntensity={scene.overlay?.intensity} contentInnerClassName="mx-auto max-w-[38rem]">
      <ScrollReveal className="text-center">
        <div className="mb-10 flex items-center justify-center gap-5" aria-hidden>
          <span className="h-px w-20 bg-ivory/70 sm:w-24" />
          <span className="w-8 opacity-95">
            <Image src="/images/monogram.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </span>
          <span className="h-px w-20 bg-ivory/70 sm:w-24" />
        </div>
        <h2 className="font-heading text-5xl tracking-[0.06em] text-ivory sm:text-[4.2rem]">{scene.content.title}</h2>
        {scene.content.subtitle ? <p className="mt-4 font-body text-xl text-ivory/95 sm:text-3xl">{scene.content.subtitle}</p> : null}
        <p className="mt-3 text-xl text-ivory/95 sm:text-2xl">{scene.content.body}</p>
        {scene.content.accent ? (
          <p className="mt-2 font-heading text-[0.64rem] uppercase tracking-[0.22em] text-ivory/95 sm:text-xs">{scene.content.accent}</p>
        ) : null}
        <AddToCalendarButton label={scene.content.ctaLabel} className="mt-8" />
        <div className="mt-10 flex items-center justify-center gap-5" aria-hidden>
          <span className="h-px w-20 bg-ivory/70 sm:w-24" />
          <span className="w-8 opacity-95">
            <Image src="/images/monogram.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </span>
          <span className="h-px w-20 bg-ivory/70 sm:w-24" />
        </div>
      </ScrollReveal>
    </Scene>
  );
}
