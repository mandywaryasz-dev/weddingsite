import { SectionShell } from "@/components/details/SectionShell";
import { FeaturedHotelSection } from "@/components/details/FeaturedHotelSection";
import { BudgetHotelsSection } from "@/components/details/BudgetHotelsSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { FeaturedHotel, BudgetHotel, SectionIntro } from "@/lib/details/types";

type StaySectionProps = {
  intro: SectionIntro;
  welcome: string;
  featuredHotel: FeaturedHotel;
  budgetHotels: BudgetHotel[];
  gettingAround: string;
};

/** Transparent — sits on the shared Travel/Stay/Attire/FAQ backdrop (plan §2.3). */
export function StaySection({
  intro,
  welcome,
  featuredHotel,
  budgetHotels,
  gettingAround,
}: StaySectionProps) {
  return (
    <section
      id="stay"
      className="relative overflow-hidden px-[clamp(20px,6vw,80px)] py-[clamp(56px,8vw,84px)]"
    >
      <div className="relative mx-auto max-w-[1080px]">
        <SectionShell intro={intro} subheadSize="lg" className="mb-[clamp(28px,4vw,40px)]" />

        <ScrollReveal>
          <p className="mx-auto mb-[clamp(40px,6vw,60px)] max-w-[38rem] text-center leading-[1.6] text-[color:var(--d-body)]">
            {welcome}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <FeaturedHotelSection hotel={featuredHotel} />
        </ScrollReveal>

        <BudgetHotelsSection hotels={budgetHotels} />

        <ScrollReveal>
          <p className="mt-[clamp(40px,6vw,56px)] font-body italic leading-[1.55] text-[color:var(--d-body-muted)] text-[1.05rem]">
            {gettingAround}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
