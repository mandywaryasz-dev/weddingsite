import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { DividerRule } from "@/components/motion/DividerRule";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { SoftMaskReveal } from "@/components/motion/SoftMaskReveal";
import { ScaleSettle } from "@/components/motion/ScaleSettle";

export function CulturalScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentInnerClassName="mx-auto max-w-measure"
      ornament={
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen" aria-hidden>
          <Image src="/images/bg-texture.png" alt="" fill sizes="100vw" quality={75} unoptimized className="object-cover" />
        </div>
      }
    >
      <div className="relative px-6">
        {/* Frame lines */}
        <DividerRule direction="vertical" origin="top" delay={0} className="absolute left-0 top-0 h-full w-px bg-silver/40" />
        <DividerRule direction="vertical" origin="top" delay={0.06} className="absolute right-0 top-0 h-full w-px bg-silver/40" />

        <div className="text-center">
          <RevealBlock delay={0.1} className="mx-auto mb-stack-sm w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </RevealBlock>

          <SoftMaskReveal delay={0.2}>
            <h2 className="font-heading text-headline tracking-heading text-silver/90">
              {scene.content.title}
              {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
              <span className="block">{scene.content.body}</span>
            </h2>
          </SoftMaskReveal>

          <DividerRule
            direction="vertical"
            origin="center"
            delay={0.34}
            className="mx-auto mb-stack-sm h-14 w-px bg-silver/75"
          />

          <RevealBlock delay={0.40}>
            <p className="text-body text-silver/90">{scene.content.accent}</p>
          </RevealBlock>

          {scene.content.secondaryBody ? (
            <RevealBlock delay={0.48}>
              <p className="mt-1 text-body text-silver/90">{scene.content.secondaryBody}</p>
            </RevealBlock>
          ) : null}

          {scene.content.hindiLine ? (
            <RevealBlock delay={0.54}>
              <p className="mt-4 font-devanagari text-body-sm text-silver/90">{scene.content.hindiLine}</p>
            </RevealBlock>
          ) : null}

          <ScaleSettle delay={0.60} className="mx-auto mt-divider w-14 opacity-80">
            <Image src="/images/culture-flower.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </ScaleSettle>
        </div>
      </div>
    </Scene>
  );
}
