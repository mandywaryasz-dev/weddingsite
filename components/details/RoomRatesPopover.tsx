"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { InfoIcon } from "@/components/icons";
import type { FeaturedHotel } from "@/lib/details/types";

type RoomRatesPopoverProps = {
  rates: NonNullable<FeaturedHotel["roomRates"]>;
};

/** Renders `**bold**` spans as maroon <strong>, everything else plain. */
function renderLine(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[color:var(--d-maroon)]">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/**
 * Small anchored popover for the room-block rate overview. Kept lightweight
 * (no modal overlay) so the price range and flexible dates are one tap away
 * without pulling focus from the page. Closes on Escape or an outside click.
 */
export function RoomRatesPopover({ rates }: RoomRatesPopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <span ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-[7px] font-heading text-[11px] uppercase tracking-[0.16em] text-[color:var(--d-terracotta)] transition hover:text-[color:var(--d-maroon)]"
      >
        <InfoIcon className="flex-none" />
        {rates.triggerLabel}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={rates.title}
          className="absolute left-0 top-[calc(100%+10px)] z-20 w-[min(20rem,78vw)] rounded-[1rem] border border-[color:var(--d-hairline)] bg-[#fffdf8] p-5 text-left shadow-[0_18px_44px_rgba(122,46,52,0.18)]"
        >
          <p className="font-heading text-[11px] uppercase tracking-[0.24em] text-[color:var(--d-copper)]">
            {rates.title}
          </p>
          <div className="mt-3 space-y-[10px] text-[0.95rem] leading-[1.55] text-[color:var(--d-body)]">
            {rates.lines.map((line, i) => (
              <p key={i}>{renderLine(line)}</p>
            ))}
          </div>
        </div>
      ) : null}
    </span>
  );
}
