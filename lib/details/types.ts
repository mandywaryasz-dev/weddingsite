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
  /** Primary booking CTA. Omitted while the room-block link is temporarily down. */
  cta?: HotelCta;
  /**
   * Fallback shown in place of the CTA while there is no self-serve booking link —
   * a sentence with clickable contacts inline, so guests can reserve through the
   * hotel. `lead` precedes the contacts (joined by "or"); `trail` follows them.
   */
  bookingNote?: {
    lead: string;
    contacts: { display: string; href: string }[];
    trail: string;
  };
  /**
   * Quick room-block rate overview, surfaced via a small popover so the price
   * range and flexible dates are one tap away without cluttering the layout.
   * `lines` support lightweight `**bold**` emphasis.
   */
  roomRates?: {
    /** Trigger text, e.g. "Rates". */
    triggerLabel: string;
    /** Popover heading. */
    title: string;
    lines: string[];
  };
};

export type BudgetHotel = {
  name: string;
  href: string;
  description: string;
  /** Optional call-to-reserve phone, rendered as a `tel:` link. */
  phone?: string;
  /** Optional booking instruction shown alongside the phone (e.g. room-block note). */
  bookingNote?: string;
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

export type RsvpContent = {
  /** Button label, e.g. "RSVP". */
  label: string;
  /** External RSVP form URL — opens in a new tab. */
  href: string;
  /** Optional supporting line shown near the footer CTA. */
  note?: string;
};

export type HeroContent = {
  /** Small tracked eyebrow above the names, e.g. "YOU'RE INVITED". */
  inviteEyebrow: string;
  /** Italic host line above the names, e.g. "Together with our families,". */
  hostLine: string;
  firstName: string;
  ampersand: string;
  lastName: string;
  /** Italic invitational line below the names, completing the host line. */
  requestLine: string;
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
  rsvp: RsvpContent;
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
  };
};
