import { clsx } from "clsx";
import type { RsvpContent } from "@/lib/details/types";

type RsvpButtonProps = {
  rsvp: RsvpContent;
  /**
   * `light` — maroon ink on frosted light glass, for the blush hero.
   * `dark`  — gold ink on frosted dark glass, for the deep-maroon footer.
   */
  tone?: "light" | "dark";
  className?: string;
};

// Frosted-glass RSVP pill — the save-the-date glass buttons (ExploreScene)
// re-tuned for the light editorial theme. Shares the --btn-* tokens and the
// rounded-full / font-heading / tracked-caps idiom of the themed CTAs.
const base =
  "inline-flex min-h-[var(--btn-min-h)] items-center justify-center gap-[10px] rounded-full border px-[var(--btn-px)] py-[var(--btn-py)] text-center font-heading text-[12px] tracking-[0.22em] no-underline backdrop-blur-md transition";

const tones = {
  light: clsx(
    "border-[color:var(--d-hairline-gold)] bg-[rgba(255,255,255,0.42)] text-[color:var(--d-maroon)]",
    "shadow-[0_10px_30px_rgba(122,46,52,0.14)]",
    "hover:bg-[rgba(255,255,255,0.66)] hover:shadow-[0_14px_38px_rgba(122,46,52,0.18)]"
  ),
  dark: clsx(
    "border-[color:var(--d-gold-line)] bg-[rgba(255,255,255,0.08)] text-[color:var(--d-gold-bright)]",
    "shadow-[0_12px_34px_rgba(0,0,0,0.34)]",
    "hover:bg-[rgba(255,255,255,0.16)] hover:shadow-[0_16px_42px_rgba(0,0,0,0.4)]"
  ),
} as const;

export function RsvpButton({ rsvp, tone = "light", className }: RsvpButtonProps) {
  return (
    <a
      href={rsvp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(base, tones[tone], className)}
    >
      {rsvp.label}
    </a>
  );
}
