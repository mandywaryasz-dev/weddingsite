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
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="A Few Frames"
      title="Our Story"
      description="A few moments that brought us here."
      contentClassName="w-[min(94vw,940px)]"
    >
      <div className="grid gap-2 sm:gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start">
        <div className="relative z-[1] mx-auto w-full max-w-[17rem] rotate-[-1.5deg] sm:max-w-[18rem] lg:mx-0 lg:max-w-[19rem]">
          <Image
            src={photoImages[0]}
            alt="Amanda and Dushyant standing together in front of the U.S. Capitol"
            width={1000}
            height={1500}
            sizes="(max-width: 639px) 60vw, (max-width: 1023px) 40vw, 19rem"
            loading="lazy"
            quality={90}
            className="h-auto w-full"
          />
        </div>

        <div className="grid gap-1 pt-1 sm:gap-2 lg:pt-4">
          <div className="relative z-[2] ml-auto w-full max-w-[12.5rem] rotate-[1.75deg] sm:max-w-[13.5rem] lg:max-w-[14rem]">
            <Image
              src={photoImages[1]}
              alt="Amanda and Dushyant walking away together on a city sidewalk"
              width={1000}
              height={1500}
              sizes="(max-width: 639px) 42vw, (max-width: 1023px) 26vw, 14rem"
              loading="lazy"
              quality={90}
              className="h-auto w-full"
            />
          </div>
          <div className="relative z-[1] -mt-10 mr-auto ml-4 w-full max-w-[11.75rem] rotate-[-2deg] sm:-mt-12 sm:max-w-[12.5rem] lg:ml-6 lg:max-w-[13rem]">
            <Image
              src={photoImages[2]}
              alt="Amanda and Dushyant posing together outdoors"
              width={1000}
              height={1500}
              sizes="(max-width: 639px) 40vw, (max-width: 1023px) 24vw, 13rem"
              loading="lazy"
              quality={90}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="-mt-3 grid grid-cols-2 gap-2 sm:-mt-5 sm:grid-cols-3 sm:gap-3">
        <div className="relative rotate-[-1deg]">
          <Image
            src={photoImages[3]}
            alt="Amanda and Dushyant sharing a candid moment together"
            width={1000}
            height={1500}
            sizes="(max-width: 639px) 43vw, (max-width: 1023px) 28vw, 12rem"
            loading="lazy"
            quality={90}
            className="h-auto w-full"
          />
        </div>
        <div className="relative translate-y-2 rotate-[1.25deg]">
          <Image
            src={photoImages[4]}
            alt="Amanda and Dushyant smiling together near the water"
            width={1000}
            height={1500}
            sizes="(max-width: 639px) 43vw, (max-width: 1023px) 28vw, 12rem"
            loading="lazy"
            quality={90}
            className="h-auto w-full"
          />
        </div>
        <div className="relative col-span-2 mx-auto -mt-2 w-[66%] rotate-[0.75deg] sm:col-span-1 sm:mt-0 sm:w-full">
          <Image
            src={photoImages[5]}
            alt="Amanda and Dushyant in another favorite snapshot together"
            width={1000}
            height={1500}
            sizes="(max-width: 639px) 40vw, (max-width: 1023px) 28vw, 12rem"
            loading="lazy"
            quality={90}
            className="h-auto w-full"
          />
        </div>
      </div>
    </Modal>
  );
}
