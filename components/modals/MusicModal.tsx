"use client";

import { useEffect } from "react";
import { Modal } from "@/components/modals/Modal";
import { useAudio } from "@/components/audio/AudioProvider";

type MusicModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MusicModal({ open, onOpenChange }: MusicModalProps) {
  const { duckAmbient, isAudioEnabled, restoreAmbient } = useAudio();

  useEffect(() => {
    if (!isAudioEnabled) {
      return;
    }

    if (open) {
      // Keep ambient fully ducked while playlist preview is visible to avoid overlapping audio layers.
      void duckAmbient(0);
    } else {
      void restoreAmbient(0.3);
    }

    return () => {
      void restoreAmbient(0.3);
    };
  }, [duckAmbient, isAudioEnabled, open, restoreAmbient]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="After Dark"
      title="The Party"
      lede={
        <>
          Songs we love. Songs you&apos;ll dance to. <strong>No skips allowed.</strong>
        </>
      }
      description="Spotify wedding playlist preview"
      contentClassName="w-[min(94vw,940px)]"
      bodyClassName="space-y-5 sm:space-y-6"
    >
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1 sm:px-2">
          <p className="font-heading text-micro uppercase tracking-[0.22em] text-ivory/76">Amanda &amp; Dushyant</p>
          <p className="font-heading text-micro uppercase tracking-[0.22em] text-ivory/76">On Repeat</p>
        </div>
        <iframe
          data-testid="embed-iframe"
          title="Spotify wedding playlist"
          style={{ borderRadius: 18 }}
          src="https://open.spotify.com/embed/playlist/6jtFLRCZDlfvMPYiVS25Pr?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </Modal>
  );
}
