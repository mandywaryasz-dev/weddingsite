import { daysUntil } from "@/lib/details/countdown";

const TARGET = "2026-10-02T16:30:00-04:00";

describe("daysUntil", () => {
  it("counts whole days remaining, flooring partial days", () => {
    // 10 days and 23 hours before the target → 10 whole days.
    const now = new Date("2026-09-21T17:30:00-04:00");
    expect(daysUntil(TARGET, now)).toBe(10);
  });

  it("returns 0 exactly at the target", () => {
    expect(daysUntil(TARGET, new Date(TARGET))).toBe(0);
  });

  it("clamps to 0 once the target has passed", () => {
    const after = new Date("2026-10-05T00:00:00-04:00");
    expect(daysUntil(TARGET, after)).toBe(0);
  });

  it("accepts a numeric now and a Date target equivalently", () => {
    const nowMs = new Date("2026-09-22T16:30:00-04:00").getTime();
    expect(daysUntil(new Date(TARGET), nowMs)).toBe(10);
  });

  it("is timezone-correct across the offset boundary", () => {
    // One full day before, expressed in UTC.
    const now = new Date("2026-10-01T20:30:00Z"); // == 16:30 EDT on Oct 1
    expect(daysUntil(TARGET, now)).toBe(1);
  });

  it("returns 0 for an unparseable target rather than NaN", () => {
    expect(daysUntil("not-a-date", new Date(TARGET))).toBe(0);
  });
});
