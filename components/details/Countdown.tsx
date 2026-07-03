"use client";

import { useEffect, useState } from "react";
import { daysUntil } from "@/lib/details/countdown";

type CountdownProps = {
  target: string;
  label: string;
  /** Server-computed value for a flash-free first paint. */
  initialDays: number;
};

/**
 * Single whole-days countdown unit (plan §5.2). Hydrates with the
 * server-computed value, then recomputes on mount and hourly thereafter.
 */
export function Countdown({ target, label, initialDays }: CountdownProps) {
  const [days, setDays] = useState(initialDays);

  useEffect(() => {
    const tick = () => setDays(daysUntil(target));
    tick();
    const id = setInterval(tick, 3_600_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="mt-[38px] inline-flex flex-col items-center border-y border-[color:var(--d-hairline)] px-[clamp(30px,8vw,54px)] py-5">
      <div
        className="font-heading font-semibold leading-none text-[color:var(--d-maroon)] text-[clamp(2.4rem,9vw,3.4rem)]"
        aria-live="polite"
      >
        {days}
      </div>
      <div className="mt-3 font-heading text-[10px] tracking-[0.3em] text-[color:var(--d-copper)]">
        {label}
      </div>
    </div>
  );
}
