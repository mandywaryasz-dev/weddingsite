// Replaceable inline SVG icon set for the details page (plan §2.4 / §6).
// Centralized here so "some icons will change" is a localized edit. Geometry is
// carried over from the design mockup. All are decorative-by-default; when an
// icon needs a label, pass an accessible name via `title`/aria on the parent.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const strokeGold = "#C29A60";
const strokeCopper = "#B07A4E";

export function MapPinIcon({ stroke = strokeGold, ...props }: IconProps) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
}

export function PhoneIcon({ stroke = strokeGold, ...props }: IconProps) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 4h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon({ stroke = strokeGold, ...props }: IconProps) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.4" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
        stroke={stroke}
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function InfoIcon({ stroke = strokeCopper, ...props }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.4" />
      <path d="M12 11v5M12 8h.01" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScrollCueIcon({ stroke = "#A88463", ...props }: IconProps) {
  return (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" aria-hidden {...props}>
      <path
        d="M8 1 L8 19 M2 13 L8 20 L14 13"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
