import "@/lib/theme/details-tokens.css";

import { DetailsChrome } from "@/components/details/DetailsChrome";
import { HeroSection } from "@/components/details/HeroSection";
import { EventsSection } from "@/components/details/EventsSection";
import { SharedBackdropGroup } from "@/components/details/SharedBackdropGroup";
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

        {/* Travel + Stay + Attire share a single backdrop (plan §2.3) */}
        <SharedBackdropGroup>
          <TravelSection
            intro={c.travelIntro}
            airportsLabel={c.airportsLabel}
            airports={c.airports}
          />
          <StaySection intro={c.stayIntro} hotels={c.hotels} />
          <AttireSection intro={c.attireIntro} attire={c.attire} />
        </SharedBackdropGroup>

        <FaqSection intro={c.faqIntro} groups={c.faqGroups} />
      </main>

      <FooterSection footer={c.footer} />
    </div>
  );
}
