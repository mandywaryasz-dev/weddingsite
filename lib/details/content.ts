import type { DetailsContent } from "@/lib/details/types";

// Copy source of truth: the design mockup (plan §6). Text is verbatim from the
// reference, including typographic apostrophes and em/en dashes.
//
// Explicit override (plan §6, §10): the Zelda Dearest phone number is
// (828) 514-2489 — couple-confirmed — not the mockup's 584. Applied to both the
// display string and the tel: CTA below.

export const detailsContent: DetailsContent = {
  hero: {
    firstName: "Amanda",
    ampersand: "&",
    lastName: "Dushyant",
    dateLocation: "October 2, 2026 · Asheville, North Carolina",
    countdownTarget: "2026-10-02T16:30:00-04:00",
    countdownLabel: "DAYS UNTIL WE CELEBRATE",
    scrollLabel: "SCROLL",
  },

  eventsIntro: {
    eyebrow: "OCTOBER 1–2, 2026 · ASHEVILLE, NC",
    heading: "The Events",
    subhead: "Two cultures, two families—one joyful weekend woven together in the Blue Ridge.",
  },
  events: [
    {
      no: "01",
      stamp: "THU · OCT 1",
      title: "Welcome Gathering",
      desc: "For anyone in town the night prior, please join us for a casual and joyful meal and refreshments. A relaxed evening to settle in, connect, and begin the celebrations together.",
      meta: [
        { label: "Time", value: "6:30 in the evening" },
        { label: "Place", value: "Shared with your invitation" },
      ],
    },
    {
      no: "02",
      stamp: "FRI · OCT 2",
      title: "Ceremony",
      desc: "Our ceremony will honor tradition and mark the beginning of this next chapter together.",
      meta: [
        { label: "Time", value: "4:30 in the afternoon" },
        { label: "Place", value: "Haiku, Asheville, NC" },
        { label: "Getting there", value: "Eight minutes from downtown" },
      ],
    },
    {
      no: "03",
      stamp: "FRI · OCT 2",
      title: "Reception",
      desc: "Following the ceremony, join us for drinks, dinner, and a night of celebration filled with music, movement, and joy.",
      meta: [
        { label: "Time", value: "Immediately following the ceremony" },
        { label: "Place", value: "Haiku, Asheville, NC" },
      ],
    },
    {
      no: "04",
      stamp: "FRI · OCT 2",
      title: "Late Night",
      desc: "For anyone who wants to keep the celebration going, join us after the reception for a relaxed late-night gathering.",
      meta: [
        { label: "Time", value: "10 PM and beyond" },
        { label: "Place", value: "Shared with your invitation" },
      ],
    },
  ],

  travelIntro: {
    eyebrow: "GETTING THERE",
    heading: "Travel",
    subhead: "Fly into the Blue Ridge—the mountains do the rest.",
  },
  airportsLabel: "CLOSEST AIRPORTS",
  airports: [
    { code: "AVL", name: "Asheville Regional", closest: true, detail: "8 miles · about 15 minutes to the venue." },
    { code: "GSP", name: "Greenville–Spartanburg", closest: false, detail: "95 miles · about a 1.5-hour scenic drive." },
    { code: "CLT", name: "Charlotte Douglas", closest: false, detail: "140 miles · about a 2.5-hour drive." },
  ],

  stayIntro: {
    eyebrow: "WHERE TO REST",
    heading: "Stay",
    subhead: "Two downtown blocks, saved just for you.",
  },
  hotels: [
    {
      name: "Hotel Block at Zelda Dearest",
      badge: "DOWNTOWN ASHEVILLE",
      imageKey: "hotelZelda",
      imageAlt: "Hotel block at Zelda Dearest",
      address: "150 South Lexington Ave, Asheville, NC 28801",
      phone: "(828) 514-2489",
      website: { label: "ZeldaDearest.com", href: "https://ZeldaDearest.com" },
      note: "Reserve directly with the front desk by phone, or online at the link above.",
      cta: { label: "CALL TO RESERVE YOUR STAY", href: "tel:+18285142489", external: false },
    },
    {
      name: "Moxy Asheville Downtown",
      badge: "DOWNTOWN ASHEVILLE",
      imageKey: "hotelMoxy",
      imageAlt: "Moxy Asheville Downtown",
      address: "61 Biltmore Ave, Asheville, NC 28801",
      phone: "(828) 949-0179",
      website: { label: "MoxyAshevilleDowntown.com", href: "https://MoxyAshevilleDowntown.com" },
      note: "Book online at the link above, or call the front desk to reserve.",
      cta: { label: "RESERVE YOUR STAY", href: "https://MoxyAshevilleDowntown.com", external: true },
    },
  ],

  attireIntro: {
    eyebrow: "DRESS CODE",
    heading: "Attire",
  },
  attire: {
    flourish: "Formal",
    intro: "Dress to celebrate—in whichever tradition feels like you. Both are warmly welcomed, and equally at home.",
    columns: [
      {
        label: "WESTERN FORMAL",
        body: "Suits and ties; cocktail or floor-length dresses. Jewel tones and warm autumn hues feel right at home.",
      },
      {
        label: "INDIAN FORMAL",
        body: "Lehengas, sarees, sherwanis, kurtas—the celebration in full color. Wear it proudly.",
      },
    ],
    eveningNote: "Evenings turn cool in the mountains—a wrap or layer for after dark is never a bad idea.",
  },

  faqIntro: {
    eyebrow: "",
    heading: "FAQ",
  },
  faqGroups: [
    {
      label: "RSVP & GUESTS",
      items: [
        {
          q: "When should I RSVP?",
          a: "Formal invitations will arrive later this year with everything you need to reply. We’ll ask you to respond as early as you’re able so we can plan a joyful celebration for everyone.",
        },
        {
          q: "Can I bring a plus-one?",
          a: "If your invitation includes a plus-one, it will be named on your RSVP. If you’re unsure, just reach out and we’ll happily confirm.",
        },
        {
          q: "Are children invited?",
          a: "We adore your little ones — any details about children will come with your formal invitation. Please don’t hesitate to ask in the meantime.",
        },
        {
          q: "Can I bring a gift?",
          a: "Your presence is the greatest gift.",
        },
      ],
    },
    {
      label: "STAY & DAY-OF",
      items: [
        {
          q: "Where should I stay?",
          a: "We’ve held room blocks at Zelda Dearest and Moxy Asheville Downtown — both downtown and minutes from the celebration. See the Stay section above to book.",
        },
        {
          q: "What will the weather be like?",
          a: "Early October in Asheville is crisp and golden — typically 60–75°F by day and cooler in the evening. We’d suggest a layer for the night air.",
        },
        {
          q: "Will transportation be provided?",
          a: "We’re arranging rides between the downtown hotels and the venue. Details will be shared closer to the wedding.",
        },
      ],
    },
  ],

  footer: {
    masthead: "UNTIL WE GATHER",
    portraitAlt: "Amanda and Dushyant",
    cutline: "The two of us, all dressed up with somewhere to be",
    eyebrow: "ANYTHING AT ALL",
    lead: "Thank you for making the trip to celebrate with us — we’ll save you a place on the dance floor.",
    body: "Until then, whatever you’re wondering — travel, timing, what to wear — we’re only ever a call or text away.",
    contacts: [
      { name: "Mandy", display: "(603) 440-9249", href: "tel:+16034409249" },
      { name: "Dushyant", display: "(216) 269-4967", href: "tel:+12162694967" },
    ],
    signOff: "With love,",
    signature: "AMANDA & DUSHYANT",
    crestAlt: "Amanda & Dushyant crest",
    crestNote: "RSVP DETAILS COMING SOON",
    colophon: {
      left: "ASHEVILLE, NORTH CAROLINA",
      center: "meetusinasheville.com",
      right: "OCTOBER 2, 2026",
    },
  },

  menu: {
    links: [
      { label: "The Events", href: "#events" },
      { label: "Travel", href: "#travel" },
      { label: "Stay", href: "#stay" },
      { label: "Attire", href: "#attire" },
      { label: "FAQ", href: "#faq" },
    ],
    email: { label: "HELLO@MEETUSINASHEVILLE.COM", href: "mailto:hello@meetusinasheville.com" },
  },
};
