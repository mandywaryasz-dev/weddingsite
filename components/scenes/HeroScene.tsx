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
      contentInnerClassName="mx-auto max-w-[34rem]"
      disableParallaxOrnaments
    >
      <ScrollReveal className="text-center">
        <h1 className="font-body text-[2.05rem] leading-[1.3] text-silver sm:text-[2.6rem]">
          {scene.content.title}
          {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
          <span className="block">{scene.content.body}</span>
        </h1>
        <p className="mt-7 font-heading text-[0.64rem] uppercase tracking-[0.22em] text-silver/95 sm:text-xs">{scene.content.accent}</p>
        {scene.content.secondaryBody ? (
          <p className="mt-1.5 font-heading text-[0.64rem] uppercase tracking-[0.22em] text-silver/95 sm:text-xs">
            {scene.content.secondaryBody}
          </p>
        ) : null}
        <div className="mx-auto mt-10 h-16 w-px bg-silver/75" aria-hidden />
        <div className="mx-auto mt-10 w-14 opacity-95 sm:w-16">
          <Image src="/images/lotus.svg" alt="" width={120} height={120} unoptimized className="h-auto w-full" />
        </div>
      </ScrollReveal>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/bg-texture.png')] bg-cover bg-center opacity-[0.06] mix-blend-screen" aria-hidden />
    </Scene>
  );
}
