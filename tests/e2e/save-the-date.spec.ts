import { expect, test } from "@playwright/test";

test("save-the-date renders scenes and opens modal", async ({ page }) => {
  await page.goto("/save-the-date");

  await expect(page.locator("section")).toHaveCount(6);
  await page.getByRole("button", { name: "Venue" }).click();
  await expect(page.getByText("Venue Preview")).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByText("Venue Preview")).toBeHidden();
});
