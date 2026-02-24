export type CalendarInput = {
  title: string;
  start: Date;
  end: Date;
  location: string;
  details: string;
  timezone: string;
};

function toGoogleDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function formatInTimeZone(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  const map = Object.fromEntries(parts.filter((p) => p.type !== "literal").map((p) => [p.type, p.value]));
  return `${map.year}${map.month}${map.day}T${map.hour}${map.minute}${map.second}`;
}

export function buildGoogleCalendarUrl({ title, start, end, location, details }: Omit<CalendarInput, "timezone">) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
    location,
    details
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICS({ title, start, end, location, details, timezone }: CalendarInput) {
  const dtStamp = toGoogleDate(new Date());
  const dtStart = formatInTimeZone(start, timezone);
  const dtEnd = formatInTimeZone(end, timezone);

  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AmandaAndDushyant//WeddingSite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@meetusinasheville.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=${timezone}:${dtStart}`,
    `DTEND;TZID=${timezone}:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  return body;
}
