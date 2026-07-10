import { expect, test } from "@playwright/test";

// Runs across all configured projects (Mobile Chrome, Mobile Safari, Desktop
// Chrome) so mobile is covered by default (plan §9).

test("details page renders every section top to bottom", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("section#top")).toBeVisible();
  for (const id of ["events", "travel", "stay", "attire", "faq"]) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "The Events", level: 2 })).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});

test("hero countdown renders a whole-days number", async ({ page }) => {
  await page.goto("/");
  const count = page.locator('section#top [aria-live="polite"]');
  await expect(count).toBeVisible();
  await expect(count).toHaveText(/^\d+$/);
});

test("menu opens, navigates to a section, and closes", async ({ page }) => {
  await page.goto("/");

  const openButton = page.getByRole("button", { name: "Open menu" });
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await openButton.click();
  await expect(openButton).toHaveAttribute("aria-expanded", "true");

  const dialog = page.getByRole("dialog");
  await dialog.getByRole("link", { name: "FAQ" }).click();

  await expect(page).toHaveURL(/#faq$/);
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("section#faq")).toBeInViewport();
});

test("nav frosts after scrolling past the hero", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("nav");
  await expect(nav).toHaveClass(/bg-transparent/);
  // Cross-browser scroll (mouse.wheel is a no-op under touch emulation).
  await page.locator("section#events").scrollIntoViewIfNeeded();
  await expect(nav).toHaveClass(/backdrop-blur/);
});

test("FAQ accordion expands on click", async ({ page }) => {
  await page.goto("/");
  const firstDetails = page.locator("section#faq details").first();
  await expect(firstDetails).not.toHaveAttribute("open", /.*/);
  await firstDetails.locator("summary").click();
  await expect(firstDetails).toHaveAttribute("open", /.*/);
});

test("hotel CTAs use the correct hrefs (Radical booking note, Zelda call override)", async ({ page }) => {
  await page.goto("/");
  // TEMP: room-block link is down; guests reserve via the couple's numbers.
  // Restore the "BOOK OUR ROOM BLOCK" href assertion once the CTA is back.
  await expect(
    page.getByRole("link", { name: /Mandy \(603\) 440-9249/ })
  ).toHaveAttribute("href", "tel:+16034409249");
  await expect(
    page.getByRole("link", { name: "(828) 514-2489" })
  ).toHaveAttribute("href", "tel:+18285142489");
});
