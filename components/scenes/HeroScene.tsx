import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";

export function HeroScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentInnerClassName="mx-auto max-w-measure"
      disableParallaxOrnaments
    >
      <ScrollReveal className="text-center">
        <h1 className="font-body text-headline text-silver">
          {scene.content.title}
          {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
          <span className="block">{scene.content.body}</span>
        </h1>
        <p className="mt-7 font-heading text-label uppercase tracking-label text-silver/95">{scene.content.accent}</p>
        {scene.content.secondaryBody ? (
          <p className="mt-1.5 font-heading text-label uppercase tracking-label text-silver/95">
            {scene.content.secondaryBody}
          </p>
        ) : null}
        <div className="mx-auto mt-divider h-16 w-px bg-silver/75" aria-hidden />
        <div className="mx-auto mt-divider w-14 opacity-95 sm:w-16">
          <Image src="/images/lotus.svg" alt="" width={120} height={120} unoptimized className="h-auto w-full" />
        </div>
      </ScrollReveal>
    </Scene>
  );
}
