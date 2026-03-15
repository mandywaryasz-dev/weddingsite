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
import type { AudioContextValue } from "@/lib/audio/types";

const AudioContext = createContext<AudioContextValue | null>(null);

type AudioProviderProps = PropsWithChildren<{
  ambientSrc?: string;
}>;

export function AudioProvider({
  children,
  ambientSrc = "/audio/ambient-loop.mp3"
}: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const graphStatusRef = useRef<"unknown" | "enabled" | "failed">("unknown");
  const startAttemptRef = useRef<Promise<boolean> | null>(null);
  const startAttemptTokenRef = useRef(0);
  const fallbackDuckActiveRef = useRef(false);
  const fallbackShouldResumeRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const volumeRef = useRef(DEFAULT_AMBIENT_VOLUME);
  const isAudioEnabledRef = useRef(true);
  const isPlayingRef = useRef(false);
  const [isAudioEnabled, setIsAudioEnabledState] = useState(true);
  const [volume, setVolume] = useState(DEFAULT_AMBIENT_VOLUME);
  const [isReady, setIsReady] = useState(false);
  const [hasActivatedAudio, setHasActivatedAudioState] = useState(false);
  const [isPlaying, setIsPlayingState] = useState(false);
  const [pendingStart, setPendingStartState] = useState(false);

  const setAudioEnabledValue = useCallback((nextEnabled: boolean) => {
    isAudioEnabledRef.current = nextEnabled;
    if (mountedRef.current) {
      setIsAudioEnabledState(nextEnabled);
    }
  }, []);

  const setHasActivatedAudioValue = useCallback((nextActivated: boolean) => {
    if (mountedRef.current) {
      setHasActivatedAudioState(nextActivated);
    }
  }, []);

  const setIsPlayingValue = useCallback((nextPlaying: boolean) => {
    isPlayingRef.current = nextPlaying;
    if (mountedRef.current) {
      setIsPlayingState(nextPlaying);
    }
  }, []);

  const setPendingStartValue = useCallback((nextPending: boolean) => {
    if (mountedRef.current) {
      setPendingStartState(nextPending);
    }
  }, []);

  const stopFade = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const applyVolume = useCallback((nextVolume: number) => {
    const clampedVolume = clampVolume(nextVolume);
    const audio = audioRef.current;
    const gainNode = gainNodeRef.current;

    volumeRef.current = clampedVolume;

    if (gainNode && graphStatusRef.current === "enabled") {
      gainNode.gain.value = clampedVolume;
      if (audio) {
        audio.volume = 1;
      }
    } else if (audio) {
      audio.volume = clampedVolume;
    }

    if (mountedRef.current) {
      setVolume(clampedVolume);
    }

    return clampedVolume;
  }, []);

  const cancelPendingStart = useCallback(() => {
    startAttemptTokenRef.current += 1;
    startAttemptRef.current = null;
    setPendingStartValue(false);
  }, [setPendingStartValue]);

  useEffect(() => {
    mountedRef.current = true;
    graphStatusRef.current = "unknown";
    fallbackDuckActiveRef.current = false;
    fallbackShouldResumeRef.current = false;
    startAttemptRef.current = null;
    startAttemptTokenRef.current = 0;
    volumeRef.current = DEFAULT_AMBIENT_VOLUME;
    setAudioEnabledValue(true);
    setHasActivatedAudioValue(false);
    setIsPlayingValue(false);
    setPendingStartValue(false);
    setIsReady(false);
    setVolume(DEFAULT_AMBIENT_VOLUME);

    const audio = new Audio(ambientSrc);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = DEFAULT_AMBIENT_VOLUME;
    audioRef.current = audio;

    const markReady = () => {
      if (mountedRef.current) {
        setIsReady(true);
      }
    };

    audio.addEventListener("canplay", markReady);
    audio.load();

    return () => {
      mountedRef.current = false;
      stopFade();
      gainNodeRef.current?.disconnect();
      mediaSourceRef.current?.disconnect();
      void audioContextRef.current?.close().catch(() => undefined);
      gainNodeRef.current = null;
      mediaSourceRef.current = null;
      audioContextRef.current = null;
      graphStatusRef.current = "unknown";
      fallbackDuckActiveRef.current = false;
      fallbackShouldResumeRef.current = false;
      startAttemptRef.current = null;
      audio.removeEventListener("canplay", markReady);
      audio.pause();
      audioRef.current = null;
    };
  }, [
    ambientSrc,
    setAudioEnabledValue,
    setHasActivatedAudioValue,
    setIsPlayingValue,
    setPendingStartValue,
    stopFade
  ]);

  const ensureAudioGraph = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return false;
    }

    if (
      graphStatusRef.current === "enabled" &&
      gainNodeRef.current &&
      audioContextRef.current
    ) {
      if (audioContextRef.current.state === "suspended") {
        try {
          await audioContextRef.current.resume();
        } catch {
          graphStatusRef.current = "failed";
          gainNodeRef.current = null;
          mediaSourceRef.current = null;
          audioContextRef.current = null;
          return false;
        }
      }
      return true;
    }

    if (graphStatusRef.current === "failed") {
      return false;
    }

    const AudioContextCtor =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) {
      graphStatusRef.current = "failed";
      return false;
    }

    try {
      const context = audioContextRef.current ?? new AudioContextCtor();
      const source = mediaSourceRef.current ?? context.createMediaElementSource(audio);
      const gainNode = gainNodeRef.current ?? context.createGain();

      if (!mediaSourceRef.current) {
        source.connect(gainNode);
      }
      if (!gainNodeRef.current) {
        gainNode.connect(context.destination);
      }

      audioContextRef.current = context;
      mediaSourceRef.current = source;
      gainNodeRef.current = gainNode;
      graphStatusRef.current = "enabled";
      applyVolume(volumeRef.current);

      if (context.state === "suspended") {
        await context.resume();
      }

      return true;
    } catch {
      graphStatusRef.current = "failed";
      gainNodeRef.current = null;
      mediaSourceRef.current = null;
      audioContextRef.current = null;
      return false;
    }
  }, [applyVolume]);

  const enhanceStartedPlayback = useCallback(async () => {
    const didEnableGraph = await ensureAudioGraph();
    if (!didEnableGraph) {
      return;
    }
    applyVolume(volumeRef.current);
  }, [applyVolume, ensureAudioGraph]);

  const tryStartPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isAudioEnabledRef.current) {
      setPendingStartValue(false);
      return false;
    }

    if (isPlayingRef.current) {
      setPendingStartValue(false);
      return true;
    }

    if (startAttemptRef.current) {
      return startAttemptRef.current;
    }

    const attemptToken = startAttemptTokenRef.current + 1;
    startAttemptTokenRef.current = attemptToken;

    setPendingStartValue(true);

    const playPromise = audio.play();
    const attemptPromise = (async () => {
      try {
        await playPromise;

        if (
          attemptToken !== startAttemptTokenRef.current ||
          !isAudioEnabledRef.current
        ) {
          audio.pause();
          return false;
        }

        setHasActivatedAudioValue(true);
        setIsPlayingValue(true);
        setPendingStartValue(false);
        void enhanceStartedPlayback();
        return true;
      } catch {
        if (attemptToken === startAttemptTokenRef.current) {
          setIsPlayingValue(false);
          setPendingStartValue(false);
        }
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
  }, [
    enhanceStartedPlayback,
    setHasActivatedAudioValue,
    setIsPlayingValue,
    setPendingStartValue
  ]);

  const play = useCallback(async () => {
    await tryStartPlayback();
  }, [tryStartPlayback]);

  const pause = useCallback(() => {
    cancelPendingStart();
    setIsPlayingValue(false);
    audioRef.current?.pause();
  }, [cancelPendingStart, setIsPlayingValue]);

  const activateAudioFromGesture = useCallback(async () => {
    await tryStartPlayback();
  }, [tryStartPlayback]);

  const fadeTo = useCallback(
    async (targetVolume: number, durationMs: number) => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      const hasGraph = (await ensureAudioGraph()) && gainNodeRef.current;
      const controlledGain = hasGraph ? gainNodeRef.current : null;
      const from = clampVolume(
        controlledGain ? controlledGain.gain.value : audio.volume
      );
      const to = clampVolume(targetVolume);
      const safeDuration = Math.max(durationMs, MIN_FADE_MS);

      stopFade();

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

          volumeRef.current = nextClampedVolume;
          if (mountedRef.current) {
            setVolume(nextClampedVolume);
          }

          if (progress < 1) {
            frameRef.current = requestAnimationFrame(step);
            return;
          }

          applyVolume(to);
          frameRef.current = null;
          resolve();
        };

        if (frameCount === 1) {
          applyVolume(to);
          resolve();
          return;
        }

        frameRef.current = requestAnimationFrame(step);
      });
    },
    [applyVolume, ensureAudioGraph, stopFade]
  );

  const setAudioEnabled = useCallback(
    (nextEnabled: boolean) => {
      setAudioEnabledValue(nextEnabled);

      if (nextEnabled) {
        fallbackShouldResumeRef.current = false;
        return;
      }

      fallbackDuckActiveRef.current = false;
      fallbackShouldResumeRef.current = false;
      stopFade();
      cancelPendingStart();
      setIsPlayingValue(false);
      audioRef.current?.pause();
    },
    [cancelPendingStart, setAudioEnabledValue, setIsPlayingValue, stopFade]
  );

  const duckAmbient = useCallback(
    async (lowVolume = DUCKED_AMBIENT_VOLUME) => {
      if (!isAudioEnabledRef.current || !isPlayingRef.current) {
        fallbackShouldResumeRef.current = false;
        return;
      }

      if (!(await ensureAudioGraph())) {
        fallbackDuckActiveRef.current = true;
        fallbackShouldResumeRef.current =
          isAudioEnabledRef.current && isPlayingRef.current;
        if (fallbackShouldResumeRef.current) {
          pause();
        }
        applyVolume(lowVolume);
        return;
      }

      fallbackDuckActiveRef.current = false;
      fallbackShouldResumeRef.current = false;
      await fadeTo(lowVolume, MIN_FADE_MS);
    },
    [applyVolume, ensureAudioGraph, fadeTo, pause]
  );

  const restoreAmbient = useCallback(
    async (normalVolume = DEFAULT_AMBIENT_VOLUME) => {
      const nextVolume = clampVolume(normalVolume);

      if (!isAudioEnabledRef.current) {
        fallbackDuckActiveRef.current = false;
        fallbackShouldResumeRef.current = false;
        applyVolume(nextVolume);
        return;
      }

      if (fallbackDuckActiveRef.current) {
        fallbackDuckActiveRef.current = false;
        applyVolume(nextVolume);
        if (fallbackShouldResumeRef.current) {
          await play();
        }
        fallbackShouldResumeRef.current = false;
        return;
      }

      await fadeTo(nextVolume, MIN_FADE_MS);
    },
    [applyVolume, fadeTo, play]
  );

  const value = useMemo<AudioContextValue>(
    () => ({
      isAudioEnabled,
      volume,
      isReady,
      hasActivatedAudio,
      isPlaying,
      pendingStart,
      play,
      pause,
      activateAudioFromGesture,
      setAudioEnabled,
      fadeTo,
      duckAmbient,
      restoreAmbient
    }),
    [
      activateAudioFromGesture,
      duckAmbient,
      fadeTo,
      hasActivatedAudio,
      isAudioEnabled,
      isPlaying,
      isReady,
      pause,
      pendingStart,
      play,
      restoreAmbient,
      setAudioEnabled,
      volume
    ]
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
