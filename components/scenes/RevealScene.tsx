import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { AddToCalendarButton } from "@/components/ui/AddToCalendarButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function RevealScene({ scene }: SceneComponentProps) {
  return (
    <Scene id={scene.id} background={scene.background} overlayIntensity={scene.overlay?.intensity} contentInnerClassName="mx-auto max-w-measure-lg">
      <ScrollReveal className="text-center">
        <div className="mb-divider flex items-center justify-center gap-5" aria-hidden>
          <span className="h-px w-20 bg-silver/70 sm:w-24" />
          <span className="w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </span>
          <span className="h-px w-20 bg-silver/70 sm:w-24" />
        </div>
        <h2 className="font-heading text-display tracking-display text-silver/90">{scene.content.title}</h2>
        {scene.content.subtitle ? <p className="mt-4 font-body text-body text-silver/90">{scene.content.subtitle}</p> : null}
        {scene.content.accent ? (
          <p className="mt-2 font-body text-body text-silver/90">{scene.content.accent}</p>
        ) : null}
        <p className="mt-3 text-body text-silver/90">{scene.content.body}</p>
        <AddToCalendarButton label={scene.content.ctaLabel} className="mt-8" />
        <div className="mt-divider flex items-center justify-center gap-5" aria-hidden>
          <span className="h-px w-20 bg-silver/70 sm:w-24" />
          <span className="w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </span>
          <span className="h-px w-20 bg-silver/70 sm:w-24" />
        </div>
      </ScrollReveal>
    </Scene>
  );
}
