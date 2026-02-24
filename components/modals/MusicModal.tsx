"use client";

import { useEffect, useRef } from "react";
import { Modal } from "@/components/modals/Modal";
import { useAudio } from "@/components/audio/AudioProvider";

type MusicModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MusicModal({ open, onOpenChange }: MusicModalProps) {
  const snippetRef = useRef<HTMLAudioElement | null>(null);
  const { duckAmbient, restoreAmbient } = useAudio();

  useEffect(() => {
    const snippet = snippetRef.current;
    if (!snippet) return;

    if (open) {
      void duckAmbient(0.1);
      void snippet.play().catch(() => undefined);
    } else {
      snippet.pause();
      snippet.currentTime = 0;
      void restoreAmbient(0.3);
    }

    return () => {
      snippet.pause();
      snippet.currentTime = 0;
    };
  }, [duckAmbient, open, restoreAmbient]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Music Preview" description="A short snippet from the soundtrack of our weekend.">
      <p className="mb-4 text-base text-textMuted">
        Ambient track is ducked while this preview plays so audio remains clear and balanced.
      </p>
      <audio ref={snippetRef} src="/audio/music-preview.mp3" controls className="w-full" preload="none" />
      <p className="mt-3 text-xs text-textMuted">TODO: Replace with licensed preview clip in `/public/audio/music-preview.mp3`.</p>
    </Modal>
  );
}
