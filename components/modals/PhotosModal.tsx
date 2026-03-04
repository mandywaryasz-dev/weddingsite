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
  "/images/photo-4.png",
  "/images/photo-5.png",
  "/images/photo-6.png",
  "/images/photo-8.png",
];

export function PhotosModal({ open, onOpenChange }: PhotosModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Our Story" description="A few moments that brought us here.">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {photoImages.map((src, index) => (
          <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={`Amanda and Dushyant photo ${index + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 45vw, 240px"
              quality={90}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
