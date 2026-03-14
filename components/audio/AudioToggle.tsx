"use client";

import type { MouseEvent } from "react";
import { useAudio } from "@/components/audio/AudioProvider";

export function AudioToggle() {
  const {
    activateAudioFromGesture,
    isAudioEnabled,
    isPlaying,
    pendingStart,
    setAudioEnabled
  } = useAudio();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (isAudioEnabled) {
      setAudioEnabled(false);
      return;
    }

    setAudioEnabled(true);
    void activateAudioFromGesture();
  }

  return (
    <button
      type="button"
      data-testid="audio-toggle"
      data-audio-enabled={isAudioEnabled ? "true" : "false"}
      data-audio-playing={isPlaying ? "true" : "false"}
      data-audio-pending={pendingStart ? "true" : "false"}
      aria-label={isAudioEnabled ? "Pause page audio" : "Resume page audio"}
      aria-pressed={isAudioEnabled}
      onClick={handleClick}
      className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/65 bg-black/35 text-ivory shadow-[0_12px_25px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:top-6"
    >
      {isAudioEnabled ? (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M11 5L6.5 9H3v6h3.5L11 19V5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 9.5c1.4 1.4 1.4 3.6 0 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M17.7 7c2.8 2.8 2.8 7.2 0 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M11 5L6.5 9H3v6h3.5L11 19V5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16 9l5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
