import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CulturalScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentInnerClassName="mx-auto max-w-[34rem]"
      ornament={
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen" aria-hidden>
          <Image src="/images/bg-texture.png" alt="" fill sizes="100vw" quality={75} className="object-cover" />
        </div>
      }
    >
      <div className="relative px-6">
        <div className="absolute left-0 top-0 h-full w-px bg-silver/40" aria-hidden />
        <div className="absolute right-0 top-0 h-full w-px bg-silver/40" aria-hidden />
        <ScrollReveal className="text-center">
          <div className="mx-auto mb-6 w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </div>
          <h2 className="font-heading text-[1.9rem] leading-[1.45] text-silver sm:text-[2.4rem]">
            {scene.content.title}
            {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
            <span className="block">{scene.content.body}</span>
          </h2>
          <div className="mx-auto mb-6 h-14 w-px bg-silver/75" aria-hidden />
          <p className="text-xl leading-relaxed text-silver/95 sm:text-[1.6rem]">{scene.content.accent}</p>
          {scene.content.secondaryBody ? <p className="mt-1 text-xl leading-relaxed text-silver/95 sm:text-[1.6rem]">{scene.content.secondaryBody}</p> : null}
          {scene.content.hindiLine ? <p className="mt-4 font-devanagari text-lg text-silver/90 sm:text-xl">{scene.content.hindiLine}</p> : null}
          <div className="mx-auto mt-8 w-14 opacity-80" aria-hidden>
            <Image src="/images/culture-flower.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </div>
        </ScrollReveal>
      </div>
    </Scene>
  );
}
