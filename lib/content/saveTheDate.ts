import type { SaveTheDateContent } from "@/lib/content/types";

export const saveTheDateContent: SaveTheDateContent = {
  scenes: {
    hero: {
      introLines: ["In the Blue Ridge Mountains…", "under an open sky…", "a new story begins."],
      detailLines: ["October 2, 2026", "Asheville, North Carolina"]
    },
    cultural: {
      introLines: ["Two cultures.", "Two paths.", "One promise."],
      bodyLines: ["I am yours. You are mine.", "Let us walk together."],
      hindiLine: "मैं तुम्हारा हूँ। तुम मेरी हो। आओ, साथ चलें।"
    },
    reveal: {
      title: "Save the Date",
      namesLine: "Amanda Waryasz & Dushyant Verma",
      detailLines: ["October 2, 2026", "Asheville, North Carolina"],
      ctaLabel: "Add to Calendar"
    },
    story: {
      introLines: ["And when the sun sets…", "the celebration begins."],
      bodyLines: ["We'll save you a place on the", "dance floor."]
    },
    explore: {
      title: "Explore the Celebration",
      buttons: [
        { label: "The Venue", modalId: "venue" },
        { label: "Our Story", modalId: "story" },
        { label: "The Party", modalId: "party" }
      ]
    },
    party: {
      closingLine: "Looking forward to celebrating with you!",
      subLine: "More details to come."
    }
  },
  backgrounds: {
    landscapePrimary: {
      type: "image",
      src: "/images/bg-landscape.png",
      priority: true
    },
    landscapeSecondary: {
      type: "image",
      src: "/images/bg-landscape.png"
    },
    redPrimary: {
      type: "image",
      src: "/images/bg-red.png"
    },
    redSecondary: {
      type: "image",
      src: "/images/bg-red.png"
    },
    bottomPrimary: {
      type: "image",
      src: "/images/bg-bottom.png"
    },
    bottomSecondary: {
      type: "image",
      src: "/images/bg-bottom.png"
    }
  },
  modals: {
    venue: {
      title: "The Venue",
      description: "A mountain-view celebration in Asheville, North Carolina.",
      bodyLines: [
        "Ceremony and celebration details are being finalized.",
        "Think warm lights, mountain air, and an unforgettable evening."
      ],
      heroImageSrc: "/images/venue-photo.png",
      heroImageAlt: "Wedding venue preview in Asheville",
      gallery: [
        { src: "/images/venue-1.svg", alt: "Venue mood board texture one" },
        { src: "/images/venue-2.svg", alt: "Venue mood board texture two" },
        { src: "/images/venue-3.svg", alt: "Venue mood board texture three" },
        { src: "/images/venue-4.svg", alt: "Venue mood board texture four" }
      ]
    },
    story: {
      title: "Our Story",
      description: "A few lines from this chapter, with photo moments coming soon.",
      bodyLines: [
        "From city nights to mountain mornings, this journey keeps unfolding in beautiful ways.",
        "We'll add our favorite photos here very soon."
      ],
      placeholders: [
        { key: "moment-1", label: "Photo Moment 01", caption: "First look memory" },
        { key: "moment-2", label: "Photo Moment 02", caption: "Travel memory" },
        { key: "moment-3", label: "Photo Moment 03", caption: "Celebration memory" }
      ]
    },
    party: {
      title: "The Party",
      description: "When the sun sets, the celebration begins.",
      bodyLines: [
        "We'll save you a place on the dance floor.",
        "Play the preview track to feel the energy."
      ],
      audioSrc: "/audio/music-preview.mp3"
    }
  }
};
