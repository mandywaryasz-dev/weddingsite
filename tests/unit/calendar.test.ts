import { buildGoogleCalendarUrl, generateICS } from "@/lib/calendar";

describe("calendar utilities", () => {
  it("builds a valid Google Calendar URL", () => {
    const url = buildGoogleCalendarUrl({
      title: "Amanda & Dushyant",
      start: new Date("2026-10-02T20:00:00.000Z"),
      end: new Date("2026-10-03T03:00:00.000Z"),
      location: "Asheville, NC",
      details: "Save the date"
    });

    expect(url).toContain("calendar.google.com");
    expect(url).toContain("text=Amanda+%26+Dushyant");
    expect(url).toContain("Asheville%2C+NC");
  });

  it("generates ICS with explicit timezone fields", () => {
    const ics = generateICS({
      title: "Amanda & Dushyant",
      start: new Date("2026-10-02T20:00:00.000Z"),
      end: new Date("2026-10-03T03:00:00.000Z"),
      location: "Asheville, NC",
      details: "Save the date",
      timezone: "America/New_York"
    });

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("DTSTART;TZID=America/New_York:20261002T160000");
    expect(ics).toContain("DTEND;TZID=America/New_York:20261002T230000");
  });
});
