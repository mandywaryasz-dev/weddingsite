import { expect, test, type Page } from "@playwright/test";

async function installAudioPlayStub(page: Page, mode: "resolve" | "reject" | "delay") {
  await page.addInitScript((stubMode) => {
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
        if (stubMode === "reject") {
          return Promise.reject(new Error("Simulated audio failure"));
        }
        if (stubMode === "delay") {
          return new Promise<void>((resolve) => {
            window.setTimeout(resolve, 4000);
          });
        }
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
  }, mode);
}

async function tapToBegin(page: Page, projectName: string) {
  const overlayShell = page.getByTestId("audio-start-overlay-shell");
  const box = await overlayShell.boundingBox();

  if (!box) {
    throw new Error("Audio start overlay was not visible");
  }

  const x = box.x + box.width / 2;
  const y = box.y + box.height * 0.45;

  if (projectName === "Desktop Chrome") {
    await page.mouse.click(x, y);
    return;
  }

  await page.touchscreen.tap(x, y);
}

async function waitForInteractiveOverlay(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
}

test("entrance overlay unlocks ambient audio on the first supported interaction", async ({
  page
}, testInfo) => {
  await installAudioPlayStub(page, "resolve");
  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);

  const audioToggle = page.getByTestId("audio-toggle");

  await tapToBegin(page, testInfo.project.name);

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-startup", "playing");
});

test("audio failure falls back to silent entry instead of trapping the user", async ({
  page
}, testInfo) => {
  await installAudioPlayStub(page, "reject");
  await page.route("**/audio/ambient-loop-v3.mp3", (route) => route.abort());
  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);

  const audioToggle = page.getByTestId("audio-toggle");
  await tapToBegin(page, testInfo.project.name);

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-startup", "silent");
  await expect(page.locator("section#hero")).toBeVisible();
});

test("slow audio start keeps going after the overlay dismisses", async ({ page }, testInfo) => {
  await installAudioPlayStub(page, "delay");
  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);

  const audioToggle = page.getByTestId("audio-toggle");
  await tapToBegin(page, testInfo.project.name);

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(page.locator("section#hero")).toBeVisible();
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-pending", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-startup", "starting");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "false");

  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-pending", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-startup", "playing");
});

test("silent fallback button dismisses the overlay without enabling audio", async ({ page }) => {
  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);

  const audioToggle = page.getByTestId("audio-toggle");
  await page.getByTestId("audio-skip-button").click();

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "false");
  await expect(audioToggle).toHaveAttribute("data-audio-startup", "silent");
  await expect(page.locator("section#hero")).toBeVisible();
});

test("desktop click also unlocks ambient audio", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "Desktop Chrome");

  await installAudioPlayStub(page, "resolve");
  await page.goto("/save-the-date");
  await waitForInteractiveOverlay(page);

  const audioToggle = page.getByTestId("audio-toggle");
  await tapToBegin(page, testInfo.project.name);

  await expect(page.getByTestId("audio-start-overlay-shell")).toHaveClass(/opacity-0/);
  await expect(audioToggle).toHaveAttribute("data-audio-enabled", "true");
  await expect(audioToggle).toHaveAttribute("data-audio-playing", "true");
});
