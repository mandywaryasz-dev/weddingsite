"use client";

import Image from "next/image";
import { Modal } from "@/components/modals/Modal";
import { saveTheDateContent } from "@/lib/content/saveTheDate";

type VenueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function VenueModal({ open, onOpenChange }: VenueModalProps) {
  const content = saveTheDateContent.modals.venue;

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={content.title} description={content.description}>
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/20">
        <Image
          src={content.heroImageSrc}
          alt={content.heroImageAlt}
          fill
          sizes="(max-width: 768px) 90vw, 680px"
          className="object-cover"
        />
      </div>
      <div className="mb-5 space-y-2">
        {content.bodyLines.map((line) => (
          <p key={line} className="text-base leading-relaxed text-textMuted sm:text-lg">
            {line}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {content.gallery.map((image) => (
          <div key={image.src} className="relative aspect-square overflow-hidden rounded-xl border border-white/20">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 45vw, 220px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
