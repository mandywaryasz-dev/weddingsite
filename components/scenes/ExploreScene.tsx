import { Scene } from "@/components/scenes/Scene";
import { VerticalDivider } from "@/components/scenes/SceneOrnaments";
import { SceneComponentProps } from "@/components/scenes/sceneComponentTypes";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion/tokens";

export function ExploreScene({ scene, actions }: SceneComponentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Scene
      id={scene.id}
      className={scene.className}
      background={scene.background}
      overlayIntensity={scene.overlay?.intensity}
      contentAlign="center"
    >
      <ScrollRevealGroup className="mx-auto grid max-w-[24rem] grid-cols-[22px_1fr] items-center gap-4 sm:max-w-[28rem]">
        <ScrollRevealItem className="self-stretch">
          <VerticalDivider className="h-full min-h-44 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        </ScrollRevealItem>
        <div className="space-y-4">
          <ScrollRevealItem>
            <h2 className="font-heading text-[2rem] uppercase tracking-[0.08em] text-ivory sm:text-5xl">{scene.content.title}</h2>
          </ScrollRevealItem>
          <div className="flex flex-col gap-2">
            {scene.content.buttons?.map((button) => (
              <ScrollRevealItem key={button.modalId}>
                <motion.button
                  type="button"
                  onClick={() => actions.openModal(button.modalId)}
                  className="glass-pill button-breathe w-fit min-w-40 px-5 py-2.5 text-sm font-heading tracking-[0.08em] text-ivory"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: motionTokens.button.breatheScale
                        }
                  }
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {button.label}
                </motion.button>
              </ScrollRevealItem>
            ))}
          </div>
        </div>
      </ScrollRevealGroup>
    </Scene>
  );
}
