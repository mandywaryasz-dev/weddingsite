"use client";

import { useRef, type MouseEvent, type TouchEvent } from "react";
import { useAudio } from "@/components/audio/AudioProvider";

export function AudioStartOverlay() {
  const { activateAudioFromGesture, hasActivatedAudio } = useAudio();
  const didHandleGestureRef = useRef(false);

  function handleGesture(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (didHandleGestureRef.current) {
      return;
    }
    didHandleGestureRef.current = true;
    void activateAudioFromGesture();
  }

  return (
    <div
      data-testid="audio-start-overlay"
      onTouchEnd={handleGesture}
      onClick={handleGesture}
      className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
        hasActivatedAudio ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none flex h-full items-end justify-center px-6 pb-14 sm:pb-16">
        <p className="font-heading text-detail uppercase tracking-label text-ivory/92">Scroll to Begin</p>
      </div>
    </div>
  );
}
