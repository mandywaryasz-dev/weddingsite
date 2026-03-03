import Image from "next/image";
import { Scene } from "@/components/scenes/Scene";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PartyScene({ scene }: SceneComponentProps) {
  return (
    <Scene
      id={scene.id}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentInnerClassName="mx-auto max-w-[31rem]"
      ornament={
        <>
          <div className="absolute -left-14 bottom-0 h-72 w-56 opacity-70 sm:h-[24rem] sm:w-72">
            <Image src="/images/party-flower-bg1.svg" alt="" fill unoptimized className="object-contain object-bottom-left" />
          </div>
          <div className="absolute -right-8 bottom-0 h-56 w-56 opacity-75 sm:h-72 sm:w-72">
            <Image src="/images/party-flower.svg" alt="" fill unoptimized className="object-contain object-bottom-right" />
          </div>
        </>
      }
    >
      <ScrollReveal className="text-center">
        <div className="mx-auto mb-8 h-14 w-px bg-silver/70" aria-hidden />
        <h2 className="font-body text-[2rem] leading-[1.5] text-silver sm:text-[2.7rem]">
          {scene.content.title}
          {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
          <span className="block">{scene.content.body}</span>
        </h2>
        <div className="mx-auto mt-8 w-14 sm:w-16" aria-hidden>
          <Image src="/images/lotus.svg" alt="" width={120} height={120} unoptimized className="h-auto w-full opacity-90" />
        </div>
      </ScrollReveal>
    </Scene>
  );
}
