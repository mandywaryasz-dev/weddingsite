import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";
import type { SectionIntro } from "@/lib/details/types";

type SectionShellProps = {
  intro: SectionIntro;
  /** Show the A&D monogram above the eyebrow (Events, FAQ). */
  showMonogram?: boolean;
  /** Larger lyrical subhead (Travel, Stay) vs. the smaller Events subhead. */
  subheadSize?: "sm" | "lg";
  className?: string;
};

/**
 * Centered eyebrow / heading / subhead scaffold shared by every section,
 * wrapped in the repo's existing ScrollReveal (replaces the mockup's
 * data-reveal mechanism).
 */
export function SectionShell({
  intro,
  showMonogram = false,
  subheadSize = "sm",
  className,
}: SectionShellProps) {
  return (
    <ScrollReveal className={className}>
      <div className="text-center">
        {showMonogram ? (
          <DetailsImage
            src={detailsAsset("monogram")}
            alt=""
            width={42}
            height={42}
            className="mx-auto mb-4 w-[clamp(2.25rem,6vw,2.625rem)] opacity-90"
          />
        ) : null}

        {intro.eyebrow ? (
          <p className="font-heading text-[11px] uppercase tracking-[0.34em] text-[color:var(--d-copper)]">
            {intro.eyebrow}
          </p>
        ) : null}

        <h2 className="mt-4 font-heading font-semibold tracking-[0.1em] text-[color:var(--d-maroon)] text-[clamp(2rem,6.5vw,3.4rem)]">
          {intro.heading}
        </h2>

        {intro.subhead ? (
          <p
            className={
              subheadSize === "lg"
                ? "mx-auto mt-[clamp(1.75rem,4vw,2.5rem)] max-w-[22rem] whitespace-pre-line font-body italic leading-[1.3] text-[color:var(--d-maroon-warm)] text-[clamp(1.6rem,5.2vw,2.4rem)]"
                : "mx-auto mt-4 max-w-[30rem] font-body italic leading-[1.5] text-[color:var(--d-maroon-warm)] text-[clamp(1.1rem,3vw,1.35rem)]"
            }
          >
            {intro.subhead}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}
