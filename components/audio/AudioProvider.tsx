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
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const graphStatusRef = useRef<"unknown" | "enabled" | "failed">("unknown");
  const isMutedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const startRequestedRef = useRef(false);
  const startAttemptRef = useRef<Promise<boolean> | null>(null);
  const retryPlaybackRef = useRef<() => void>(() => undefined);
  const fallbackDuckActiveRef = useRef(false);
  const fallbackShouldResumeRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const [isMuted, setIsMutedState] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_AMBIENT_VOLUME);
  const [isReady, setIsReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [awaitingInitialPlayback, setAwaitingInitialPlayback] = useState(true);

  useEffect(() => {
    mountedRef.current = true;
    startAttemptRef.current = null;
    isPlayingRef.current = false;
    setIsReady(false);
    setAwaitingInitialPlayback(true);
    const audio = new Audio(ambientSrc);
    audio.loop = true;
    audio.preload = "metadata";
    audio.muted = false;
    audio.volume = DEFAULT_AMBIENT_VOLUME;
    audioRef.current = audio;

    const markReady = () => {
      setIsReady(true);
      queueMicrotask(() => {
        retryPlaybackRef.current();
      });
    };
    audio.addEventListener("canplay", markReady);

    return () => {
      mountedRef.current = false;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      gainNodeRef.current?.disconnect();
      mediaSourceRef.current?.disconnect();
      void audioContextRef.current?.close().catch(() => undefined);
      gainNodeRef.current = null;
      mediaSourceRef.current = null;
      audioContextRef.current = null;
      graphStatusRef.current = "unknown";
      isPlayingRef.current = false;
      startRequestedRef.current = false;
      startAttemptRef.current = null;
      fallbackDuckActiveRef.current = false;
      fallbackShouldResumeRef.current = false;
      audio.removeEventListener("canplay", markReady);
      audio.pause();
      audioRef.current = null;
    };
  }, [ambientSrc]);

  const ensureAudioGraph = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    if (graphStatusRef.current === "enabled" && gainNodeRef.current && audioContextRef.current) {
      if (audioContextRef.current.state === "suspended") {
        try {
          await audioContextRef.current.resume();
        } catch {
          graphStatusRef.current = "failed";
          return false;
        }
      }
      return true;
    }
    if (graphStatusRef.current === "failed") {
      return false;
    }

    const AudioContextCtor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      graphStatusRef.current = "failed";
      return false;
    }

    try {
      const context = audioContextRef.current ?? new AudioContextCtor();
      const source = mediaSourceRef.current ?? context.createMediaElementSource(audio);
      const gain = gainNodeRef.current ?? context.createGain();

      if (!mediaSourceRef.current) {
        source.connect(gain);
      }
      if (!gainNodeRef.current) {
        gain.connect(context.destination);
      }

      gain.gain.value = clampVolume(volume);
      audio.volume = 1;

      audioContextRef.current = context;
      mediaSourceRef.current = source;
      gainNodeRef.current = gain;

      if (context.state === "suspended") {
        await context.resume();
      }

      graphStatusRef.current = "enabled";
      return true;
    } catch {
      graphStatusRef.current = "failed";
      gainNodeRef.current = null;
      mediaSourceRef.current = null;
      audioContextRef.current = null;
      return false;
    }
  }, [volume]);

  const markPlaybackStarted = useCallback(() => {
    isPlayingRef.current = true;
    if (mountedRef.current) {
      setAwaitingInitialPlayback(false);
    }
  }, []);

  const tryStartPlayback = useCallback(
    async ({ fromGesture = false }: { fromGesture?: boolean } = {}) => {
      const audio = audioRef.current;
      if (!audio || isMutedRef.current) return false;
      if (isPlayingRef.current) {
        markPlaybackStarted();
        return true;
      }
      if (startAttemptRef.current) {
        const pendingAttempt = startAttemptRef.current;
        const didStart = await pendingAttempt;
        if (startAttemptRef.current === pendingAttempt) {
          startAttemptRef.current = null;
        }
        if (!didStart && !fromGesture && startRequestedRef.current && !isMutedRef.current && !isPlayingRef.current) {
          return tryStartPlayback();
        }
        return didStart;
      }

      const attemptPromise = (async () => {
        if (fromGesture) {
          const graphPromise = ensureAudioGraph();
          try {
            await audio.play();
            markPlaybackStarted();
            return true;
          } catch {
            return false;
          } finally {
            void graphPromise;
          }
        }

        await ensureAudioGraph();
        try {
          await audio.play();
          markPlaybackStarted();
          return true;
        } catch {
          return false;
        }
      })();

      startAttemptRef.current = attemptPromise;
      void attemptPromise.finally(() => {
        if (startAttemptRef.current === attemptPromise) {
          startAttemptRef.current = null;
        }
      });

      return attemptPromise;
    },
    [ensureAudioGraph, markPlaybackStarted]
  );

  const play = useCallback(async () => {
    await tryStartPlayback();
  }, [tryStartPlayback]);

  retryPlaybackRef.current = () => {
    if (!startRequestedRef.current || isMutedRef.current || isPlayingRef.current) {
      return;
    }
    void tryStartPlayback();
  };

  const registerUserGesture = useCallback(() => {
    startRequestedRef.current = true;
    setHasUserInteracted(true);
    if (!isMutedRef.current) {
      void tryStartPlayback({ fromGesture: true });
    }
  }, [tryStartPlayback]);

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    audioRef.current?.pause();
  }, []);

  const fadeTo = useCallback(async (targetVolume: number, durationMs: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const hasGraph = (await ensureAudioGraph()) && gainNodeRef.current;
    const controlledGain = hasGraph ? gainNodeRef.current : null;
    const from = clampVolume(controlledGain ? controlledGain.gain.value : audio.volume);
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
        const nextClampedVolume = clampVolume(nextVolume);
        if (controlledGain) {
          controlledGain.gain.value = nextClampedVolume;
          audio.volume = 1;
        } else {
          audio.volume = nextClampedVolume;
        }
        if (mountedRef.current) {
          setVolume(nextClampedVolume);
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          if (controlledGain) {
            controlledGain.gain.value = to;
            audio.volume = 1;
          } else {
            audio.volume = to;
          }
          if (mountedRef.current) {
            setVolume(to);
          }
          frameRef.current = null;
          resolve();
        }
      };

      if (frameCount === 1) {
        if (controlledGain) {
          controlledGain.gain.value = to;
          audio.volume = 1;
        } else {
          audio.volume = to;
        }
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
      if (nextMuted) {
        fallbackShouldResumeRef.current = false;
        return;
      }
      if (fallbackDuckActiveRef.current) {
        return;
      }
      if (!nextMuted) {
        void tryStartPlayback({ fromGesture: true });
        void fadeTo(DEFAULT_AMBIENT_VOLUME, MIN_FADE_MS);
      }
    },
    [fadeTo, tryStartPlayback]
  );

  const duckAmbient = useCallback(
    async (lowVolume = DUCKED_AMBIENT_VOLUME) => {
      if (!(await ensureAudioGraph())) {
        fallbackDuckActiveRef.current = true;
        fallbackShouldResumeRef.current = isPlayingRef.current && !isMutedRef.current;
        if (fallbackShouldResumeRef.current) {
          pause();
        }
        if (mountedRef.current) {
          setVolume(clampVolume(lowVolume));
        }
        return;
      }
      await fadeTo(lowVolume, MIN_FADE_MS);
    },
    [ensureAudioGraph, fadeTo, pause]
  );

  const restoreAmbient = useCallback(
    async (normalVolume = DEFAULT_AMBIENT_VOLUME) => {
      const nextVolume = clampVolume(normalVolume);
      if (fallbackDuckActiveRef.current) {
        fallbackDuckActiveRef.current = false;
        if (mountedRef.current) {
          setVolume(nextVolume);
        }
        if (audioRef.current) {
          audioRef.current.volume = nextVolume;
        }
        if (!isMutedRef.current && fallbackShouldResumeRef.current) {
          await play();
        }
        fallbackShouldResumeRef.current = false;
        return;
      }
      await fadeTo(normalVolume, MIN_FADE_MS);
    },
    [fadeTo, play]
  );

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!awaitingInitialPlayback) {
      return;
    }

    function onInteraction() {
      registerUserGesture();
    }

    window.addEventListener("pointerdown", onInteraction);
    window.addEventListener("touchstart", onInteraction, { passive: true });
    window.addEventListener("click", onInteraction);
    window.addEventListener("keydown", onInteraction);
    window.addEventListener("wheel", onInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("click", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("wheel", onInteraction);
    };
  }, [awaitingInitialPlayback, registerUserGesture]);

  useEffect(() => {
    if (!hasUserInteracted || isMuted || !isReady || !startRequestedRef.current || isPlayingRef.current) return;
    void tryStartPlayback();
  }, [hasUserInteracted, isMuted, isReady, tryStartPlayback]);

  const value = useMemo<AudioContextValue>(
    () => ({
      isMuted,
      volume,
      isReady,
      hasUserInteracted,
      play,
      pause,
      registerUserGesture,
      setMuted,
      fadeTo,
      duckAmbient,
      restoreAmbient
    }),
    [duckAmbient, fadeTo, hasUserInteracted, isMuted, isReady, pause, play, registerUserGesture, restoreAmbient, setMuted, volume]
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
