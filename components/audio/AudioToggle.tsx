"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioToggle() {
  const { isMuted, setMuted } = useAudio();

  return (
    <button
      type="button"
      onClick={() => setMuted(!isMuted)}
      aria-label={isMuted ? "Enable page audio" : "Disable page audio"}
      className="fixed right-4 top-4 z-40 rounded-full border border-ivory/65 bg-black/35 px-4 py-1.5 font-heading text-micro uppercase tracking-micro text-ivory shadow-[0_12px_25px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:top-6"
    >
      Audio {isMuted ? "Off" : "On"}
    </button>
  );
}
