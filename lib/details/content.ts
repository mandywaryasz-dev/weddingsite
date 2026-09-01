import type { DetailsContent } from "@/lib/details/types";

// Copy source of truth: the design mockup (plan §6). Text is verbatim from the
// reference, including typographic apostrophes and em/en dashes.
//
// Explicit override (plan §6, §10): the Zelda Dearest phone number is
// (828) 514-2489 — couple-confirmed — not the mockup's 584. Applied to both the
// display string and the tel: CTA below.

export const detailsContent: DetailsContent = {
  hero: {
    inviteEyebrow: "YOU'RE INVITED",
    hostLine: "Together with our families,",
    firstName: "Dushyant",
    ampersand: "&",
    lastName: "Amanda",
    requestLine: "we invite you to celebrate our wedding.",
    dateLocation: "October 2, 2026 · Asheville, North Carolina",
    countdownTarget: "2026-10-02T16:30:00-04:00",
    countdownLabel: "DAYS UNTIL WE CELEBRATE",
    scrollLabel: "SCROLL",
  },

  rsvp: {
    label: "RSVP",
    href: "https://partiful.com/e/a5r5tyTKP5tjmxja9WQd?c=bIdj0Phr",
    note: "Kindly respond by Friday, September 11.",
  },

  // The events header is just the monogram + title in the mockup — no eyebrow
  // or subhead (plan §6).
  eventsIntro: {
    eyebrow: "",
    heading: "The Events",
  },
  events: [
    {
      no: "01",
      stamp: "THU · OCT 1",
      title: "Welcome Gathering",
      desc: "If you're in town the night before, we'd love for you to drift in for a casual, come-as-you-are meal. A relaxed evening to settle in and reconnect before the weekend begins. Entirely optional, so no need to plan around it.",
      meta: [
        { label: "Time", value: "6:30 in the evening" },
        {
          label: "Place",
          value: "The Blank Space AVL, 701 Haywood Rd, Asheville, NC 28806",
          href: "https://maps.app.goo.gl/hr2ifr9c8qXAQTdF6",
        },
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
        { label: "Place", value: "Radical Rooftop" },
      ],
    },
  ],

  travelIntro: {
    eyebrow: "GETTING THERE",
    heading: "Travel",
    subhead: "Fly into the Blue Ridge,\nthe mountains do the rest.",
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
  },
  stayWelcome:
    "We're so happy you'll be joining us in Asheville. Book anywhere you like, but here are a few places we love.",
  featuredHotel: {
    eyebrow: "OUR HOTEL",
    name: "The Radical Asheville",
    location: "River Arts District, Asheville",
    imageKey: "hotelRadical",
    imageAlt: "The color-filled lobby lounge at The Radical Asheville",
    body: "This is where we'll be staying, and where the after-party will be, right up on the rooftop. We fell for the setting: a 1920s factory turned hotel in the River Arts District, full of color and character, and just a few minutes from downtown. Our room-block dates are flexible, so book the nights that suit you, whether you head home Saturday or linger through Sunday.",
    phone: "(828) 412-0200",
    website: { label: "TheRadicalAVL.com", href: "https://www.theradicalavl.com/" },
    // There is no self-serve room-block link; guests book directly through the
    // hotel's coordinator (below), mentioning the Waryasz Wedding room block.
    bookingNote: {
      lead: "To reserve, just reach out to Andrea Batt at The Radical —",
      contacts: [
        { display: "andrea@theradicalavl.com", href: "mailto:andrea@theradicalavl.com" },
        { display: "828.412.0200", href: "tel:+18284120200" },
      ],
      trail:
        "— and mention the Waryasz Wedding room block. She'll take care of the rest.",
    },
    roomRates: {
      triggerLabel: "Rates",
      title: "Room block rates",
      lines: [
        "Rooms run **$322–$367 a night**, depending on the room type.",
        "Dates are flexible — book any nights from **Wednesday, Sept 30** through **Sunday, Oct 4**.",
      ],
    },
  },
  budgetHotels: [
    {
      name: "Zelda Dearest",
      href: "https://www.zeldadearest.com/",
      description: "If you'd rather be walkable and right downtown, this boutique stay is a lovely pick.",
      phone: "(828) 514-2489",
      bookingNote: "Call the front desk to reserve under the Amanda & Dushyant block:",
    },
    {
      name: "Clarion Pointe Biltmore Village",
      href: "https://www.choicehotels.com/north-carolina/asheville/clarion-hotels/nc598",
      description: "Basic but clean, free breakfast, outdoor pool.",
    },
    {
      name: "Baymont by Wyndham, Biltmore Village",
      href: "https://www.wyndhamhotels.com/baymont/asheville-north-carolina/baymont-asheville-biltmore/overview",
      description: "Indoor pool and hot tub, free hot breakfast.",
    },
    {
      name: "Lantern Lodge",
      href: "https://www.tripadvisor.com/Hotel_Review-g60742-d652687-Reviews-Lantern_Lodge_700_Biltmore_Avenue-Asheville_North_Carolina.html",
      description: "All-suite with full kitchens, closest of this group to downtown.",
    },
    {
      name: "Home2 Suites by Hilton, Biltmore Village",
      href: "https://www.hilton.com/en/hotels/avlvlht-home2-suites-asheville-biltmore-village/",
      description: "All-suite with kitchenettes, pet-friendly, free breakfast.",
    },
  ],
  stayGettingAround: "",

  attireIntro: {
    eyebrow: "DRESS CODE",
    heading: "Attire",
  },
  attire: {
    flourish: "Formal",
    intro: "Dress to celebrate, in whichever tradition feels like you. Both are warmly welcomed, and equally at home.",
    columns: [
      {
        label: "WESTERN FORMAL",
        body: "Suits and ties; cocktail or floor-length dresses.",
      },
      {
        label: "INDIAN FORMAL",
        body: "Lehengas, sarees, sherwanis, kurtas, the celebration in full color.",
      },
    ],
    eveningNote: "Evenings turn cool in the mountains, and a wrap or layer for after dark is never a bad idea.",
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
          a: "Please RSVP by Friday, September 11, 2026 using the RSVP button on this page. That gives us time to finalize counts with our venue and caterer. If your plans change after you reply, just let us know as soon as you can.",
        },
        {
          q: "Can I bring a plus-one?",
          a: "Yes! You’re welcome to bring a guest.",
        },
        {
          q: "Are children invited?",
          a: "Yes, children are absolutely invited! We can’t wait to see the little ones on the dance floor, and there may just be a few pint-sized surprises in store for them.",
        },
        {
          q: "Can I bring a gift?",
          a: "Your presence is the greatest gift. We’ll gladly take your best wishes and blessings, but **we will not be accepting any gifts.** Just bring yourself and your family, ready to enjoy a great party. :)",
        },
      ],
    },
    {
      label: "STAY & DAY-OF",
      items: [
        {
          q: "Where should I stay?",
          a: "We’ll be at The Radical in the River Arts District, where the after-party will be, so ask about our room block when you book. We’ve also gathered a few comfortable, budget-friendly options in nearby Biltmore Village. See the Stay section above for all the details.",
        },
        {
          q: "What will the weather be like?",
          a: "Early October in Asheville is crisp and golden, typically 60–75°F by day and cooler in the evening. We’d suggest a layer for the night air.",
        },
        {
          q: "Is there parking?",
          a: "Yes. Cars can be left at the venue overnight, free of charge.",
        },
      ],
    },
  ],

  footer: {
    masthead: "UNTIL WE GATHER",
    portraitAlt: "Amanda and Dushyant",
    cutline: "The two of us, all dressed up with somewhere to be",
    eyebrow: "ANYTHING AT ALL",
    lead: "Thank you for making the trip to celebrate with us. We’ll save you a place on the dance floor.",
    body: "Until then, whatever you’re wondering (travel, timing, what to wear) we’re only ever a call or text away.",
    contacts: [
      { name: "Mandy", display: "(603) 440-9249", href: "tel:+16034409249" },
      { name: "Dushyant", display: "(216) 269-4967", href: "tel:+12162694967" },
    ],
    signOff: "With love,",
    signature: "DUSHYANT & AMANDA",
    crestAlt: "Amanda & Dushyant crest",
    crestNote: "SEE YOU IN ASHEVILLE",
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
  },
};
