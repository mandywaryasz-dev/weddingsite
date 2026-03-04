import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { DividerRule } from "@/components/motion/DividerRule";
import { SoftMaskReveal } from "@/components/motion/SoftMaskReveal";
import { ScaleSettle } from "@/components/motion/ScaleSettle";

export function PartyScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentInnerClassName="mx-auto max-w-[31rem]"
    >
      <div className="text-center">
        <DividerRule
          direction="vertical"
          origin="top"
          delay={0}
          className="mx-auto mb-divider h-14 w-px bg-silver/70"
        />

        <SoftMaskReveal delay={0.18}>
          <h2 className="font-body text-headline text-silver/90">
            {scene.content.title}
            {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
            <span className="block">{scene.content.body}</span>
          </h2>
        </SoftMaskReveal>

        <ScaleSettle delay={0.40} className="mx-auto mt-divider w-20">
          <Image src="/images/party-flower.svg" alt="" width={200} height={200} unoptimized className="h-auto w-full opacity-90" />
        </ScaleSettle>
      </div>
    </Scene>
  );
}
