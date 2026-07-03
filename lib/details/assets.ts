// Asset manifest for the full-details page.
//
// Every image/icon reference on the page resolves through this map, so swapping
// final art is a one-file edit rather than a hunt through JSX (plan §2.4 / §6).
// These now point at the final art delivered from the design bundle; the couple
// portrait uses the photo the couple added directly (public/images/AD.jpeg).

export const detailsAssets = {
  monogram: "/images/details/monogram.svg", // gold A&D mark (menu overlay, events heading)
  monogramLotus: "/images/details/monogram-lotus.svg", // maroon lotus (hero divider)
  crest: "/images/monogram.webp", // ornate gold footer seal
  heroBg: "/images/landing-hero-bg.png", // hero: misted Blue Ridge ridgelines
  eventsBg: "/images/Events.png", // events: dark maroon texture
  sharedBackdrop: "/images/travelbg.webp", // paper texture behind Travel/Stay/Attire/FAQ (§2.3)
  floralEdge: "/images/floral-edge.svg", // corner floral line art (events + footer)
  hotelZelda: "/images/details/hotel-zelda.png", // Zelda Dearest storefront
  hotelMoxy: "/images/details/hotel-moxy.png", // Moxy Asheville Downtown
  couplePortrait: "/images/AD.jpeg", // Amanda & Dushyant portrait
} as const;

export type DetailsAssetKey = keyof typeof detailsAssets;

export function detailsAsset(key: DetailsAssetKey): string {
  return detailsAssets[key];
}
