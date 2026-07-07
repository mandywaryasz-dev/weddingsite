import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DetailsImage } from "@/components/details/DetailsImage";
import { RsvpButton } from "@/components/details/RsvpButton";
import { detailsAsset } from "@/lib/details/assets";
import type { FooterContent, RsvpContent } from "@/lib/details/types";

type FooterSectionProps = {
  footer: FooterContent;
  rsvp: RsvpContent;
};

/**
 * Dark editorial footer (plan §6). Deep-maroon gradient with ivory/gold ink.
 * Its palette differs from the Events dark tone, so it carries its own scoped
 * token block via [data-tone="dark-footer"] (see lib/theme/details-tokens.css)
 * — all colours below resolve through those --d-* vars.
 */
export function FooterSection({ footer, rsvp }: FooterSectionProps) {
  return (
    <footer
      data-tone="dark-footer"
      className="relative overflow-hidden px-[clamp(22px,6vw,72px)] pb-[clamp(38px,5vw,58px)] pt-[clamp(64px,9vw,110px)] text-[color:var(--d-body)]"
      style={{
        background:
          "linear-gradient(180deg,var(--d-footer-top),var(--d-footer-bottom))",
      }}
    >
      <DetailsImage
        src={detailsAsset("floralEdge")}
        alt=""
        width={590}
        height={540}
        className="pointer-events-none absolute -bottom-[16px] left-0 h-auto w-[clamp(200px,30vw,440px)] opacity-50 [transform:scaleY(-1)]"
      />
      <DetailsImage
        src={detailsAsset("floralEdge")}
        alt=""
        width={590}
        height={540}
        className="pointer-events-none absolute right-0 top-0 h-auto w-[clamp(190px,28vw,420px)] opacity-40 [transform:scaleX(-1)]"
      />

      <div className="relative mx-auto max-w-[1120px]">
        {/* masthead rule */}
        <ScrollReveal className="mb-[clamp(46px,7vw,86px)]">
          <div className="flex items-center gap-[clamp(16px,3vw,28px)]">
            <span
              aria-hidden
              className="h-px flex-1"
              style={{ background: "linear-gradient(90deg,transparent,var(--d-gold-line-mid))" }}
            />
            <span className="whitespace-nowrap font-heading tracking-[0.36em] text-[color:var(--d-gold)] text-[clamp(10px,1.4vw,12px)]">
              {footer.masthead}
            </span>
            <span
              aria-hidden
              className="h-px flex-1"
              style={{ background: "linear-gradient(90deg,var(--d-gold-line-mid),transparent)" }}
            />
          </div>
        </ScrollReveal>

        {/* editorial spread: portrait + note (stacks on mobile) */}
        <div className="mb-[clamp(56px,8vw,96px)] flex flex-wrap items-center justify-center gap-[clamp(38px,6vw,84px)]">
          <ScrollReveal className="mx-0 min-w-[266px] flex-[0_1_336px]">
            <figure className="m-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[168px_168px_12px_12px] border border-[color:var(--d-gold-line)] shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                <DetailsImage
                  src={detailsAsset("couplePortrait")}
                  alt={footer.portraitAlt}
                  fill
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 639px) 92vw, 21rem"
                  className="object-cover"
                  style={{ objectPosition: "center 22%" }}
                />
              </div>
              <figcaption className="mt-[18px] flex items-baseline gap-[12px]">
                <span className="font-body italic leading-[1.5] text-[color:var(--d-body-muted)] text-[clamp(1rem,2vw,1.12rem)]">
                  {footer.cutline}
                </span>
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal className="min-w-[290px] max-w-[520px] flex-[1_1_380px]">
            <div>
              <p className="mb-[clamp(22px,3vw,30px)] font-heading tracking-[0.3em] text-[color:var(--d-gold)] text-[clamp(10px,1.4vw,11px)]">
                {footer.eyebrow}
              </p>
              <p className="font-body font-light leading-[1.5] text-[color:var(--d-ivory)] text-[clamp(1.35rem,3.2vw,1.75rem)]">
                {footer.lead}
              </p>
              <p className="mt-[clamp(18px,2.6vw,24px)] font-body font-light leading-[1.6] text-[color:var(--d-body)] text-[clamp(1.1rem,2.4vw,1.3rem)]">
                {footer.body}
              </p>
              <p className="mt-[clamp(14px,2vw,18px)] font-body font-light leading-[1.7] text-[color:var(--d-body)] text-[clamp(1.1rem,2.4vw,1.3rem)]">
                Reach {footer.contacts[0].name} at{" "}
                <a
                  href={footer.contacts[0].href}
                  className="whitespace-nowrap border-b border-[color:var(--d-gold-line-soft)] text-[color:var(--d-gold-bright)] no-underline"
                >
                  {footer.contacts[0].display}
                </a>{" "}
                or {footer.contacts[1].name} at{" "}
                <a
                  href={footer.contacts[1].href}
                  className="whitespace-nowrap border-b border-[color:var(--d-gold-line-soft)] text-[color:var(--d-gold-bright)] no-underline"
                >
                  {footer.contacts[1].display}
                </a>
                .
              </p>

              <span
                aria-hidden
                className="my-[clamp(26px,3.4vw,34px)] mb-[clamp(16px,2vw,20px)] block h-px w-16 bg-[color:var(--d-gold-line)]"
              />

              <p className="font-body italic text-[color:var(--d-body-muted)] text-[clamp(1.15rem,2.6vw,1.4rem)]">
                {footer.signOff}
              </p>
              <p className="mt-[4px] font-heading tracking-[0.16em] text-[color:var(--d-gold)] text-[clamp(1rem,2.4vw,1.2rem)]">
                {footer.signature}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* RSVP call to action — below the names, above the crest */}
        <ScrollReveal className="mx-auto mb-[clamp(56px,8vw,88px)] text-center">
          <div className="flex justify-center">
            <RsvpButton rsvp={rsvp} tone="dark" />
          </div>
          {rsvp.note ? (
            <p className="mt-[clamp(16px,2.4vw,22px)] font-body italic text-[color:var(--d-body-muted)] text-[clamp(1rem,2vw,1.12rem)]">
              {rsvp.note}
            </p>
          ) : null}
        </ScrollReveal>

        {/* crest seal */}
        <ScrollReveal className="mx-auto mb-[clamp(48px,7vw,76px)] text-center">
          <DetailsImage
            src={detailsAsset("crest")}
            alt={footer.crestAlt}
            width={112}
            height={131}
            className="mx-auto mb-[clamp(18px,3vw,24px)] h-auto w-[clamp(84px,18vw,112px)]"
          />
          <p className="font-heading tracking-[0.28em] text-[color:var(--d-gold)] text-[clamp(10px,1.5vw,11.5px)]">
            {footer.crestNote}
          </p>
        </ScrollReveal>

        {/* colophon bar */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-[14px] border-t border-[color:var(--d-gold-line-soft)] pt-[clamp(20px,3vw,28px)]">
            <span className="font-heading tracking-[0.22em] text-[color:var(--d-body-faint)] text-[clamp(9.5px,1.3vw,11px)]">
              {footer.colophon.left}
            </span>
            <span className="min-w-[160px] flex-1 text-center font-body italic text-[color:var(--d-gold-bright)] text-[clamp(1.05rem,2vw,1.2rem)]">
              {footer.colophon.center}
            </span>
            <span className="font-heading tracking-[0.22em] text-[color:var(--d-body-faint)] text-[clamp(9.5px,1.3vw,11px)]">
              {footer.colophon.right}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
