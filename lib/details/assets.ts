// Asset manifest for the full-details page.
//
// Every image/icon reference on the page resolves through this map, so swapping
// final art is a one-file edit rather than a hunt through JSX (plan §2.4 / §6).
// The files under /images/details are neutral placeholders — replace the files
// (keeping the same paths) or repoint the keys below when final art lands.

export const detailsAssets = {
  monogram: "/images/details/monogram.svg", // small A&D mark (hero divider, events, faq, menu)
  crest: "/images/details/crest.svg", // footer seal
  heroBg: "/images/details/hero-bg.svg", // hero background — will change
  heroFloralCorner: "/images/details/floral.svg", // mirrored hero corner florals — will change
  eventsFloralL: "/images/details/floral.svg", // events bg motif — will change
  eventsFloralR: "/images/details/floral.svg", // events bg motif — will change
  sharedBackdrop: "/images/details/shared-backdrop.svg", // single Travel/Stay/Attire backdrop (§2.3)
  travelFloral: "/images/details/floral.svg", // travel accent — will change
  sprig: "/images/details/sprig.svg", // travel/attire small accent — will change
  stayFloral: "/images/details/sprig.svg", // stay accent — will change
  hotelZelda: "/images/details/photo-hotel-zelda.svg", // hotel card photo — will change
  hotelMoxy: "/images/details/photo-hotel-moxy.svg", // hotel card photo — will change
  couplePortrait: "/images/details/photo-portrait.svg", // footer portrait — will change
} as const;

export type DetailsAssetKey = keyof typeof detailsAssets;

export function detailsAsset(key: DetailsAssetKey): string {
  return detailsAssets[key];
}
