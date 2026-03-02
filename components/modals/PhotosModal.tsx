"use client";

import Image from "next/image";
import { Modal } from "@/components/modals/Modal";

type PhotosModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const photoImages = [
  "/images/photo-1.png",
  "/images/photo-2.png",
  "/images/photo-3.png",
  "/images/photo-4.png",
  "/images/photo-5.png",
  "/images/photo-6.png",
  "/images/photo-8.png"
];

export function PhotosModal({ open, onOpenChange }: PhotosModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Our Story" description="A few moments that brought us here.">
      <div className="space-y-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ivory/25 bg-black/20">
          <Image src={photoImages[0]} alt="Amanda and Dushyant portrait" fill sizes="(max-width: 768px) 86vw, 720px" className="object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {photoImages.slice(1).map((src, index) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-ivory/20 bg-black/20">
              <Image src={src} alt={`Amanda and Dushyant gallery photo ${index + 2}`} fill loading="lazy" sizes="(max-width: 768px) 42vw, 160px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
