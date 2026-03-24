import { expect, test, type Locator, type Page } from "@playwright/test";

async function installResolvedAudioPlayStub(page: Page) {
  await page.addInitScript(() => {
    const originalPlay = HTMLMediaElement.prototype.play;

    class MockGainNode {
      gain = { value: 0.3 };
      connect() {}
      disconnect() {}
    }

    class MockMediaElementAudioSourceNode {
      connect() {}
      disconnect() {}
    }

    class MockAudioContext {
      state: AudioContextState = "running";
      destination = {};

      resume() {
        this.state = "running";
        return Promise.resolve();
      }

      close() {
        return Promise.resolve();
      }

      createGain() {
        return new MockGainNode();
      }

      createMediaElementSource() {
        return new MockMediaElementAudioSourceNode();
      }
    }

    HTMLMediaElement.prototype.play = function play() {
      if (this instanceof HTMLAudioElement) {
        return Promise.resolve();
      }

      return originalPlay.call(this);
    };

    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      writable: true,
      value: MockAudioContext
    });
    Object.defineProperty(window, "webkitAudioContext", {
      configurable: true,
      writable: true,
      value: MockAudioContext
    });
  });
}

async function tapToBegin(page: Page) {
  const overlay = page.getByTestId("audio-start-overlay");
  await overlay.evaluate((element) => {
    (element as HTMLButtonElement).click();
  });
}

async function waitForInteractiveOverlay(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
}

test("save-the-date renders scenes and opens modal", async ({ page }) => {
  test.skip(test.info().project.name !== "Mobile Chrome");

  await installResolvedAudioPlayStub(page);
  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);

  const audioToggle = page.getByTestId("audio-toggle");
  await tapToBegin(page);
  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
  const heroScrollHint = page.getByTestId("hero-scroll-hint");
  await expect(heroScrollHint).toHaveAttribute("data-state", "visible");

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
  const heroOpacityAfterStartGesture = await getOpacity(heroBodyLine);

  await page.mouse.wheel(0, 240);
  await page.waitForTimeout(200);
  await expect(heroScrollHint).toHaveAttribute("data-state", "hidden");

  await page.mouse.wheel(0, 1600);
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
  await page.waitForTimeout(250);
  const heroOpacityAfterAdditionalScroll = await getOpacity(heroBodyLine);
  expect(heroOpacityAfterAdditionalScroll).toBeGreaterThan(heroOpacityAfterStartGesture);
  expect(heroOpacityAfterAdditionalScroll).toBeGreaterThan(0.9);

  await audioToggle.evaluate((element) => {
    (element as HTMLButtonElement).click();
  });
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "false");

  await audioToggle.evaluate((element) => {
    (element as HTMLButtonElement).click();
  });
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");

  await page.mouse.wheel(0, -1600);
  await page.waitForTimeout(250);
  expect(await getOpacity(heroBodyLine)).toBeGreaterThan(0.9);
  await expect(heroScrollHint).toHaveAttribute("data-state", "hidden");

  await page.locator("section#cultural").scrollIntoViewIfNeeded();
  const cultureVowLine = page.getByText("You are mine.");
  expect(await getOpacity(cultureVowLine)).toBeLessThan(0.2);
  await page.mouse.wheel(0, 1800);
  await page.waitForTimeout(250);
  expect(await getOpacity(cultureVowLine)).toBeGreaterThan(0.9);
  await page.mouse.wheel(0, -700);
  await page.waitForTimeout(250);
  expect(await getOpacity(cultureVowLine)).toBeGreaterThan(0.9);

  await page.mouse.wheel(0, 12000);
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "The Venue" }).first().scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "The Venue" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.getByRole("button", { name: "Our Story" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.getByRole("button", { name: "The Party" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("hero poster fallback keeps the first scene usable when video fails", async ({ page }) => {
  test.skip(test.info().project.name !== "Mobile Chrome");

  await page.route("**/media/hero-loop-v2.mp4", (route) => route.abort());
  await page.route("**/media/hero-loop-v2.webm", (route) => route.abort());
  await page.route("**/media/hero-loop-mobile-v2.mp4", (route) => route.abort());
  await page.route("**/media/hero-loop-mobile-v2.webm", (route) => route.abort());

  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);
  await page.getByRole("button", { name: "Continue without sound" }).evaluate((element) => {
    (element as HTMLButtonElement).click();
  });

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(page.locator("section#hero")).toBeVisible();
  await expect(page.getByTestId("hero-scroll-hint")).toHaveAttribute("data-state", "visible");

  const posterFallback = page.getByTestId("background-poster-fallback");
  if (await posterFallback.count()) {
    await expect(posterFallback).toBeVisible();
    return;
  }

  await expect(page.getByTestId("background-video")).toHaveAttribute(
    "poster",
    "/images/hero-poster-v2.jpg"
  );
});
