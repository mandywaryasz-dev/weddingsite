"use client";

import Image from "next/image";
import { Modal } from "@/components/modals/Modal";

type VenueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const venueImages = [
  // No dedicated venue gallery files exist yet; these are the closest location-forward assets in /public/images.
  "/images/venue-1.png",
  "/images/bg-landscape.png",
  "/images/explore-bg.png",
  "/images/hero-poster.png"
];

export function VenueModal({ open, onOpenChange }: VenueModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="The Venue"
      description="Asheville, North Carolina"
    >
      <p className="mb-5 text-lg text-ivory/90">
        Mountain views, garden textures, and an evening celebration in Asheville. Full logistics and maps are coming soon.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {venueImages.map((src, index) => (
          <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ivory/25 bg-black/20">
            <Image
              src={src}
              alt={`Asheville venue preview ${index + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 46vw, 320px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
