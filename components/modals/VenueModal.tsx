"use client";

import Image from "next/image";
import { Modal } from "@/components/modals/Modal";

type VenueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const venueImages = [
  "/images/venue-1.svg",
  "/images/venue-2.svg",
  "/images/venue-3.svg",
  "/images/venue-4.svg"
];

export function VenueModal({ open, onOpenChange }: VenueModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Venue Preview"
      description="A mountain-view celebration setting in Asheville, NC."
    >
      <p className="mb-4 text-lg text-textMuted">
        We are finalizing the exact venue details. Expect warm lights, garden textures, and mountain air.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {venueImages.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-lg border border-gold/20">
            <Image src={src} alt="Venue preview" fill loading="lazy" sizes="(max-width: 768px) 45vw, 220px" className="object-cover" />
          </div>
        ))}
      </div>
    </Modal>
  );
}
