import { expect, test } from "@playwright/test";

test("save-the-date renders scenes and opens modal", async ({ page }) => {
  await page.goto("/save-the-date");

  await expect(page.locator("section#hero")).toBeVisible();
  await expect(page.locator("section#cultural")).toBeVisible();
  await expect(page.locator("section#reveal")).toBeVisible();
  await expect(page.locator("section#party")).toBeVisible();
  await expect(page.locator("section#explore")).toBeVisible();
  await page.getByRole("button", { name: "The Venue" }).first().scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "The Venue" }).first().click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.getByRole("button", { name: "Our Story" }).first().click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.getByRole("button", { name: "The Party" }).first().click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
