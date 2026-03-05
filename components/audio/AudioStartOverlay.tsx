"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioStartOverlay() {
  const { hasUserInteracted } = useAudio();

  return (
    <div
      data-testid="audio-start-overlay"
      aria-hidden="true"
      className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
        hasUserInteracted ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    />
  );
}
