import { ReactNode } from "react";
import { BackgroundMedia } from "@/lib/scenes/types";
import { AtmosphereLayer } from "@/components/scenes/layers/AtmosphereLayer";
import { BackgroundLayer } from "@/components/scenes/layers/BackgroundLayer";
import { ContentLayer } from "@/components/scenes/layers/ContentLayer";
import { OrnamentLayer } from "@/components/scenes/layers/OrnamentLayer";

type SceneProps = {
  id: string;
  className?: string;
  background: BackgroundMedia;
  overlayIntensity?: "light" | "medium" | "heavy";
  animatedGradient?: boolean;
  contentAlign?: "start" | "center" | "end";
  contentClassName?: string;
  contentInnerClassName?: string;
  disableParallaxOrnaments?: boolean;
  ornament?: ReactNode;
  children: ReactNode;
};

export function Scene({
  id,
  className,
  background,
  overlayIntensity = "medium",
  animatedGradient = true,
  contentAlign = "center",
  contentClassName,
  contentInnerClassName,
  disableParallaxOrnaments = false,
  ornament,
  children
}: SceneProps) {
  return (
    <section id={id} className={`relative min-h-screen w-full overflow-hidden ${className ?? ""}`}>
      <BackgroundLayer background={background} overlayIntensity={overlayIntensity} />
      <AtmosphereLayer animatedGradient={animatedGradient} />
      <OrnamentLayer parallax={!disableParallaxOrnaments}>{ornament}</OrnamentLayer>
      <ContentLayer align={contentAlign} className={contentClassName} innerClassName={contentInnerClassName}>
        {children}
      </ContentLayer>
    </section>
  );
}
