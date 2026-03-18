"use client";

import { useAudio } from "@/components/audio/AudioProvider";

export function AudioStartOverlay() {
  const {
    activateAudioFromGesture,
    enterSilently,
    hasEnteredExperience,
    pendingStart,
    prepareAudio,
    startupStatus
  } = useAudio();

  const overlayCopy =
    startupStatus === "starting" || pendingStart
      ? "Starting audio..."
      : "Tap to begin";

  return (
    <div
      data-testid="audio-start-overlay-shell"
      className={`fixed inset-0 z-50 bg-black/45 px-6 pb-14 backdrop-blur-[2px] transition-opacity duration-300 sm:pb-16 ${
        hasEnteredExperience ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        data-testid="audio-start-overlay"
        aria-label="Start ambient audio and enter the site"
        onPointerDown={prepareAudio}
        onClick={() => void activateAudioFromGesture()}
        className="absolute inset-0 [touch-action:manipulation]"
      />

      <div className="relative flex h-full items-end justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="pointer-events-none font-heading text-detail uppercase tracking-label text-ivory/92">
            {overlayCopy}
          </span>

          <button
            type="button"
            data-testid="audio-skip-button"
            onClick={enterSilently}
            className="rounded-full border border-ivory/20 bg-black/15 px-4 py-2 font-heading text-[0.64rem] uppercase tracking-[0.2em] text-ivory/72 transition hover:border-ivory/28 hover:bg-white/10 hover:text-ivory"
          >
            Continue without sound
          </button>
        </div>
      </div>
    </div>
  );
}
