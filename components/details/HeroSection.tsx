import { DetailsImage } from "@/components/details/DetailsImage";
import { Countdown } from "@/components/details/Countdown";
import { ScrollCueIcon } from "@/components/icons";
import { detailsAsset } from "@/lib/details/assets";
import { daysUntil } from "@/lib/details/countdown";
import type { HeroContent } from "@/lib/details/types";

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  // Server-computed initial value → flash-free first paint (plan §5.2).
  const initialDays = daysUntil(hero.countdownTarget);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[color:var(--d-hero-blush)] px-[clamp(22px,6vw,60px)] pb-[90px] pt-[120px]"
    >
      <DetailsImage
        src={detailsAsset("heroBg")}
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* bottom fade to seat the blush */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(245,222,214,0) 52%,rgba(245,222,214,.8) 90%,#F5DED6 100%)",
        }}
      />

      {/* corner florals — decorative; hidden on the smallest screens to avoid crowding text */}
      <DetailsImage
        src={detailsAsset("heroFloralCorner")}
        alt=""
        width={400}
        height={400}
        className="pointer-events-none absolute -bottom-[18px] -left-[26px] hidden w-[clamp(170px,30vw,400px)] origin-bottom-left animate-ad-sway opacity-50 motion-reduce:animate-none sm:block"
      />
      <DetailsImage
        src={detailsAsset("heroFloralCorner")}
        alt=""
        width={400}
        height={400}
        className="pointer-events-none absolute -bottom-[18px] -right-[26px] hidden w-[clamp(170px,30vw,400px)] origin-bottom-right animate-ad-sway-r opacity-50 motion-reduce:animate-none sm:block"
      />

      <div className="relative z-[2] max-w-[760px] text-center">
        {/* monogram divider */}
        <div className="mb-[26px] flex items-center justify-center gap-4">
          <span
            aria-hidden
            className="h-px w-[clamp(34px,9vw,70px)]"
            style={{ background: "linear-gradient(90deg,transparent,rgba(122,46,52,.4))" }}
          />
          <DetailsImage
            src={detailsAsset("monogram")}
            alt=""
            width={26}
            height={26}
            className="w-[26px] opacity-95"
          />
          <span
            aria-hidden
            className="h-px w-[clamp(34px,9vw,70px)]"
            style={{ background: "linear-gradient(90deg,rgba(122,46,52,.4),transparent)" }}
          />
        </div>

        <h1 className="m-0 flex flex-col items-center font-heading font-light leading-none tracking-[0.03em] text-[color:var(--d-maroon)] text-[clamp(2.9rem,11vw,6rem)]">
          <span>{hero.firstName}</span>
          <span className="my-[clamp(4px,1vw,10px)] font-body font-medium italic leading-none text-[color:var(--d-gold)] text-[clamp(2rem,7vw,3.4rem)]">
            {hero.ampersand}
          </span>
          <span>{hero.lastName}</span>
        </h1>

        <p className="mt-[28px] font-body italic tracking-[0.01em] text-[color:var(--d-maroon-warm)] text-[clamp(1.25rem,4vw,1.7rem)]">
          {hero.dateLocation}
        </p>

        <Countdown
          target={hero.countdownTarget}
          label={hero.countdownLabel}
          initialDays={initialDays}
        />

        <a
          href="#events"
          className="mt-[26px] flex min-h-[var(--btn-min-h)] flex-col items-center justify-end gap-2 no-underline"
        >
          <span className="font-heading text-[10px] tracking-[0.22em] text-[color:var(--d-scroll-cue)]">
            {hero.scrollLabel}
          </span>
          <ScrollCueIcon className="animate-ad-bob motion-reduce:animate-none" />
        </a>
      </div>
    </section>
  );
}
