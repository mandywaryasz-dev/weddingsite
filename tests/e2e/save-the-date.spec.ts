import { expect, test, type Locator } from "@playwright/test";

test("save-the-date renders scenes and opens modal", async ({ page }) => {
  const ambientResponse = page.waitForResponse((response) =>
    response.url().includes("/audio/ambient-loop.mp3")
  );

  await page.goto("/save-the-date");
  await ambientResponse;

  const audioToggle = page.getByTestId("audio-toggle");
  await page.getByTestId("audio-start-overlay").tap();
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");

  await expect(page.locator("section#hero")).toBeVisible();
  await expect(page.locator("section#cultural")).toBeVisible();
  await expect(page.locator("section#reveal")).toBeVisible();
  await expect(page.locator("section#party")).toBeVisible();
  await expect(page.locator("section#explore")).toBeVisible();

  const getOpacity = async (locator: Locator) =>
    locator.evaluate((el) =>
      Number.parseFloat(window.getComputedStyle(el as HTMLElement).opacity)
    );

  const heroBodyLine = page.locator("section#hero h1 span").nth(2);

  expect(await getOpacity(heroBodyLine)).toBeLessThan(0.2);
  await page.mouse.wheel(0, 1600);
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
  await page.waitForTimeout(250);
  expect(await getOpacity(heroBodyLine)).toBeGreaterThan(0.9);

  await audioToggle.tap();
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "false");

  await audioToggle.tap();
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");

  await page.mouse.wheel(0, -1600);
  await page.waitForTimeout(250);
  expect(await getOpacity(heroBodyLine)).toBeGreaterThan(0.9);

  await page.locator("section#cultural").scrollIntoViewIfNeeded();
  const cultureVowLine = page.getByText("You are mine.");
  expect(await getOpacity(cultureVowLine)).toBeLessThan(0.2);
  await page.mouse.wheel(0, 1800);
  await page.waitForTimeout(250);
  expect(await getOpacity(cultureVowLine)).toBeGreaterThan(0.9);
  await page.mouse.wheel(0, -700);
  await page.waitForTimeout(250);
  expect(await getOpacity(cultureVowLine)).toBeGreaterThan(0.9);

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
