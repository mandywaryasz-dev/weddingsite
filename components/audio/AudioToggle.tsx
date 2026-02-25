"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioToggle() {
  const { isMuted, setMuted } = useAudio();

  return (
    <button
      type="button"
      onClick={() => setMuted(!isMuted)}
      aria-label={isMuted ? "Unmute ambient audio" : "Mute ambient audio"}
      className="glass-pill fixed right-4 top-4 z-40 px-4 py-2 text-xs font-heading uppercase tracking-[0.16em] text-ivory transition"
    >
      {isMuted ? "Sound Off" : "Sound On"}
    </button>
  );
}
