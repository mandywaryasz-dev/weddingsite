"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { BackgroundMedia } from "@/lib/scenes/types";

type BackgroundLayerProps = {
  background: BackgroundMedia;
  overlayIntensity?: "light" | "medium" | "heavy";
};

const overlayMap = {
  light:  "bg-gradient-to-t from-black/40 via-black/10 to-transparent",
  medium: "bg-gradient-to-t from-black/55 via-black/15 to-transparent",
  heavy:  "bg-gradient-to-t from-black/70 via-black/30 to-black/10",
};

function inferVideoType(src: string) {
  const normalizedSrc = src.split("?")[0]?.toLowerCase() ?? "";
  if (normalizedSrc.endsWith(".webm")) return "video/webm";
  if (normalizedSrc.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

type VideoSource = {
  src: string;
  type: string;
  media?: string;
};

const isDev = process.env.NODE_ENV === "development";

function devLog(message: string, details?: unknown) {
  if (!isDev) return;
  if (details !== undefined) {
    console.info(`[BackgroundLayer] ${message}`, details);
    return;
  }
  console.info(`[BackgroundLayer] ${message}`);
}

function isSourcePlayable(probe: HTMLVideoElement, sourceType: string) {
  if (typeof probe.canPlayType !== "function") return true;
  if (!sourceType) return true;
  const support = probe.canPlayType(sourceType);
  return support === "probably" || support === "maybe";
}

export function BackgroundLayer({ background, overlayIntensity = "medium" }: BackgroundLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttemptedRef = useRef(false);
  const isVideoBackground = background.type === "video";
  const videoSources = useMemo<VideoSource[]>(
    () => {
      if (!isVideoBackground) {
        return [];
      }

      const hasMobileVariant = Boolean(
        background.mobileSrc || background.mobileFallbackSrc
      );
      const defaultMedia = hasMobileVariant ? "(min-width: 769px)" : undefined;
      const sources: VideoSource[] = [];

      if (background.mobileSrc) {
        sources.push({
          src: background.mobileSrc,
          type: background.mobileSourceType ?? inferVideoType(background.mobileSrc),
          media: "(max-width: 768px)"
        });
      }

      if (background.mobileFallbackSrc) {
        sources.push({
          src: background.mobileFallbackSrc,
          type:
            background.mobileFallbackSourceType ??
            inferVideoType(background.mobileFallbackSrc),
          media: "(max-width: 768px)"
        });
      }

      sources.push({
        src: background.desktopSrc ?? background.src,
        type: background.sourceType ?? inferVideoType(background.desktopSrc ?? background.src),
        media: defaultMedia
      });

      if (background.fallbackSrc) {
        sources.push({
          src: background.fallbackSrc,
          type:
            background.fallbackSourceType ??
            inferVideoType(background.fallbackSrc),
          media: defaultMedia
        });
      }

      return sources;
    },
    [
      isVideoBackground,
      background.desktopSrc,
      background.fallbackSrc,
      background.fallbackSourceType,
      background.mobileFallbackSourceType,
      background.mobileFallbackSrc,
      background.mobileSourceType,
      background.mobileSrc,
      background.sourceType,
      background.src
    ]
  );
  const [showPosterFallback, setShowPosterFallback] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [playableSources, setPlayableSources] = useState<VideoSource[]>(videoSources);

  useEffect(() => {
    if (!isVideoBackground) return;

    setShowPosterFallback(false);
    setHasLoadedData(false);
    setPlayableSources(videoSources);
    playAttemptedRef.current = false;

    const probe = document.createElement("video");
    const supportedSources = videoSources.filter((source) => isSourcePlayable(probe, source.type));

    if (supportedSources.length === 0) {
      setShowPosterFallback(true);
      devLog("No playable video source detected; falling back to poster.", videoSources);
      return;
    }

    setPlayableSources(supportedSources);
    devLog("Selected playable sources.", supportedSources);
  }, [isVideoBackground, videoSources]);

  const attemptAutoplay = useCallback(
    (trigger: "canplay" | "loadeddata") => {
      if (!isVideoBackground || showPosterFallback || playAttemptedRef.current) return;
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playAttemptedRef.current = true;
      devLog(`Autoplay attempted via ${trigger}.`, {
        currentSrc: videoElement.currentSrc || playableSources[0]?.src || null
      });

      const playResult = videoElement.play();
      if (!playResult || typeof playResult.then !== "function") {
        return;
      }

      playResult
        .then(() => {
          devLog("play() succeeded.");
        })
        .catch((error: unknown) => {
          playAttemptedRef.current = false;
          setShowPosterFallback(true);
          devLog("play() failed; falling back to poster.", error);
        });
    },
    [isVideoBackground, playableSources, showPosterFallback]
  );

  const handleReady = useCallback(
    (trigger: "canplay" | "loadeddata") => {
      setHasLoadedData(true);
      attemptAutoplay(trigger);
    },
    [attemptAutoplay]
  );

  const handleVideoError = useCallback(() => {
    const mediaError = videoRef.current?.error;
    setShowPosterFallback(true);
    devLog("Video error event; falling back to poster.", {
      code: mediaError?.code ?? null
    });
  }, []);

  const shouldRenderPosterFallback = isVideoBackground && showPosterFallback && Boolean(background.poster);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {isVideoBackground ? (
        shouldRenderPosterFallback ? (
          <Image
            src={background.poster!}
            alt=""
            fill
            data-testid="background-poster-fallback"
            priority={Boolean(background.priority)}
            loading={background.priority ? "eager" : "lazy"}
            sizes="100vw"
            quality={85}
            className="object-cover"
            aria-hidden
          />
        ) : (
          <video
            ref={videoRef}
            data-testid="background-video"
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              hasLoadedData ? "opacity-100" : "opacity-95"
            }`}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="metadata"
            poster={background.poster}
            aria-hidden
            onCanPlay={() => handleReady("canplay")}
            onLoadedData={() => handleReady("loadeddata")}
            onError={handleVideoError}
          >
            {playableSources.map((source) => (
              <source
                key={`${source.src}-${source.type}-${source.media ?? "default"}`}
                src={source.src}
                type={source.type}
                media={source.media}
              />
            ))}
          </video>
        )
      ) : (
        <Image
          src={background.src}
          alt=""
          fill
          priority={Boolean(background.priority)}
          loading={background.priority ? "eager" : "lazy"}
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      )}
      <div className={`absolute inset-0 ${overlayMap[overlayIntensity]}`} aria-hidden />
    </div>
  );
}
