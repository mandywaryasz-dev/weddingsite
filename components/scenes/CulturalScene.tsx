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
        <>
          <div className="absolute left-0 top-14 h-56 w-48 opacity-35 sm:h-72 sm:w-64">
            <Image src="/images/culture-flower.svg" alt="" fill unoptimized className="object-contain object-left-top" />
          </div>
          <div className="absolute -right-10 bottom-8 h-64 w-56 scale-x-[-1] opacity-30 sm:h-80 sm:w-72">
            <Image src="/images/culture-flower.svg" alt="" fill unoptimized className="object-contain object-right-bottom" />
          </div>
          <div className="absolute inset-0 bg-[url('/images/bg-texture.png')] bg-cover bg-center opacity-[0.08] mix-blend-screen" />
        </>
      }
    >
      <ScrollReveal className="text-center">
        <div className="mx-auto mb-6 w-8 opacity-95">
          <Image src="/images/monogram.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
        </div>
        <div className="mx-auto mb-6 h-14 w-px bg-ivory/75" aria-hidden />
        <h2 className="font-body text-[1.9rem] leading-[1.45] text-ivory sm:text-[2.4rem]">
          {scene.content.title}
          {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
          <span className="block">{scene.content.body}</span>
        </h2>
        <p className="mt-7 text-xl leading-relaxed text-ivory/95 sm:text-[1.6rem]">{scene.content.accent}</p>
        {scene.content.secondaryBody ? <p className="mt-1 text-xl leading-relaxed text-ivory/95 sm:text-[1.6rem]">{scene.content.secondaryBody}</p> : null}
        {scene.content.hindiLine ? <p className="mt-4 font-devanagari text-lg text-ivory/90 sm:text-xl">{scene.content.hindiLine}</p> : null}
        <div className="mx-auto mt-8 h-14 w-px bg-ivory/70" aria-hidden />
      </ScrollReveal>
    </Scene>
  );
}
