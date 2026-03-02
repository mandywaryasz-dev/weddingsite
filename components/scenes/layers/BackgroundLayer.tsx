import Image from "next/image";
import { BackgroundMedia } from "@/lib/scenes/types";

type BackgroundLayerProps = {
  background: BackgroundMedia;
  overlayIntensity?: "light" | "medium" | "heavy";
};

const overlayMap = {
  light: "bg-black/20",
  medium: "bg-black/35",
  heavy: "bg-black/50"
};

function inferVideoType(src: string) {
  return src.endsWith(".mov") ? "video/quicktime" : "video/mp4";
}

export function BackgroundLayer({ background, overlayIntensity = "medium" }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {background.type === "video" ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload={background.priority ? "auto" : "metadata"}
          poster={background.poster}
          aria-hidden
        >
          <source src={background.src} type={background.sourceType ?? inferVideoType(background.src)} />
          {background.fallbackSrc ? (
            <source
              src={background.fallbackSrc}
              type={background.fallbackSourceType ?? inferVideoType(background.fallbackSrc)}
            />
          ) : null}
        </video>
      ) : (
        <Image
          src={background.src}
          alt=""
          fill
          priority={Boolean(background.priority)}
          loading={background.priority ? "eager" : "lazy"}
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className={`absolute inset-0 ${overlayMap[overlayIntensity]}`} aria-hidden />
    </div>
  );
}
