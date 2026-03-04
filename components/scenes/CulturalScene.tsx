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
      contentInnerClassName="mx-auto max-w-measure"
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
          <div className="mx-auto mb-stack-sm w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </div>
          <h2 className="font-heading text-headline tracking-heading text-silver/90">
            {scene.content.title}
            {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
            <span className="block">{scene.content.body}</span>
          </h2>
          <div className="mx-auto mb-stack-sm h-14 w-px bg-silver/75" aria-hidden />
          <p className="text-body text-silver/90">{scene.content.accent}</p>
          {scene.content.secondaryBody ? <p className="mt-1 text-body text-silver/90">{scene.content.secondaryBody}</p> : null}
          {scene.content.hindiLine ? <p className="mt-4 font-devanagari text-body-sm text-silver/90">{scene.content.hindiLine}</p> : null}
          <div className="mx-auto mt-divider w-14 opacity-80" aria-hidden>
            <Image src="/images/culture-flower.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </div>
        </ScrollReveal>
      </div>
    </Scene>
  );
}
