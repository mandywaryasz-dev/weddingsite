import { SectionShell } from "@/components/details/SectionShell";
import { HotelCard } from "@/components/details/HotelCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";
import type { Hotel, SectionIntro } from "@/lib/details/types";

type StaySectionProps = {
  intro: SectionIntro;
  hotels: Hotel[];
};

/** Transparent — sits on the shared Travel/Stay/Attire backdrop (plan §2.3). */
export function StaySection({ intro, hotels }: StaySectionProps) {
  return (
    <section
      id="stay"
      className="relative overflow-hidden px-[clamp(20px,6vw,80px)] py-[clamp(74px,11vw,128px)]"
    >
      <DetailsImage
        src={detailsAsset("stayFloral")}
        alt=""
        width={110}
        height={183}
        className="pointer-events-none absolute bottom-10 left-6 hidden w-[clamp(60px,9vw,110px)] opacity-40 sm:block"
      />

      <div className="relative mx-auto max-w-[1080px]">
        <SectionShell
          intro={intro}
          subheadSize="lg"
          className="mb-[clamp(40px,6vw,60px)]"
        />

        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,36px)] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {hotels.map((hotel) => (
            <ScrollReveal key={hotel.name} className="flex">
              <HotelCard hotel={hotel} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
