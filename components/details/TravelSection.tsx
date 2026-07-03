import { SectionShell } from "@/components/details/SectionShell";
import { AirportRow } from "@/components/details/AirportRow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";
import type { Airport, SectionIntro } from "@/lib/details/types";

type TravelSectionProps = {
  intro: SectionIntro;
  airportsLabel: string;
  airports: Airport[];
};

/** Transparent — sits on the shared Travel/Stay/Attire backdrop (plan §2.3). */
export function TravelSection({ intro, airportsLabel, airports }: TravelSectionProps) {
  return (
    <section
      id="travel"
      className="relative overflow-hidden px-[clamp(20px,6vw,80px)] py-[clamp(74px,11vw,128px)]"
    >
      <DetailsImage
        src={detailsAsset("travelFloral")}
        alt=""
        width={360}
        height={360}
        className="pointer-events-none absolute -bottom-[20px] -left-[40px] hidden w-[clamp(180px,26vw,360px)] opacity-50 sm:block"
      />
      <DetailsImage
        src={detailsAsset("sprig")}
        alt=""
        width={110}
        height={183}
        className="pointer-events-none absolute right-[30px] top-[60px] hidden w-[clamp(60px,9vw,110px)] opacity-[0.32] sm:block"
      />

      <div className="relative mx-auto max-w-[680px]">
        <SectionShell
          intro={intro}
          subheadSize="lg"
          className="mb-[clamp(40px,6vw,64px)]"
        />

        <ScrollReveal>
          <div className="mb-[8px] flex items-center gap-[14px]">
            <span className="font-heading text-[11px] tracking-[0.26em] text-[color:var(--d-copper)]">
              {airportsLabel}
            </span>
            <span aria-hidden className="h-px flex-1 bg-[color:var(--d-hairline)]" />
          </div>

          {airports.map((airport) => (
            <AirportRow key={airport.code} airport={airport} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
