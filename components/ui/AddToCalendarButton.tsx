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

export function AddToCalendarButton() {
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
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={googleHref}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-gold px-6 py-3 font-heading text-xs uppercase tracking-[0.2em] text-forest transition hover:brightness-105"
      >
        Add to Google Calendar
      </a>
      <button
        type="button"
        onClick={downloadICS}
        className="rounded-full border border-gold/70 px-6 py-3 font-heading text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-forest"
      >
        Download .ics
      </button>
    </div>
  );
}
