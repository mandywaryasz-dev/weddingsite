import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Attire, SectionIntro } from "@/lib/details/types";

type AttireSectionProps = {
  intro: SectionIntro;
  attire: Attire;
};

/** Transparent — sits on the shared Travel/Stay/Attire/FAQ backdrop (plan §2.3). */
export function AttireSection({ intro, attire }: AttireSectionProps) {
  return (
    <section
      id="attire"
      className="relative overflow-hidden px-[clamp(22px,6vw,80px)] pb-[clamp(80px,10vw,116px)] pt-[clamp(56px,8vw,84px)]"
    >
      <div className="relative mx-auto max-w-[760px] text-center">
        <ScrollReveal>
          <p className="font-heading text-[11px] uppercase tracking-[0.34em] text-[color:var(--d-copper)]">
            {intro.eyebrow}
          </p>
          <h2 className="mt-[18px] font-heading font-semibold tracking-[0.09em] text-[color:var(--d-maroon)] text-[clamp(2rem,6.5vw,3.4rem)]">
            {intro.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto mt-[clamp(26px,4vw,36px)] inline-flex items-center gap-[14px]">
            <span
              aria-hidden
              className="h-px w-[clamp(28px,7vw,54px)]"
              style={{ background: "linear-gradient(90deg,transparent,rgba(199,164,93,.7))" }}
            />
            <span className="font-body italic leading-none text-[color:var(--d-maroon-warm)] text-[clamp(2rem,6.4vw,3rem)]">
              {attire.flourish}
            </span>
            <span
              aria-hidden
              className="h-px w-[clamp(28px,7vw,54px)]"
              style={{ background: "linear-gradient(90deg,rgba(199,164,93,.7),transparent)" }}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mx-auto mt-[clamp(20px,3vw,28px)] max-w-[30rem] leading-[1.6] text-[color:var(--d-body-soft)] text-[clamp(1.08rem,2.6vw,1.24rem)]">
            {attire.intro}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-[clamp(46px,7vw,70px)] flex flex-col items-stretch justify-center gap-[clamp(26px,5vw,56px)] text-center sm:flex-row">
            <div className="mx-auto min-w-[230px] max-w-[300px] flex-1">
              <div className="mb-[14px] font-heading text-[11px] tracking-[0.2em] text-[color:var(--d-terracotta)]">
                {attire.columns[0].label}
              </div>
              <p className="leading-[1.6] text-[color:var(--d-body-soft)] text-[clamp(1.06rem,2.5vw,1.18rem)]">
                {attire.columns[0].body}
              </p>
            </div>

            {/* divider: horizontal rule on mobile, vertical gold line at sm+ */}
            <div
              aria-hidden
              className="mx-auto h-px w-3/4 self-center sm:h-auto sm:w-px sm:self-stretch"
              style={{ background: "linear-gradient(180deg,transparent,rgba(199,164,93,.6),transparent)" }}
            />

            <div className="mx-auto min-w-[230px] max-w-[300px] flex-1">
              <div className="mb-[14px] font-heading text-[11px] tracking-[0.2em] text-[color:var(--d-terracotta)]">
                {attire.columns[1].label}
              </div>
              <p className="leading-[1.6] text-[color:var(--d-body-soft)] text-[clamp(1.06rem,2.5vw,1.18rem)]">
                {attire.columns[1].body}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mx-auto mt-[clamp(42px,6vw,58px)] max-w-[26rem] font-body italic leading-[1.55] text-[color:var(--d-body-muted)] text-[clamp(1.05rem,2.4vw,1.2rem)]">
            {attire.eveningNote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
