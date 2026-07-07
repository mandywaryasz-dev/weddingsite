import { DetailsImage } from "@/components/details/DetailsImage";
import { Countdown } from "@/components/details/Countdown";
import { RsvpButton } from "@/components/details/RsvpButton";
import { ScrollCueIcon } from "@/components/icons";
import { detailsAsset } from "@/lib/details/assets";
import { daysUntil } from "@/lib/details/countdown";
import type { HeroContent, RsvpContent } from "@/lib/details/types";

type HeroSectionProps = {
  hero: HeroContent;
  rsvp: RsvpContent;
};

export function HeroSection({ hero, rsvp }: HeroSectionProps) {
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

      <div className="relative z-[2] max-w-[760px] text-center">
        {/* monogram divider — the maroon lotus mark between two gradient rules */}
        <div className="mb-[22px] flex items-center justify-center gap-4 animate-invite-rise motion-reduce:animate-none">
          <span
            aria-hidden
            className="h-px w-[clamp(34px,9vw,70px)]"
            style={{ background: "linear-gradient(90deg,transparent,rgba(122,46,52,.4))" }}
          />
          <DetailsImage
            src={detailsAsset("monogramLotus")}
            alt=""
            width={34}
            height={34}
            className="w-[34px] opacity-95"
          />
          <span
            aria-hidden
            className="h-px w-[clamp(34px,9vw,70px)]"
            style={{ background: "linear-gradient(90deg,rgba(122,46,52,.4),transparent)" }}
          />
        </div>

        <p
          className="mb-[18px] font-heading tracking-[0.34em] text-[color:var(--d-copper)] text-[clamp(10px,1.6vw,12px)] animate-invite-rise motion-reduce:animate-none"
          style={{ animationDelay: "90ms" }}
        >
          {hero.inviteEyebrow}
        </p>

        <p
          className="mb-[clamp(10px,1.6vw,14px)] font-body italic text-[color:var(--d-maroon-warm)] text-[clamp(1.05rem,3vw,1.35rem)] animate-invite-rise motion-reduce:animate-none"
          style={{ animationDelay: "160ms" }}
        >
          {hero.hostLine}
        </p>

        <h1
          className="m-0 flex flex-col items-center font-heading font-light leading-none tracking-[0.03em] text-[color:var(--d-maroon)] text-[clamp(2.9rem,11vw,6rem)] animate-invite-rise motion-reduce:animate-none"
          style={{ animationDelay: "220ms" }}
        >
          <span>{hero.firstName}</span>
          <span className="my-[clamp(4px,1vw,10px)] font-body font-medium italic leading-none text-[color:var(--d-gold)] text-[clamp(2rem,7vw,3.4rem)]">
            {hero.ampersand}
          </span>
          <span>{hero.lastName}</span>
        </h1>

        <p
          className="mt-[clamp(14px,2.4vw,20px)] font-body italic text-[color:var(--d-maroon-warm)] text-[clamp(1.1rem,3.2vw,1.45rem)] animate-invite-rise motion-reduce:animate-none"
          style={{ animationDelay: "300ms" }}
        >
          {hero.requestLine}
        </p>

        <p
          className="mt-[24px] font-body italic tracking-[0.01em] text-[color:var(--d-maroon-warm)] text-[clamp(1.25rem,4vw,1.7rem)] animate-invite-rise motion-reduce:animate-none"
          style={{ animationDelay: "380ms" }}
        >
          {hero.dateLocation}
        </p>

        <div className="animate-invite-rise motion-reduce:animate-none" style={{ animationDelay: "460ms" }}>
          <Countdown
            target={hero.countdownTarget}
            label={hero.countdownLabel}
            initialDays={initialDays}
          />
        </div>

        <div
          className="mt-[clamp(40px,7vw,60px)] flex flex-col items-center animate-invite-rise motion-reduce:animate-none"
          style={{ animationDelay: "540ms" }}
        >
          <RsvpButton rsvp={rsvp} tone="light" />
          {rsvp.note ? (
            <p className="mt-[clamp(12px,2vw,16px)] font-body italic text-[color:var(--d-body-muted)] text-[clamp(0.95rem,2vw,1.08rem)]">
              {rsvp.note}
            </p>
          ) : null}
          {/* wax-seal echo of the footer crest — bookends the lotus mark above */}
          <DetailsImage
            src={detailsAsset("crest")}
            alt=""
            width={112}
            height={131}
            className="mt-[clamp(22px,3.4vw,30px)] h-auto w-[clamp(46px,10vw,58px)] opacity-80"
          />
        </div>

        <a
          href="#events"
          className="mt-[clamp(44px,8vw,64px)] flex min-h-[var(--btn-min-h)] flex-col items-center justify-end gap-2 no-underline"
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
