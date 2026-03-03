"use client";

import { buildGoogleCalendarUrl } from "@/lib/calendar";
import clsx from "clsx";

const eventData = {
  title: "Amanda & Dushyant's Wedding",
  start: new Date("2026-10-02T20:00:00.000Z"),
  end: new Date("2026-10-03T03:00:00.000Z"),
  location: "Asheville, NC",
  details: 'Save the date for Amanda & Dushyant. Full details and RSVP to follow. Check for updates at <a href="https://meetusinasheville.com">meetusinasheville.com</a>.',
} as const;

type AddToCalendarButtonProps = {
  label?: string;
  className?: string;
};

export function AddToCalendarButton({ label = "Add to Calendar", className }: AddToCalendarButtonProps) {
  const googleHref = buildGoogleCalendarUrl(eventData);

  return (
    <div className={clsx(className)}>
      <a
        href={googleHref}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-full border border-silver/25 bg-black/40 px-10 py-3.5 font-body text-xl text-silver shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-white/15"
      >
        {label}
      </a>
    </div>
  );
}
