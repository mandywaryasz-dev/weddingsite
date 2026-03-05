import { expect, test } from "@playwright/test";

test("save-the-date renders scenes and opens modal", async ({ page }) => {
  await page.goto("/save-the-date");

  await expect(page.locator("section#hero")).toBeVisible();
  await expect(page.locator("section#cultural")).toBeVisible();
  await expect(page.locator("section#reveal")).toBeVisible();
  await expect(page.locator("section#party")).toBeVisible();
  await expect(page.locator("section#explore")).toBeVisible();

  const heroBodyLine = page.locator("section#hero h1 span").nth(2);
  const getOpacity = async () =>
    heroBodyLine.evaluate((el) =>
      Number.parseFloat(window.getComputedStyle(el as HTMLElement).opacity)
    );

  expect(await getOpacity()).toBeLessThan(0.2);
  await page.mouse.wheel(0, 1600);
  await page.waitForTimeout(250);
  expect(await getOpacity()).toBeGreaterThan(0.9);
  await page.mouse.wheel(0, -1600);
  await page.waitForTimeout(250);
  expect(await getOpacity()).toBeGreaterThan(0.9);

  // Ensure the sequence has progressed enough for Explore actions to be interactive.
  await page.mouse.wheel(0, 12000);
  await page.waitForTimeout(250);
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
