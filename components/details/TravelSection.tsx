import { SectionShell } from "@/components/details/SectionShell";
import { AirportRow } from "@/components/details/AirportRow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Airport, SectionIntro } from "@/lib/details/types";

type TravelSectionProps = {
  intro: SectionIntro;
  airportsLabel: string;
  airports: Airport[];
};

/** Transparent — sits on the shared Travel/Stay/Attire/FAQ backdrop (plan §2.3). */
export function TravelSection({ intro, airportsLabel, airports }: TravelSectionProps) {
  return (
    <section
      id="travel"
      className="relative overflow-hidden px-[clamp(20px,6vw,80px)] pb-[clamp(56px,8vw,84px)] pt-[clamp(80px,10vw,116px)]"
    >
      <div className="relative mx-auto max-w-[680px]">
        <SectionShell
          intro={intro}
          subheadSize="lg"
          className="mb-[clamp(40px,6vw,64px)]"
        />

        <ScrollReveal>
          <p className="mb-[clamp(22px,3.4vw,28px)] font-heading text-[11px] tracking-[0.26em] text-[color:var(--d-copper)]">
            {airportsLabel}
          </p>

          {airports.map((airport) => (
            <AirportRow key={airport.code} airport={airport} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
