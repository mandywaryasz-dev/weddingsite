"use client";

import { useEffect } from "react";
import { Modal } from "@/components/modals/Modal";
import { useAudio } from "@/components/audio/AudioProvider";

type MusicModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MusicModal({ open, onOpenChange }: MusicModalProps) {
  const { duckAmbient, restoreAmbient } = useAudio();

  useEffect(() => {
    if (open) {
      // Keep ambient fully ducked while playlist preview is visible to avoid overlapping audio layers.
      void duckAmbient(0);
    } else {
      void restoreAmbient(0.3);
    }

    return () => {
      void restoreAmbient(0.3);
    };
  }, [duckAmbient, open, restoreAmbient]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="The Party" description="A preview of the soundtrack for our celebration.">
      <p className="mb-4 text-base text-ivory/90">
        The page ambience is paused while this playlist is open so only one audio source plays at a time.
      </p>
      <iframe
        data-testid="embed-iframe"
        title="Spotify wedding playlist"
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/playlist/6jtFLRCZDlfvMPYiVS25Pr?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </Modal>
  );
}
