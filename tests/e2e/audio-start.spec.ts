import { expect, test, type Page } from "@playwright/test";

async function tapToBegin(page: Page, projectName: string) {
  const overlay = page.getByTestId("audio-start-overlay");

  if (projectName === "Desktop Chrome") {
    await overlay.click();
    return;
  }

  await overlay.tap();
}

test("entrance overlay unlocks ambient audio on the first supported interaction", async ({
  page
}, testInfo) => {
  await page.goto("/save-the-date");

  const audioToggle = page.getByTestId("audio-toggle");
  const overlay = page.getByTestId("audio-start-overlay");

  await tapToBegin(page, testInfo.project.name);

  await expect(overlay).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
});

test("desktop click also unlocks ambient audio", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "Desktop Chrome");

  await page.goto("/save-the-date");

  const audioToggle = page.getByTestId("audio-toggle");
  const overlay = page.getByTestId("audio-start-overlay");

  await overlay.click();

  await expect(overlay).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
});
