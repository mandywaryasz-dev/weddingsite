"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "@/components/audio/AudioProvider";
import { Modal } from "@/components/modals/Modal";
import { saveTheDateContent } from "@/lib/content/saveTheDate";

type PartyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PartyModal({ open, onOpenChange }: PartyModalProps) {
  const snippetRef = useRef<HTMLAudioElement | null>(null);
  const { duckAmbient, restoreAmbient } = useAudio();
  const content = saveTheDateContent.modals.party;

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
      if (open) {
        void restoreAmbient(0.3);
      }
    };
  }, [duckAmbient, open, restoreAmbient]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={content.title} description={content.description}>
      <div className="space-y-3">
        {content.bodyLines.map((line) => (
          <p key={line} className="text-base leading-relaxed text-textMuted sm:text-lg">
            {line}
          </p>
        ))}
      </div>
      <audio ref={snippetRef} src={content.audioSrc} controls className="mt-5 w-full" preload="none" />
      <p className="mt-3 text-xs text-textMuted">Ambient audio lowers while this preview plays.</p>
    </Modal>
  );
}
