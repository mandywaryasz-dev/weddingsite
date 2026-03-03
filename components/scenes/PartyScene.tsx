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
    >
      <ScrollReveal className="text-center">
        <div className="mx-auto mb-8 h-14 w-px bg-silver/70" aria-hidden />
        <h2 className="font-body text-[1.8rem] leading-[1.5] text-silver sm:text-[2.7rem]">
          {scene.content.title}
          {scene.content.subtitle ? <span className="block">{scene.content.subtitle}</span> : null}
          <span className="block">{scene.content.body}</span>
        </h2>
        <div className="mx-auto mt-8 w-20" aria-hidden>
          <Image src="/images/party-flower.svg" alt="" width={200} height={200} unoptimized className="h-auto w-full opacity-90" />
        </div>
      </ScrollReveal>
    </Scene>
  );
}
