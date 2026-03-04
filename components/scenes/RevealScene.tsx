import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { AddToCalendarButton } from "@/components/ui/AddToCalendarButton";
import { DividerRule } from "@/components/motion/DividerRule";
import { SoftMaskReveal } from "@/components/motion/SoftMaskReveal";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { ScaleSettle } from "@/components/motion/ScaleSettle";

export function RevealScene({ scene }: SceneComponentProps) {
  return (
    <Scene id={scene.id} background={scene.background} overlayIntensity={scene.overlay?.intensity} contentInnerClassName="mx-auto max-w-measure-lg">
      <div className="text-center">
        {/* Top ornamental divider */}
        <div className="mb-divider flex items-center justify-center gap-5" aria-hidden>
          <DividerRule direction="horizontal" origin="right" delay={0} className="h-px w-20 bg-silver/70 sm:w-24" />
          <ScaleSettle delay={0.1} className="w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </ScaleSettle>
          <DividerRule direction="horizontal" origin="left" delay={0} className="h-px w-20 bg-silver/70 sm:w-24" />
        </div>

        <SoftMaskReveal delay={0.22}>
          <h2 className="font-heading text-display tracking-display text-silver/90">{scene.content.title}</h2>
        </SoftMaskReveal>

        {scene.content.subtitle ? (
          <RevealBlock delay={0.36}>
            <p className="mt-4 font-body text-body text-silver/90">{scene.content.subtitle}</p>
          </RevealBlock>
        ) : null}

        {scene.content.accent ? (
          <RevealBlock delay={0.44}>
            <p className="mt-2 font-body text-body text-silver/90">{scene.content.accent}</p>
          </RevealBlock>
        ) : null}

        <RevealBlock delay={0.50}>
          <p className="mt-3 text-body text-silver/90">{scene.content.body}</p>
        </RevealBlock>

        <RevealBlock delay={0.60} variant="fade-up">
          <AddToCalendarButton label={scene.content.ctaLabel} className="mt-8" />
        </RevealBlock>

        {/* Bottom ornamental divider */}
        <div className="mt-divider flex items-center justify-center gap-5" aria-hidden>
          <DividerRule direction="horizontal" origin="right" delay={0.70} className="h-px w-20 bg-silver/70 sm:w-24" />
          <ScaleSettle delay={0.75} className="w-8 opacity-95">
            <Image src="/images/lotus.svg" alt="" width={90} height={90} unoptimized className="h-auto w-full" />
          </ScaleSettle>
          <DividerRule direction="horizontal" origin="left" delay={0.70} className="h-px w-20 bg-silver/70 sm:w-24" />
        </div>
      </div>
    </Scene>
  );
}
