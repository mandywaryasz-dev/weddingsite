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
      className="relative overflow-hidden bg-[image:var(--d-grad-events)] px-[clamp(20px,6vw,80px)] py-[clamp(74px,11vw,128px)] text-[color:var(--d-body)]"
    >
      <DetailsImage
        src={detailsAsset("eventsFloralL")}
        alt=""
        width={460}
        height={460}
        className="pointer-events-none absolute -left-[60px] top-10 hidden w-[clamp(220px,32vw,460px)] opacity-[0.14] sm:block"
      />
      <DetailsImage
        src={detailsAsset("eventsFloralR")}
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -right-[50px] bottom-8 hidden w-[clamp(200px,30vw,420px)] -scale-x-100 opacity-[0.12] sm:block"
      />

      <div className="relative mx-auto max-w-[1060px]">
        <SectionShell
          intro={intro}
          showMonogram
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
