"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioStartOverlay() {
  const { hasUserInteracted } = useAudio();

  return (
    <div
      data-testid="audio-start-overlay"
      className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
        hasUserInteracted ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none flex h-full items-end justify-center px-6 pb-14 sm:pb-16">
        <p className="font-heading text-detail uppercase tracking-label text-ivory/92">Scroll to Begin</p>
      </div>
    </div>
  );
}
