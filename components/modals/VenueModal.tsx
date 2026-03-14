"use client";

import Image from "next/image";
import { Modal } from "@/components/modals/Modal";

type VenueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const venueImages = [
  "/images/venue-1.png",
  "/images/venue-3.png",
  "/images/venue-4.png",
];

export function VenueModal({ open, onOpenChange }: VenueModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Where We Gather"
      title="Haiku"
      contentClassName="w-[min(94vw,900px)]"
      headerAdornment={
        <div className="-mt-2 space-y-2 text-ivory/72">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-x-4">
            <p className="font-heading text-micro uppercase tracking-[0.22em] text-ivory/58">Asheville</p>
          </div>
          <p className="max-w-[32rem] font-body text-body-sm leading-[1.4] text-ivory/76">
            Garden textures, warm lights, and one very good reason to celebrate.
          </p>
        </div>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:col-span-2">
          <Image
            src={venueImages[0]}
            alt="Haiku venue exterior framed by garden greenery"
            fill
            loading="lazy"
            sizes="(max-width: 639px) 88vw, (max-width: 1023px) 74vw, 40rem"
            quality={90}
            className="object-cover"
          />
        </div>
        <div className="grid gap-3 sm:gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
            <Image
              src={venueImages[1]}
              alt="Haiku garden ceremony setting"
              fill
              loading="lazy"
              sizes="(max-width: 639px) 43vw, 20rem"
              quality={90}
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] sm:mr-0 sm:ml-0">
            <Image
              src={venueImages[2]}
              alt="Haiku reception space details"
              fill
              loading="lazy"
              sizes="(max-width: 639px) 34vw, 15rem"
              quality={90}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
