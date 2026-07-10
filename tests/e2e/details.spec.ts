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

test("hotel CTAs use the correct hrefs (Radical room block, Zelda call override)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /BOOK OUR ROOM BLOCK/ })).toHaveAttribute(
    "href",
    "https://www.hilton.com/en/attend-my-event/mjdashweddingoctober026/"
  );
  await expect(
    page.getByRole("link", { name: "(828) 514-2489" })
  ).toHaveAttribute("href", "tel:+18285142489");
});
