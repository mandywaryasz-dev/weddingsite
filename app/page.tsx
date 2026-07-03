import "@/lib/theme/details-tokens.css";

import { DetailsChrome } from "@/components/details/DetailsChrome";
import { HeroSection } from "@/components/details/HeroSection";
import { EventsSection } from "@/components/details/EventsSection";
import { SharedBackdropGroup } from "@/components/details/SharedBackdropGroup";
import { SectionDivider } from "@/components/details/SectionDivider";
import { TravelSection } from "@/components/details/TravelSection";
import { StaySection } from "@/components/details/StaySection";
import { AttireSection } from "@/components/details/AttireSection";
import { FaqSection } from "@/components/details/FaqSection";
import { FooterSection } from "@/components/details/FooterSection";
import { detailsContent } from "@/lib/details/content";

// The full weekend-details page. This is the home route `/` (plan §2.1);
// `/save-the-date` remains the standalone cinematic experience.
export default function HomePage() {
  const c = detailsContent;

  return (
    <div data-theme="details" className="relative w-full overflow-x-hidden">
      <DetailsChrome menu={c.menu} />

      <main>
        <HeroSection hero={c.hero} />

        <EventsSection intro={c.eventsIntro} events={c.events} />

        {/* Travel + Stay + Attire + FAQ share one paper backdrop, separated by
            gold-dot dividers (plan §2.3) */}
        <SharedBackdropGroup>
          <TravelSection
            intro={c.travelIntro}
            airportsLabel={c.airportsLabel}
            airports={c.airports}
          />
          <SectionDivider />
          <StaySection intro={c.stayIntro} hotels={c.hotels} />
          <SectionDivider />
          <AttireSection intro={c.attireIntro} attire={c.attire} />
          <SectionDivider />
          <FaqSection intro={c.faqIntro} groups={c.faqGroups} />
        </SharedBackdropGroup>
      </main>

      <FooterSection footer={c.footer} />
    </div>
  );
}
