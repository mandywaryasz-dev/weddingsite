"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioToggle() {
  const { isMuted, setMuted } = useAudio();

  return (
    <button
      type="button"
      onClick={() => setMuted(!isMuted)}
      aria-label={isMuted ? "Unmute ambient audio" : "Mute ambient audio"}
      className="fixed right-4 top-4 z-40 rounded-full border border-gold/80 bg-forest/80 px-4 py-2 text-xs font-heading uppercase tracking-[0.16em] text-ivory backdrop-blur-sm transition hover:bg-gold hover:text-forest"
    >
      {isMuted ? "Sound Off" : "Sound On"}
    </button>
  );
}
