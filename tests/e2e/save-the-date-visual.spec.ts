import { expect, test } from "@playwright/test";

test("hero scene keeps its current look on mobile", async ({ page }) => {
  test.skip(test.info().project.name !== "Mobile Chrome");

  await page.route("**/media/hero-loop-v2.mp4", (route) => route.abort());
  await page.route("**/media/hero-loop-v2.webm", (route) => route.abort());
  await page.route("**/media/hero-loop-mobile-v2.mp4", (route) => route.abort());
  await page.route("**/media/hero-loop-mobile-v2.webm", (route) => route.abort());

  await page.goto("/save-the-date");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Continue without sound" }).evaluate((element) => {
    (element as HTMLButtonElement).click();
  });
  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);

  await expect(page.locator("section#hero")).toHaveScreenshot("hero-mobile.png", {
    animations: "disabled",
    caret: "hide"
  });
});

test("hero scene keeps its current look on desktop", async ({ page }) => {
  test.skip(test.info().project.name !== "Desktop Chrome");

  await page.route("**/media/hero-loop-v2.mp4", (route) => route.abort());
  await page.route("**/media/hero-loop-v2.webm", (route) => route.abort());
  await page.goto("/save-the-date");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Continue without sound" }).evaluate((element) => {
    (element as HTMLButtonElement).click();
  });
  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);

  await expect(page.locator("section#hero")).toHaveScreenshot("hero-desktop.png", {
    animations: "disabled",
    caret: "hide"
  });
});
