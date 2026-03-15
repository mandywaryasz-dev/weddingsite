import { expect, test, type Page } from "@playwright/test";

async function dragToBegin(page: Page) {
  const overlay = page.getByTestId("audio-start-overlay");
  const bounds = await overlay.boundingBox();

  if (!bounds) {
    throw new Error("Audio start overlay was not visible.");
  }

  const session = await page.context().newCDPSession(page);
  const x = Math.round(bounds.x + bounds.width / 2);
  const startY = Math.round(bounds.y + bounds.height * 0.72);
  const endY = Math.round(bounds.y + bounds.height * 0.24);
  const steps = 5;

  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y: startY, id: 1, radiusX: 2, radiusY: 2, force: 1 }]
  });

  for (let step = 1; step <= steps; step += 1) {
    const progress = step / steps;
    const y = Math.round(startY + (endY - startY) * progress);

    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y, id: 1, radiusX: 2, radiusY: 2, force: 1 }]
    });
  }

  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: []
  });

  await page.waitForFunction(() => window.scrollY > 0);
}

test("entrance overlay unlocks ambient audio on the first supported interaction", async ({
  page
}, testInfo) => {
  await page.goto("/save-the-date");

  const audioToggle = page.getByTestId("audio-toggle");
  const overlay = page.getByTestId("audio-start-overlay");

  if (testInfo.project.name === "Mobile Chrome") {
    await dragToBegin(page);
  } else if (testInfo.project.name === "Mobile Safari") {
    await overlay.tap();
  } else {
    await page.locator("body").press("PageDown");
  }

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
