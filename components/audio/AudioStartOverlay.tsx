"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioStartOverlay() {
  const { activateAudioFromGesture, hasActivatedAudio, isReady, pendingStart } = useAudio();

  const overlayCopy = pendingStart
    ? "Starting audio..."
    : isReady
      ? "Tap to begin"
      : "Loading audio...";

  return (
    <button
      type="button"
      data-testid="audio-start-overlay"
      aria-label="Start ambient audio and enter the site"
      onClick={() => void activateAudioFromGesture()}
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-6 pb-14 backdrop-blur-[2px] transition-opacity duration-300 [touch-action:manipulation] sm:pb-16 ${
        hasActivatedAudio ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="pointer-events-none font-heading text-detail uppercase tracking-label text-ivory/92">
        {overlayCopy}
      </span>
    </button>
  );
}
