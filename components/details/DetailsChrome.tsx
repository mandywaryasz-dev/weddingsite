"use client";

import { useCallback, useEffect, useState } from "react";
import { DetailsNav } from "@/components/details/DetailsNav";
import { MenuOverlay } from "@/components/details/MenuOverlay";
import type { DetailsContent } from "@/lib/details/types";

type DetailsChromeProps = {
  menu: DetailsContent["menu"];
  rsvp: DetailsContent["rsvp"];
};

/**
 * Client shell owning the two pieces of page interactivity that must be shared:
 * the nav's scroll state and the menu's open state (plan §3, §5.1). Everything
 * else on the page stays a server component.
 */
export function DetailsChrome({ menu, rsvp }: DetailsChromeProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <DetailsNav scrolled={scrolled} menuOpen={menuOpen} onOpenMenu={openMenu} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} links={menu.links} rsvp={rsvp} />
    </>
  );
}
