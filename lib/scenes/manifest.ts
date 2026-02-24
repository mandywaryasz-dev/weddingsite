import { SceneDefinition } from "@/lib/scenes/types";

export const sceneManifest: SceneDefinition[] = [
  {
    id: "hero",
    component: "HeroScene",
    background: {
      type: "video",
      src: "/media/hero-loop.mp4",
      poster: "/images/hero-poster.svg",
      priority: true
    },
    overlay: { intensity: "medium" },
    content: {
      eyebrow: "Save the Date",
      title: "Amanda & Dushyant",
      body: "Join us in Asheville, North Carolina as we celebrate a weekend of love, joy, and dancing.",
      accent: "October 2, 2026",
      hindiLine: "आप सभी का स्वागत है"
    }
  },
  {
    id: "story",
    component: "StoryScene",
    background: {
      type: "image",
      src: "/images/story-bg.svg"
    },
    overlay: { intensity: "light" },
    content: {
      eyebrow: "Our Story",
      title: "Two paths, one home",
      body: "From city nights to mountain mornings, this next chapter feels like every favorite moment stitched together.",
      accent: "Asheville, here we come"
    }
  },
  {
    id: "cultural",
    component: "CulturalScene",
    background: {
      type: "image",
      src: "/images/cultural-bg.svg"
    },
    overlay: { intensity: "medium" },
    content: {
      eyebrow: "Traditions",
      title: "Where families meet",
      body: "Our wedding weekend will blend meaningful rituals, heartfelt blessings, and a lot of shared laughter.",
      accent: "Color, music, and ceremony"
    }
  },
  {
    id: "reveal",
    component: "RevealScene",
    background: {
      type: "video",
      src: "/media/reveal-loop.mp4",
      poster: "/images/reveal-poster.svg"
    },
    overlay: { intensity: "heavy" },
    content: {
      eyebrow: "The Date",
      title: "Save October 2, 2026",
      body: "Plan for an unforgettable evening in Asheville. Add the date now and keep an eye out for full details in Phase 2.",
      accent: "4:00 PM to 11:00 PM ET"
    }
  },
  {
    id: "explore",
    component: "ExploreScene",
    background: {
      type: "image",
      src: "/images/explore-bg.svg"
    },
    overlay: { intensity: "light" },
    content: {
      eyebrow: "Explore",
      title: "Venue and memories",
      body: "Preview the venue and some of our favorite photos while we finalize travel and lodging details.",
      accent: "Mountains, gardens, celebration"
    }
  },
  {
    id: "party",
    component: "PartyScene",
    background: {
      type: "image",
      src: "/images/party-bg.svg"
    },
    overlay: { intensity: "medium" },
    content: {
      eyebrow: "Playlist",
      title: "Set the vibe",
      body: "Tap into our music preview and imagine the dance floor energy already building.",
      accent: "Bring your best moves"
    }
  }
];
