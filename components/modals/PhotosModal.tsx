"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/modals/Modal";

type PhotosModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const photoImages = [
  "/images/photo-1.svg",
  "/images/photo-2.svg",
  "/images/photo-3.svg",
  "/images/photo-4.svg",
  "/images/photo-5.svg",
  "/images/photo-6.svg"
];

export function PhotosModal({ open, onOpenChange }: PhotosModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Our Photos" description="A few moments from our favorite adventures.">
      <div className="grid grid-cols-3 gap-2">
        {photoImages.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelected(src)}
            className="relative aspect-square overflow-hidden rounded-md border border-gold/20"
          >
            <Image src={src} alt="Couple photo" fill loading="lazy" sizes="(max-width: 768px) 30vw, 180px" className="object-cover" />
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-6" role="dialog" aria-label="Photo lightbox">
          <button type="button" className="absolute right-6 top-6 rounded-full border border-ivory/30 px-3 py-1 text-sm" onClick={() => setSelected(null)}>
            Close
          </button>
          <div className="relative h-[70vh] w-[min(90vw,900px)] overflow-hidden rounded-xl">
            <Image src={selected} alt="Expanded couple photo" fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
