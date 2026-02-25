# Amanda & Dushyant Wedding Website (Save-the-Date V2)

Mobile-first cinematic Save-the-Date built with Next.js App Router, TypeScript, Tailwind, Framer Motion, and Radix Dialog.

## Route Structure

- `/` Phase 2 placeholder
- `/save-the-date` Phase 1 immersive Save-the-Date

## Architecture Overview

- `lib/content/saveTheDate.ts` Typed single source of truth for scene copy, modal content, and media maps
- `components/scenes/` Scene engine + six reusable scene implementations
- `lib/scenes/manifest.ts` Scene order and key mapping (`contentKey`, `backgroundKey`)
- `components/ui/ScrollReveal.tsx` Reveal + stagger system powered by IntersectionObserver + Framer Motion
- `components/audio/` Ambient audio provider + sticky toggle with session persistence
- `components/modals/` Accessible liquid-glass modal system with Venue / Our Story / The Party
- `lib/calendar.ts` Google Calendar URL + `.ics` generation for `America/New_York`

## Design System

Tailwind tokens are centralized in [`tailwind.config.ts`](./tailwind.config.ts):
- forest, ivory, maroon, gold, textMuted
- heading/body/devanagari fonts wired via `next/font`

## Performance Notes

- `next/image` used for scene and modal imagery
- video backgrounds support poster fallback and metadata preload
- reveal animations constrained to opacity/translateY/scale
- no GSAP dependency

## Testing

- Unit: `tests/unit/`
- Component: `tests/components/`
- E2E smoke: `tests/e2e/`

Run (once Node/npm are installed):

```bash
npm install
npm run dev
npm run test
npm run test:e2e
```

## TODO Media Placeholders

Add real assets under `/public`:

- `public/media/hero-loop.mp4`
- `public/audio/ambient-loop.mp3`
- `public/audio/music-preview.mp3`

Current placeholder-friendly image set is already wired in `public/images` and can be replaced by editing `lib/content/saveTheDate.ts`.
