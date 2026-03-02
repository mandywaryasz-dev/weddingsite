"use client";

import { buildGoogleCalendarUrl, generateICS } from "@/lib/calendar";
import clsx from "clsx";

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
  className?: string;
};

export function AddToCalendarButton({ label = "Add to Calendar", className }: AddToCalendarButtonProps) {
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
    <div className={clsx("space-y-2", className)}>
      <button
        type="button"
        onClick={downloadICS}
        className="rounded-full border border-ivory/55 bg-white/10 px-7 py-3 font-body text-xl text-ivory shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-white/20"
      >
        {label}
      </button>
      <div className="flex items-center justify-center gap-4 text-sm text-textMuted/95">
        <a href={googleHref} target="_blank" rel="noreferrer" className="underline-offset-4 transition hover:text-ivory hover:underline">
          Google
        </a>
        <button type="button" onClick={downloadICS} className="underline-offset-4 transition hover:text-ivory hover:underline">
          Apple/Outlook (.ics)
        </button>
      </div>
    </div>
  );
}
