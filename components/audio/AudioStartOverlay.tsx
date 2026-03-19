"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAudio } from "@/components/audio/AudioProvider";

export function AudioStartOverlay() {
  const {
    activateAudioFromGesture,
    enterSilently,
    hasEnteredExperience,
    pendingStart,
    prepareAudio,
    startupStatus
  } = useAudio();

  const isStarting = startupStatus === "starting" || pendingStart;
  const primaryLabel = isStarting ? "Starting audio..." : "Enter with sound";
  const overlayCtaClassName =
    "min-h-[var(--btn-min-h)] w-full rounded-full border border-ivory/[0.3] bg-[linear-gradient(165deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] px-[var(--btn-px)] py-[var(--btn-py)] font-heading text-[0.68rem] uppercase tracking-[0.22em] text-ivory/[0.88] shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition hover:border-ivory/[0.4] hover:bg-[linear-gradient(165deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] hover:text-ivory";

  useEffect(() => {
    if (hasEnteredExperience) {
      return;
    }

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previousStyles = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      htmlOverflow: documentElement.style.overflow,
      htmlOverscrollBehavior: documentElement.style.overscrollBehavior
    };

    const preventScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if (
        event.key === " " ||
        event.key === "PageUp" ||
        event.key === "PageDown" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
      }
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeyboardScroll);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyboardScroll);

      body.style.overflow = previousStyles.bodyOverflow;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;
      documentElement.style.overflow = previousStyles.htmlOverflow;
      documentElement.style.overscrollBehavior = previousStyles.htmlOverscrollBehavior;

      window.scrollTo(0, scrollY);
    };
  }, [hasEnteredExperience]);

  return (
    <div
      data-testid="audio-start-overlay-shell"
      className={`fixed inset-0 z-50 bg-[linear-gradient(180deg,rgba(8,10,10,0.04)_0%,rgba(8,10,10,0.16)_50%,rgba(8,10,10,0.32)_100%)] px-6 py-8 backdrop-blur-[3px] transition-opacity duration-300 sm:px-8 sm:py-10 ${
        hasEnteredExperience ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-full items-end justify-center">
        <section className="pointer-events-auto w-full max-w-[23rem] rounded-[2rem] border border-ivory/[0.22] bg-[linear-gradient(165deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] px-6 py-7 text-center text-ivory shadow-[0_24px_72px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:px-8 sm:py-8">
          <div
            data-testid="audio-start-overlay-lotus"
            className="mx-auto flex w-full max-w-[14rem] items-center justify-center gap-4 opacity-[0.88]"
            aria-hidden
          >
            <div className="h-px flex-1 bg-silver/[0.28]" />
            <Image
              src="/images/lotus.svg"
              alt=""
              width={84}
              height={84}
              unoptimized
              className="h-auto w-8 opacity-95"
            />
            <div className="h-px flex-1 bg-silver/[0.28]" />
          </div>

          <h2 className="mt-5 font-body text-[clamp(1.95rem,1.7rem+0.8vw,2.35rem)] leading-[1.04] text-ivory/[0.92]">
            Save the Date
          </h2>

          <p className="mx-auto mt-4 max-w-[17rem] font-body text-[1.1rem] leading-[1.5] text-ivory/[0.76] sm:text-[1.16rem]">
            For the full atmosphere, enter with sound.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              type="button"
              data-testid="audio-start-overlay"
              aria-label="Enter with sound"
              onPointerDown={prepareAudio}
              onClick={() => void activateAudioFromGesture()}
              disabled={isStarting}
              className={`${overlayCtaClassName} disabled:cursor-wait disabled:opacity-100`}
            >
              {primaryLabel}
            </button>

            <button
              type="button"
              data-testid="audio-skip-button"
              onClick={enterSilently}
              className={overlayCtaClassName}
            >
              Continue without sound
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
