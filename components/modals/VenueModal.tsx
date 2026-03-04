"use client";

import Image from "next/image";
import { Modal } from "@/components/modals/Modal";

type VenueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const venueImages = [
  "/images/venue-1.png",
  "/images/venue-2.png",
  "/images/venue-3.png",
  "/images/venue-4.png",
];

export function VenueModal({ open, onOpenChange }: VenueModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="The Venue"
      description="Haiku – Asheville, NC"
    >
      <p className="mb-4 text-base text-ivory/90">
        Expect garden textures, warm lights, and one very good reason to celebrate.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {venueImages.map((src, index) => (
          <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={`Asheville venue preview ${index + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 46vw, 320px"
              quality={90}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
