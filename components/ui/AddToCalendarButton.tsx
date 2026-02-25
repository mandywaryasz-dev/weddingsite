"use client";

import { buildGoogleCalendarUrl, generateICS } from "@/lib/calendar";

const eventData = {
  title: "Amanda & Dushyant Wedding Weekend",
  start: new Date("2026-10-02T20:00:00.000Z"),
  end: new Date("2026-10-03T03:00:00.000Z"),
  location: "Asheville, NC",
  details: "Save the date for Amanda & Dushyant. Full details and RSVP to follow.",
  timezone: "America/New_York"
} as const;

type AddToCalendarButtonProps = {
  label?: string;
};

export function AddToCalendarButton({ label = "Add to Calendar" }: AddToCalendarButtonProps) {
  const googleHref = buildGoogleCalendarUrl(eventData);

  const downloadICS = () => {
    const ics = generateICS(eventData);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amanda-dushyant-save-the-date.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={googleHref}
        target="_blank"
        rel="noreferrer"
        className="glass-pill button-breathe px-6 py-3 font-heading text-xs uppercase tracking-[0.18em] text-ivory transition"
      >
        {label}
      </a>
      <button
        type="button"
        onClick={downloadICS}
        className="text-xs uppercase tracking-[0.15em] text-white/75 underline-offset-4 transition hover:text-white/90 hover:underline"
      >
        Download .ics file
      </button>
    </div>
  );
}
