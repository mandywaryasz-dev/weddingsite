import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaqItem } from "@/components/details/FaqItem";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";
import type { FaqGroup, SectionIntro } from "@/lib/details/types";

type FaqSectionProps = {
  intro: SectionIntro;
  groups: FaqGroup[];
};

export function FaqSection({ intro, groups }: FaqSectionProps) {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[image:var(--d-grad-faq)] px-[clamp(20px,6vw,80px)] py-[clamp(74px,11vw,130px)] text-[color:var(--d-body)]"
    >
      <DetailsImage
        src={detailsAsset("eventsFloralR")}
        alt=""
        width={400}
        height={400}
        className="pointer-events-none absolute -right-[50px] top-10 hidden w-[clamp(200px,28vw,400px)] opacity-[0.12] sm:block"
      />

      <div className="relative mx-auto max-w-[1000px]">
        <ScrollReveal className="mb-[clamp(44px,6vw,64px)] text-center">
          <DetailsImage
            src={detailsAsset("monogram")}
            alt=""
            width={40}
            height={40}
            className="mx-auto mb-[14px] w-10 opacity-90"
          />
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
