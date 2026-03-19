import { expect, test, type Page } from "@playwright/test";

type OverlayButtonStyles = {
  backgroundImage: string;
  borderColor: string;
  borderRadius: string;
  borderTopWidth: string;
  boxShadow: string;
  color: string;
  fontSize: string;
  height: number;
  letterSpacing: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  width: number;
};

async function blockBackgroundMedia(page: Page) {
  for (const pattern of [
    "**/media/hero-loop-v2.mp4",
    "**/media/hero-loop-v2.webm",
    "**/media/hero-loop-mobile-v2.mp4",
    "**/media/hero-loop-mobile-v2.webm"
  ]) {
    await page.route(pattern, (route) => route.abort());
  }
}

async function openSaveTheDate(page: Page) {
  await page.goto("/save-the-date");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
}

async function getOverlayButtonStyles(page: Page) {
  return page.evaluate(() => {
    const readStyles = (testId: string): OverlayButtonStyles => {
      const element = document.querySelector(`[data-testid="${testId}"]`);

      if (!(element instanceof HTMLButtonElement)) {
        throw new Error(`Expected button for ${testId}`);
      }

      const styles = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return {
        backgroundImage: styles.backgroundImage,
        borderColor: styles.borderColor,
        borderRadius: styles.borderRadius,
        borderTopWidth: styles.borderTopWidth,
        boxShadow: styles.boxShadow,
        color: styles.color,
        fontSize: styles.fontSize,
        height: rect.height,
        letterSpacing: styles.letterSpacing,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
        paddingRight: styles.paddingRight,
        paddingTop: styles.paddingTop,
        width: rect.width
      };
    };

    return {
      primary: readStyles("audio-start-overlay"),
      secondary: readStyles("audio-skip-button")
    };
  });
}

async function expectMatchingOverlayCtas(page: Page) {
  const { primary, secondary } = await getOverlayButtonStyles(page);

  expect(secondary.borderColor).not.toBe("rgb(229, 231, 235)");
  expect(secondary.borderColor).toBe(primary.borderColor);
  expect(secondary.borderTopWidth).toBe(primary.borderTopWidth);
  expect(secondary.borderRadius).toBe(primary.borderRadius);
  expect(secondary.boxShadow).toBe(primary.boxShadow);
  expect(secondary.backgroundImage).toBe(primary.backgroundImage);
  expect(secondary.color).toBe(primary.color);
  expect(secondary.fontSize).toBe(primary.fontSize);
  expect(secondary.letterSpacing).toBe(primary.letterSpacing);
  expect(secondary.paddingTop).toBe(primary.paddingTop);
  expect(secondary.paddingRight).toBe(primary.paddingRight);
  expect(secondary.paddingBottom).toBe(primary.paddingBottom);
  expect(secondary.paddingLeft).toBe(primary.paddingLeft);
  expect(secondary.width).toBeCloseTo(primary.width, 5);
  expect(secondary.height).toBeCloseTo(primary.height, 5);
}

test("entrance overlay keeps its current look on mobile", async ({ page }) => {
  test.skip(test.info().project.name !== "Mobile Chrome");

  await blockBackgroundMedia(page);
  await openSaveTheDate(page);
  await expectMatchingOverlayCtas(page);

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveScreenshot(
    "entrance-overlay-mobile.png",
    {
      animations: "disabled",
      caret: "hide"
    }
  );
});

test("entrance overlay keeps its current look on desktop", async ({ page }) => {
  test.skip(test.info().project.name !== "Desktop Chrome");

  await blockBackgroundMedia(page);
  await openSaveTheDate(page);
  await expectMatchingOverlayCtas(page);

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveScreenshot(
    "entrance-overlay-desktop.png",
    {
      animations: "disabled",
      caret: "hide"
    }
  );
});

test("hero scene keeps its current look on mobile", async ({ page }) => {
  test.skip(test.info().project.name !== "Mobile Chrome");

  await blockBackgroundMedia(page);
  await openSaveTheDate(page);
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

  await blockBackgroundMedia(page);
  await openSaveTheDate(page);
  await page.getByRole("button", { name: "Continue without sound" }).evaluate((element) => {
    (element as HTMLButtonElement).click();
  });
  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);

  await expect(page.locator("section#hero")).toHaveScreenshot("hero-desktop.png", {
    animations: "disabled",
    caret: "hide"
  });
});
