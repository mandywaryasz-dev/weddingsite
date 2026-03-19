import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { motionValue } from "framer-motion";
import { ScrollSequenceContext } from "@/components/motion/ScrollSequenceContext";
import { HeroScrollHint } from "@/components/ui/HeroScrollHint";

describe("HeroScrollHint", () => {
  it("shows before the user scrolls the hero sequence", () => {
    const progress = motionValue(0);

    render(
      <ScrollSequenceContext.Provider value={{ progress, lockedProgress: progress, itemCount: 7 }}>
        <HeroScrollHint />
      </ScrollSequenceContext.Provider>
    );

    expect(screen.getByTestId("hero-scroll-hint")).toHaveAttribute("data-state", "visible");
  });

  it("stays hidden once the hero sequence starts progressing", async () => {
    const progress = motionValue(0);

    render(
      <ScrollSequenceContext.Provider value={{ progress, lockedProgress: progress, itemCount: 7 }}>
        <HeroScrollHint />
      </ScrollSequenceContext.Provider>
    );

    const hint = screen.getByTestId("hero-scroll-hint");

    act(() => {
      progress.set(0.05);
    });

    await waitFor(() => {
      expect(hint).toHaveAttribute("data-state", "hidden");
    });

    act(() => {
      progress.set(0.01);
    });

    await waitFor(() => {
      expect(hint).toHaveAttribute("data-state", "hidden");
    });
  });
});
