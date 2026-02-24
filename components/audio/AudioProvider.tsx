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
  AUDIO_MUTED_KEY,
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
  const frameRef = useRef<number | null>(null);
  const [isMuted, setIsMutedState] = useState(true);
  const [volume, setVolume] = useState(DEFAULT_AMBIENT_VOLUME);
  const [isReady, setIsReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio(ambientSrc);
    audio.loop = true;
    audio.preload = "metadata";
    audio.muted = true;
    audio.volume = DEFAULT_AMBIENT_VOLUME;
    audioRef.current = audio;

    const stored = window.sessionStorage.getItem(AUDIO_MUTED_KEY);
    if (stored === "false") {
      setIsMutedState(false);
      audio.muted = false;
    }

    const markReady = () => setIsReady(true);
    audio.addEventListener("canplay", markReady);

    return () => {
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
        setVolume(audio.volume);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          audio.volume = to;
          setVolume(to);
          frameRef.current = null;
          resolve();
        }
      };

      if (frameCount === 1) {
        audio.volume = to;
        setVolume(to);
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
      window.sessionStorage.setItem(AUDIO_MUTED_KEY, String(nextMuted));
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
    const onInteraction = () => {
      setHasUserInteracted(true);
      void play();
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };

    window.addEventListener("pointerdown", onInteraction);
    window.addEventListener("keydown", onInteraction);

    return () => {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };
  }, [play]);

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
