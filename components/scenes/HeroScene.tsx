import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { FocusPull } from "@/components/motion/FocusPull";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { DividerRule } from "@/components/motion/DividerRule";
import { ScaleSettle } from "@/components/motion/ScaleSettle";

export function HeroScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentInnerClassName="mx-auto max-w-measure"
      disableParallaxOrnaments
    >
      <div className="text-center">
        <FocusPull>
          <h1 className="font-body text-headline text-silver">
            {scene.content.title}
            {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
            <span className="block">{scene.content.body}</span>
          </h1>
        </FocusPull>

        <RevealBlock delay={0.18}>
          <p className="mt-7 font-heading text-label uppercase tracking-label text-silver/95">
            {scene.content.accent}
          </p>
        </RevealBlock>

        {scene.content.secondaryBody ? (
          <RevealBlock delay={0.24}>
            <p className="mt-1.5 font-heading text-label uppercase tracking-label text-silver/95">
              {scene.content.secondaryBody}
            </p>
          </RevealBlock>
        ) : null}

        <DividerRule
          direction="vertical"
          origin="center"
          delay={0.36}
          className="mx-auto mt-divider h-16 w-px bg-silver/75"
        />

        <ScaleSettle delay={0.48} className="mx-auto mt-divider w-14 opacity-95 sm:w-16">
          <Image src="/images/lotus.svg" alt="" width={120} height={120} unoptimized className="h-auto w-full" />
        </ScaleSettle>
      </div>
    </Scene>
  );
}
