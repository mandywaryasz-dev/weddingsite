// Types for the full-details page content model.
// All copy and structured data lives in `content.ts`; art paths live in `assets.ts`.

export type MetaRow = {
  label: string;
  value: string;
};

export type EventItem = {
  /** Two-digit ordinal, e.g. "01". */
  no: string;
  /** Day stamp, e.g. "THU · OCT 1". */
  stamp: string;
  title: string;
  desc: string;
  meta: MetaRow[];
};

export type Airport = {
  /** IATA code, e.g. "AVL". */
  code: string;
  name: string;
  /** Marks the nearest airport with a badge. */
  closest: boolean;
  detail: string;
};

export type HotelCta = {
  label: string;
  href: string;
  /** External links open in a new tab; `tel:` links do not. */
  external: boolean;
};

export type FeaturedHotel = {
  /** Small eyebrow that signals this is the primary pick, e.g. "OUR HOTEL". */
  eyebrow: string;
  name: string;
  /** Quiet location line, shown with a map pin in the contact block. */
  location: string;
  /** Semantic asset key resolved through `assets.ts`. */
  imageKey: string;
  imageAlt: string;
  /** Narrative copy about the stay. */
  body: string;
  phone: string;
  website: {
    label: string;
    href: string;
  };
  cta: HotelCta;
  /** Personal sign-off under the CTA, e.g. "Amanda & Dushyant". */
  signature: string;
};

export type BudgetHotel = {
  name: string;
  href: string;
  description: string;
};

export type AttireColumn = {
  label: string;
  body: string;
};

export type Attire = {
  flourish: string;
  intro: string;
  columns: AttireColumn[];
  eveningNote: string;
};

export type FaqQa = {
  q: string;
  a: string;
};

export type FaqGroup = {
  label: string;
  items: FaqQa[];
};

export type SectionIntro = {
  eyebrow: string;
  heading: string;
  subhead?: string;
};

export type HeroContent = {
  firstName: string;
  ampersand: string;
  lastName: string;
  dateLocation: string;
  /** ISO string with offset — the moment we are counting down to. */
  countdownTarget: string;
  countdownLabel: string;
  scrollLabel: string;
};

export type FooterContent = {
  masthead: string;
  portraitAlt: string;
  cutline: string;
  eyebrow: string;
  lead: string;
  body: string;
  /** Contacts rendered as `tel:` links inside the note. */
  contacts: { name: string; display: string; href: string }[];
  signOff: string;
  signature: string;
  crestAlt: string;
  crestNote: string;
  colophon: { left: string; center: string; right: string };
};

export type DetailsContent = {
  hero: HeroContent;
  eventsIntro: SectionIntro;
  events: EventItem[];
  travelIntro: SectionIntro;
  airportsLabel: string;
  airports: Airport[];
  stayIntro: SectionIntro;
  /** Warm framing paragraph under the heading (body copy, not the lyrical subhead). */
  stayWelcome: string;
  featuredHotel: FeaturedHotel;
  budgetHotels: BudgetHotel[];
  /** Closing "getting around" line under the lodging list. */
  stayGettingAround: string;
  attireIntro: SectionIntro;
  attire: Attire;
  faqIntro: SectionIntro;
  faqGroups: FaqGroup[];
  footer: FooterContent;
  menu: {
    links: { label: string; href: string }[];
    email: { label: string; href: string };
  };
};
