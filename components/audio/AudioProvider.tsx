"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren
} from "react";
import {
  DEFAULT_AMBIENT_VOLUME,
  DUCKED_AMBIENT_VOLUME,
  MIN_FADE_MS
} from "@/lib/audio/constants";
import { buildFadeFrames, clampVolume } from "@/lib/audio/controller";
import { AudioContextValue } from "@/lib/audio/types";

const AudioContext = createContext<AudioContextValue | null>(null);

type AudioProviderProps = PropsWithChildren<{
  ambientSrc?: string;
}>;

export function AudioProvider({ children, ambientSrc = "/audio/ambient-loop.mp3" }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const [isMuted, setIsMutedState] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_AMBIENT_VOLUME);
  const [isReady, setIsReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    const audio = new Audio(ambientSrc);
    audio.loop = true;
    audio.preload = "metadata";
    audio.muted = false;
    audio.volume = DEFAULT_AMBIENT_VOLUME;
    audioRef.current = audio;

    const markReady = () => setIsReady(true);
    audio.addEventListener("canplay", markReady);

    return () => {
      mountedRef.current = false;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      audio.removeEventListener("canplay", markReady);
      audio.pause();
      audioRef.current = null;
    };
  }, [ambientSrc]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch {
      // Ignore autoplay policy rejections; play is retried on user interaction.
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const fadeTo = useCallback(async (targetVolume: number, durationMs: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const from = clampVolume(audio.volume);
    const to = clampVolume(targetVolume);
    const safeDuration = Math.max(durationMs, MIN_FADE_MS);

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    await new Promise<void>((resolve) => {
      const start = performance.now();
      const { frameCount } = buildFadeFrames(from, to, safeDuration);

      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / safeDuration);
        const nextVolume = from + (to - from) * progress;
        audio.volume = clampVolume(nextVolume);
        if (mountedRef.current) {
          setVolume(audio.volume);
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          audio.volume = to;
          if (mountedRef.current) {
            setVolume(to);
          }
          frameRef.current = null;
          resolve();
        }
      };

      if (frameCount === 1) {
        audio.volume = to;
        if (mountedRef.current) {
          setVolume(to);
        }
        resolve();
        return;
      }
      frameRef.current = requestAnimationFrame(step);
    });
  }, []);

  const setMuted = useCallback(
    (nextMuted: boolean) => {
      const audio = audioRef.current;
      setIsMutedState(nextMuted);
      if (!audio) return;
      audio.muted = nextMuted;
      if (!nextMuted) {
        void play();
        void fadeTo(DEFAULT_AMBIENT_VOLUME, MIN_FADE_MS);
      }
    },
    [fadeTo, play]
  );

  const duckAmbient = useCallback(
    async (lowVolume = DUCKED_AMBIENT_VOLUME) => {
      await fadeTo(lowVolume, MIN_FADE_MS);
    },
    [fadeTo]
  );

  const restoreAmbient = useCallback(
    async (normalVolume = DEFAULT_AMBIENT_VOLUME) => {
      await fadeTo(normalVolume, MIN_FADE_MS);
    },
    [fadeTo]
  );

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    function detachInteractionListeners() {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("wheel", onInteraction);
    }

    function onInteraction() {
      setHasUserInteracted(true);
      if (!isMutedRef.current) {
        void play();
      }
      detachInteractionListeners();
    }

    window.addEventListener("pointerdown", onInteraction);
    window.addEventListener("keydown", onInteraction);
    window.addEventListener("wheel", onInteraction, { passive: true });

    return () => {
      detachInteractionListeners();
    };
  }, [play]);

  useEffect(() => {
    if (!hasUserInteracted || isMuted || !isReady) return;
    void play();
  }, [hasUserInteracted, isMuted, isReady, play]);

  const value = useMemo<AudioContextValue>(
    () => ({
      isMuted,
      volume,
      isReady,
      hasUserInteracted,
      play,
      pause,
      setMuted,
      fadeTo,
      duckAmbient,
      restoreAmbient
    }),
    [duckAmbient, fadeTo, hasUserInteracted, isMuted, isReady, pause, play, restoreAmbient, setMuted, volume]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
