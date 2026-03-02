import { SceneDefinition } from "@/lib/scenes/types";

export const sceneManifest: SceneDefinition[] = [
  {
    id: "hero",
    component: "HeroScene",
    background: {
      type: "video",
      src: "/media/hero-loop.mp4",
      sourceType: "video/mp4",
      fallbackSrc: "/media/hero-loop.webm",
      fallbackSourceType: "video/webm",
      poster: "/images/hero-poster.png",
      priority: true
    },
    overlay: { intensity: "medium" },
    content: {
      title: "In the Blue Ridge Mountains...",
      subtitle: "under an open sky...",
      body: "a new story begins.",
      accent: "October 2, 2026",
      secondaryBody: "Asheville, North Carolina"
    }
  },
  {
    id: "cultural",
    component: "CulturalScene",
    background: {
      type: "image",
      src: "/images/cultural-bg.png"
    },
    overlay: { intensity: "medium" },
    content: {
      title: "Two cultures.",
      subtitle: "Two paths.",
      body: "One promise.",
      accent: "In every way that matters,",
      secondaryBody: "Let us walk together.",
      hindiLine: "ये सफर अब दोनों का। साथ, अब सदा।"
    }
  },
  {
    id: "reveal",
    component: "RevealScene",
    background: {
      type: "image",
      src: "/images/bg-landscape.png"
    },
    overlay: { intensity: "medium" },
    content: {
      title: "Save the Date",
      subtitle: "Amanda Wargo & Dushyant Verma",
      body: "Asheville, North Carolina",
      accent: "October 2, 2026",
      ctaLabel: "Add to Calendar"
    }
  },
  {
    id: "party",
    component: "PartyScene",
    background: {
      type: "image",
      src: "/images/party-bg.png"
    },
    overlay: { intensity: "medium" },
    content: {
      title: "And when the sun sets...",
      subtitle: "the celebration begins.",
      body: "We'll save you a place on the dance floor."
    }
  },
  {
    id: "explore",
    component: "ExploreScene",
    background: {
      type: "image",
      src: "/images/explore-bg.png"
    },
    overlay: { intensity: "light" },
    content: {
      title: "Explore the Celebration",
      subtitle: "Looking forward to celebrating with you!",
      body: "More details to come."
    }
  }
];
