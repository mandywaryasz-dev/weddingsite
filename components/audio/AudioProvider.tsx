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
import type { AudioContextValue, AudioStartupStatus } from "@/lib/audio/types";

const STARTUP_TIMEOUT_MS = 8000;
const AudioStateContext = createContext<AudioContextValue | null>(null);

type AudioProviderProps = PropsWithChildren<{
  ambientSrc?: string;
}>;

export function AudioProvider({
  children,
  ambientSrc = "/audio/ambient-loop-v3.mp3"
}: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const canPlayListenerRef = useRef<(() => void) | null>(null);
  const errorListenerRef = useRef<(() => void) | null>(null);
  const graphStatusRef = useRef<"unknown" | "enabled" | "failed">("unknown");
  const startAttemptRef = useRef<Promise<boolean> | null>(null);
  const startAttemptTokenRef = useRef(0);
  const startupTimeoutRef = useRef<number | null>(null);
  const fallbackDuckActiveRef = useRef(false);
  const fallbackShouldResumeRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const volumeRef = useRef(DEFAULT_AMBIENT_VOLUME);
  const isAudioEnabledRef = useRef(true);
  const isPlayingRef = useRef(false);
  const hasEnteredExperienceRef = useRef(false);
  const startupStatusRef = useRef<AudioStartupStatus>("idle");
  const [isAudioEnabled, setIsAudioEnabledState] = useState(true);
  const [volume, setVolume] = useState(DEFAULT_AMBIENT_VOLUME);
  const [isReady, setIsReady] = useState(false);
  const [hasActivatedAudio, setHasActivatedAudioState] = useState(false);
  const [hasEnteredExperience, setHasEnteredExperienceState] = useState(false);
  const [isPlaying, setIsPlayingState] = useState(false);
  const [pendingStart, setPendingStartState] = useState(false);
  const [startupStatus, setStartupStatusState] = useState<AudioStartupStatus>("idle");

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

  const setHasEnteredExperienceValue = useCallback((nextEntered: boolean) => {
    hasEnteredExperienceRef.current = nextEntered;
    if (mountedRef.current) {
      setHasEnteredExperienceState(nextEntered);
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

  const setStartupStatusValue = useCallback((nextStatus: AudioStartupStatus) => {
    startupStatusRef.current = nextStatus;
    if (mountedRef.current) {
      setStartupStatusState(nextStatus);
    }
  }, []);

  const stopFade = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const clearStartupTimeout = useCallback(() => {
    if (startupTimeoutRef.current !== null) {
      window.clearTimeout(startupTimeoutRef.current);
      startupTimeoutRef.current = null;
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

  const teardownAudioGraph = useCallback(() => {
    stopFade();
    gainNodeRef.current?.disconnect();
    mediaSourceRef.current?.disconnect();
    void audioContextRef.current?.close().catch(() => undefined);
    gainNodeRef.current = null;
    mediaSourceRef.current = null;
    audioContextRef.current = null;
    graphStatusRef.current = "unknown";
  }, [stopFade]);

  const teardownAudioElement = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (canPlayListenerRef.current) {
      audio.removeEventListener("canplay", canPlayListenerRef.current);
    }
    if (errorListenerRef.current) {
      audio.removeEventListener("error", errorListenerRef.current);
    }

    audio.pause();
    audioRef.current = null;
    canPlayListenerRef.current = null;
    errorListenerRef.current = null;
  }, []);

  const createAudioElement = useCallback(() => {
    if (audioRef.current && startupStatusRef.current !== "failed") {
      return audioRef.current;
    }

    if (audioRef.current) {
      teardownAudioElement();
    }

    const audio = new Audio(ambientSrc);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = DEFAULT_AMBIENT_VOLUME;

    const markReady = () => {
      if (mountedRef.current) {
        setIsReady(true);
      }
    };

    const markError = () => {
      if (mountedRef.current) {
        setIsReady(false);
      }
    };

    canPlayListenerRef.current = markReady;
    errorListenerRef.current = markError;
    audio.addEventListener("canplay", markReady);
    audio.addEventListener("error", markError);
    audio.load();
    audioRef.current = audio;

    return audio;
  }, [ambientSrc, teardownAudioElement]);

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
    setHasEnteredExperienceValue(false);
    setIsPlayingValue(false);
    setPendingStartValue(false);
    setStartupStatusValue("idle");
    setIsReady(false);
    setVolume(DEFAULT_AMBIENT_VOLUME);

    return () => {
      mountedRef.current = false;
      clearStartupTimeout();
      teardownAudioGraph();
      teardownAudioElement();
      fallbackDuckActiveRef.current = false;
      fallbackShouldResumeRef.current = false;
      startAttemptRef.current = null;
    };
  }, [
    clearStartupTimeout,
    setAudioEnabledValue,
    setHasActivatedAudioValue,
    setHasEnteredExperienceValue,
    setIsPlayingValue,
    setPendingStartValue,
    setStartupStatusValue,
    teardownAudioElement,
    teardownAudioGraph
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
      (window as Window & { webkitAudioContext?: typeof globalThis.AudioContext }).webkitAudioContext;

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

  const enterSilently = useCallback(() => {
    clearStartupTimeout();
    cancelPendingStart();
    fallbackDuckActiveRef.current = false;
    fallbackShouldResumeRef.current = false;
    setAudioEnabledValue(false);
    setHasEnteredExperienceValue(true);
    setIsPlayingValue(false);
    setStartupStatusValue("silent");
    audioRef.current?.pause();
  }, [
    cancelPendingStart,
    clearStartupTimeout,
    setAudioEnabledValue,
    setHasEnteredExperienceValue,
    setIsPlayingValue,
    setStartupStatusValue
  ]);

  const markStartFailure = useCallback(() => {
    clearStartupTimeout();
    cancelPendingStart();
    fallbackDuckActiveRef.current = false;
    fallbackShouldResumeRef.current = false;
    setAudioEnabledValue(false);
    setIsPlayingValue(false);
    setStartupStatusValue("failed");
    audioRef.current?.pause();
  }, [
    cancelPendingStart,
    clearStartupTimeout,
    setAudioEnabledValue,
    setIsPlayingValue,
    setStartupStatusValue
  ]);

  const tryStartPlayback = useCallback(
    async ({
      enterExperienceImmediately = false,
      silenceOnFailure = false
    }: {
      enterExperienceImmediately?: boolean;
      silenceOnFailure?: boolean;
    } = {}) => {
      if (!isAudioEnabledRef.current) {
        setPendingStartValue(false);
        return false;
      }

      if (enterExperienceImmediately && !hasEnteredExperienceRef.current) {
        setHasEnteredExperienceValue(true);
      }

      if (isPlayingRef.current) {
        setPendingStartValue(false);
        setStartupStatusValue("playing");
        if (!hasEnteredExperienceRef.current) {
          setHasEnteredExperienceValue(true);
        }
        return true;
      }

      if (startAttemptRef.current) {
        return startAttemptRef.current;
      }

      const audio = createAudioElement();
      if (!audio) {
        return false;
      }

      const attemptToken = startAttemptTokenRef.current + 1;
      startAttemptTokenRef.current = attemptToken;
      setPendingStartValue(true);
      setStartupStatusValue("starting");

      let playPromise: Promise<void>;
      try {
        playPromise = audio.play();
      } catch {
        if (silenceOnFailure) {
          enterSilently();
        } else {
          markStartFailure();
        }
        return false;
      }

      clearStartupTimeout();
      startupTimeoutRef.current = window.setTimeout(() => {
        if (attemptToken !== startAttemptTokenRef.current) {
          return;
        }

        if (silenceOnFailure) {
          enterSilently();
        } else {
          markStartFailure();
        }
      }, STARTUP_TIMEOUT_MS);

      const attemptPromise = (async () => {
        try {
          await playPromise;
          clearStartupTimeout();

          if (
            attemptToken !== startAttemptTokenRef.current ||
            !isAudioEnabledRef.current
          ) {
            audio.pause();
            return false;
          }

          setHasActivatedAudioValue(true);
          setHasEnteredExperienceValue(true);
          setIsPlayingValue(true);
          setPendingStartValue(false);
          setStartupStatusValue("playing");
          void enhanceStartedPlayback();
          return true;
        } catch {
          clearStartupTimeout();

          if (attemptToken === startAttemptTokenRef.current) {
            if (silenceOnFailure) {
              enterSilently();
            } else {
              markStartFailure();
            }
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
    },
    [
      clearStartupTimeout,
      createAudioElement,
      enhanceStartedPlayback,
      enterSilently,
      markStartFailure,
      setHasActivatedAudioValue,
      setHasEnteredExperienceValue,
      setIsPlayingValue,
      setPendingStartValue,
      setStartupStatusValue
    ]
  );

  const prepareAudio = useCallback(() => {
    createAudioElement();
  }, [createAudioElement]);

  const play = useCallback(async () => {
    await tryStartPlayback();
  }, [tryStartPlayback]);

  const pause = useCallback(() => {
    clearStartupTimeout();
    cancelPendingStart();
    setIsPlayingValue(false);
    if (hasEnteredExperienceRef.current) {
      setStartupStatusValue("silent");
    }
    audioRef.current?.pause();
  }, [
    cancelPendingStart,
    clearStartupTimeout,
    setIsPlayingValue,
    setStartupStatusValue
  ]);

  const activateAudioFromGesture = useCallback(async () => {
    setAudioEnabledValue(true);
    await tryStartPlayback({
      enterExperienceImmediately: true,
      silenceOnFailure: true
    });
  }, [setAudioEnabledValue, tryStartPlayback]);

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
        if (hasEnteredExperienceRef.current && !isPlayingRef.current) {
          setStartupStatusValue("silent");
        }
        return;
      }

      fallbackDuckActiveRef.current = false;
      fallbackShouldResumeRef.current = false;
      stopFade();
      clearStartupTimeout();
      cancelPendingStart();
      setIsPlayingValue(false);
      if (hasEnteredExperienceRef.current) {
        setStartupStatusValue("silent");
      } else {
        setStartupStatusValue("idle");
      }
      audioRef.current?.pause();
    },
    [
      cancelPendingStart,
      clearStartupTimeout,
      setAudioEnabledValue,
      setIsPlayingValue,
      setStartupStatusValue,
      stopFade
    ]
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
      hasEnteredExperience,
      isPlaying,
      pendingStart,
      startupStatus,
      prepareAudio,
      play,
      pause,
      activateAudioFromGesture,
      enterSilently,
      setAudioEnabled,
      fadeTo,
      duckAmbient,
      restoreAmbient
    }),
    [
      activateAudioFromGesture,
      duckAmbient,
      enterSilently,
      fadeTo,
      hasActivatedAudio,
      hasEnteredExperience,
      isAudioEnabled,
      isPlaying,
      isReady,
      prepareAudio,
      pause,
      pendingStart,
      play,
      restoreAmbient,
      setAudioEnabled,
      startupStatus,
      volume
    ]
  );

  return <AudioStateContext.Provider value={value}>{children}</AudioStateContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioStateContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
