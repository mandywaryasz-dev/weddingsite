import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { EventItem } from "@/lib/details/types";

type EventRowProps = {
  event: EventItem;
};

/**
 * One numbered event. Mobile-first: single column with an inline number+stamp
 * above the title; at `sm` it becomes the two-column index | content grid
 * (plan §5.3 / §5.7).
 */
export function EventRow({ event }: EventRowProps) {
  return (
    <ScrollReveal className="border-t border-[color:var(--d-hairline)]">
      <div className="grid items-start gap-[clamp(12px,3vw,56px)] py-[clamp(30px,5.5vw,58px)] sm:grid-cols-[clamp(76px,15vw,148px)_1fr]">
        {/* index + stamp */}
        <div className="flex items-baseline gap-3 pt-[clamp(4px,1vw,10px)] sm:flex-col sm:items-start sm:gap-[clamp(9px,2vw,15px)]">
          <span className="font-body font-medium italic leading-[0.76] text-[color:var(--d-gold)] text-[clamp(2.4rem,8.4vw,4.8rem)]">
            {event.no}
          </span>
          <span className="whitespace-nowrap font-heading text-[clamp(9px,1.5vw,10px)] tracking-[0.2em] text-[color:var(--d-copper)]">
            {event.stamp}
          </span>
        </div>

        {/* content */}
        <div className="max-w-[600px]">
          <h3 className="mb-[clamp(12px,2vw,16px)] font-heading font-semibold leading-[1.12] tracking-[0.08em] text-[color:var(--d-maroon)] text-[clamp(1.4rem,4.6vw,2.15rem)]">
            {event.title}
          </h3>
          <p className="font-body leading-[1.62] text-[color:var(--d-body-soft)] text-[clamp(1.1rem,2.7vw,1.32rem)]">
            {event.desc}
          </p>

          <div className="mt-[clamp(20px,3.4vw,32px)]">
            {event.meta.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[clamp(62px,13vw,96px)_1fr] items-baseline gap-x-[clamp(14px,3.4vw,30px)] border-t border-[color:var(--d-hairline-soft)] py-[clamp(10px,1.5vw,13px)]"
              >
                <span className="pt-[3px] font-heading text-[10px] uppercase tracking-[0.16em] text-[color:var(--d-copper)]">
                  {row.label}
                </span>
                {row.href ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body leading-[1.4] text-[color:var(--d-body)] underline decoration-[color:var(--d-copper)] decoration-1 underline-offset-4 transition-colors hover:text-[color:var(--d-gold)] text-[clamp(1.1rem,2.5vw,1.26rem)]"
                  >
                    {row.value}
                  </a>
                ) : (
                  <span className="font-body leading-[1.4] text-[color:var(--d-body)] text-[clamp(1.1rem,2.5vw,1.26rem)]">
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
