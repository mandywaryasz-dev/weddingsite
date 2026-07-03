import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaqItem } from "@/components/details/FaqItem";
import type { FaqGroup, SectionIntro } from "@/lib/details/types";

type FaqSectionProps = {
  intro: SectionIntro;
  groups: FaqGroup[];
};

/** Transparent — sits on the shared Travel/Stay/Attire/FAQ backdrop (plan §2.3). */
export function FaqSection({ intro, groups }: FaqSectionProps) {
  return (
    <section
      id="faq"
      className="relative overflow-hidden px-[clamp(20px,6vw,80px)] pb-[clamp(96px,13vw,168px)] pt-[clamp(56px,8vw,84px)] text-[color:var(--d-body)]"
    >
      <div className="relative mx-auto max-w-[1000px]">
        <ScrollReveal className="mb-[clamp(44px,6vw,64px)] text-center">
          <h2 className="font-heading font-semibold tracking-[0.14em] text-[color:var(--d-maroon)] text-[clamp(2rem,6.5vw,3.4rem)]">
            {intro.heading}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-[clamp(30px,5vw,64px)] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {groups.map((group) => (
            <ScrollReveal key={group.label}>
              <div className="mb-[6px] flex items-center gap-[12px]">
                <span className="font-heading text-[11px] tracking-[0.24em] text-[color:var(--d-copper)]">
                  {group.label}
                </span>
                <span aria-hidden className="h-px flex-1 bg-[color:var(--d-hairline)]" />
              </div>
              {group.items.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
