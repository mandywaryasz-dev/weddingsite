import { SectionShell } from "@/components/details/SectionShell";
import { EventRow } from "@/components/details/EventRow";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";
import type { EventItem, SectionIntro } from "@/lib/details/types";

type EventsSectionProps = {
  intro: SectionIntro;
  events: EventItem[];
};

export function EventsSection({ intro, events }: EventsSectionProps) {
  return (
    <section
      id="events"
      data-tone="dark"
      className="relative overflow-hidden bg-[#4A1620] px-[clamp(20px,6vw,80px)] py-[clamp(74px,11vw,128px)] text-[color:var(--d-body)]"
    >
      <DetailsImage
        src={detailsAsset("eventsBg")}
        alt=""
        fill
        loading="lazy"
        quality={85}
        sizes="100vw"
        className="object-cover"
      />
      {/* darkening vignette toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%,rgba(74,22,32,0) 45%,rgba(40,10,16,.42) 100%)",
        }}
      />

      {/* corner floral line art — top-left, and mirrored bottom-right */}
      <DetailsImage
        src={detailsAsset("floralEdge")}
        alt=""
        width={590}
        height={540}
        className="pointer-events-none absolute left-0 top-0 h-auto w-[clamp(230px,34vw,520px)] opacity-[0.85]"
      />
      <DetailsImage
        src={detailsAsset("floralEdge")}
        alt=""
        width={590}
        height={540}
        className="pointer-events-none absolute bottom-0 right-0 h-auto w-[clamp(210px,32vw,480px)] opacity-70 [transform:scale(-1,-1)]"
      />

      <div className="relative mx-auto max-w-[1060px]">
        <SectionShell
          intro={intro}
          showMonogram
          monogramSrc={detailsAsset("cultureFlower")}
          className="mb-[clamp(52px,8vw,92px)]"
        />

        <div className="relative border-b border-[color:var(--d-hairline)]">
          {events.map((event) => (
            <EventRow key={event.no} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
