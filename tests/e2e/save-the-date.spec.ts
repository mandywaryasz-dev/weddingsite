import { expect, test } from "@playwright/test";

test("save-the-date renders mobile scenes and opens all explore modals", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/save-the-date");

  await expect(page.locator("section")).toHaveCount(6);
  await expect(page.getByRole("link", { name: "Add to Calendar" })).toBeVisible();

  await page.getByRole("button", { name: "The Venue" }).click();
  await expect(page.getByRole("heading", { name: "The Venue" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("heading", { name: "The Venue" })).toBeHidden();

  await page.getByRole("button", { name: "Our Story" }).click();
  await expect(page.getByRole("heading", { name: "Our Story" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("heading", { name: "Our Story" })).toBeHidden();

  await page.getByRole("button", { name: "The Party" }).click();
  await expect(page.getByRole("heading", { name: "The Party" })).toBeVisible();
  await expect(page.getByText("Ambient audio lowers while this preview plays.")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("heading", { name: "The Party" })).toBeHidden();
});
