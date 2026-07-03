"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";
import type { DetailsContent } from "@/lib/details/types";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  links: DetailsContent["menu"]["links"];
  email: DetailsContent["menu"]["email"];
};

/**
 * Full-screen menu overlay (plan §5.1). Anchor links scroll to sections and
 * close the menu. Adds the a11y the mockup omits: role="dialog", Esc to close,
 * a lightweight focus trap, focus restore, and body-scroll lock including the
 * iOS touchmove lock (matching AudioStartOverlay).
 */
export function MenuOverlay({ open, onClose, links, email }: MenuOverlayProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const preventTouch = (event: TouchEvent) => event.preventDefault();
    document.addEventListener("touchmove", preventTouch, { passive: false });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("touchmove", preventTouch);
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className={clsx(
        "fixed inset-0 z-[70] flex items-center justify-center transition-opacity duration-[350ms]",
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      )}
      style={{ background: "radial-gradient(circle at 50% 30%,#FBF5EC,#F0E4D4)" }}
    >
      <div
        ref={panelRef}
        className={clsx(
          "relative p-[30px] text-center transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
          open ? "translate-y-0" : "-translate-y-3"
        )}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute -top-[90px] right-[6px] flex min-h-[var(--btn-min-h)] items-center justify-center border-none bg-transparent font-heading text-[24px] leading-none text-[color:var(--d-maroon)]"
        >
          ×
        </button>

        <DetailsImage
          src={detailsAsset("monogram")}
          alt=""
          width={46}
          height={46}
          className="mx-auto mb-[26px] w-[46px] opacity-90"
        />

        <div className="flex flex-col items-center gap-[22px]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-[var(--btn-min-h)] items-center font-heading tracking-[0.2em] text-[color:var(--d-maroon)] no-underline text-[clamp(20px,5vw,28px)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={email.href}
          onClick={onClose}
          className="mt-[34px] inline-flex min-h-[var(--btn-min-h)] items-center font-heading tracking-[0.22em] text-[color:var(--d-copper)] no-underline text-[11px]"
        >
          {email.label}
        </a>
      </div>
    </div>
  );
}
