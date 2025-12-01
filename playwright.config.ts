import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["list"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://naveenautomationlabs.com/opencart/index.php",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "on",
    video: "on",
    headless: true,
  },

  metadata: {
    appUsername: "pwtest@nal.com",
    appPassword: "test123",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "Chromium",
    //   use: {
    //     browserName: "chromium",
    //     viewport: {width: 1920, height: 1080},
    //     launchOptions: {
    //       args: [],
    //       ignoreDefaultArgs: ["--window-size=1280,720"],
    //     },
    //   },
    // },

    // {
    //   name: "Google Chrome",
    //   use: {
    //     channel: "chrome",
    //     viewport: null,
    //     launchOptions: {
    //       args: ["--start-maximized"],
    //       ignoreDefaultArgs: ["--window-size=1280,720"],
    //     },
    //   },
    // },

    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     channel: "msedge",
    //     viewport: null,
    //     launchOptions: {
    //       args: ["--start-maximized"],
    //       ignoreDefaultArgs: ["--window-size=1280,720"],
    //     },
    //   },
    // },

    // {
    //   name: "Firefox",
    //   use: {
    //     browserName: "firefox",
    //     viewport: {width: 1920, height: 1080},
    //     launchOptions: {
    //       args: [],
    //       ignoreDefaultArgs: ["--window-size=1280,720"],
    //     },
    //   },
    // },

    // {
    //   name: "WebKit",
    //   use: {
    //     browserName: "webkit",
    //     viewport: {width: 1920, height: 1080},
    //     launchOptions: {
    //       args: [],
    //       ignoreDefaultArgs: ["--window-size=1280,720"],
    //     },
    //   },
    // },
    // {
    //   name: "chromium",
    //   use: {...devices["Desktop Chrome"]},
    // },

    // {
    //   name: "firefox",
    //   use: {...devices["Desktop Firefox"]},
    // },

    // {
    //   name: "webkit",
    //   use: {...devices["Desktop Safari"]},
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: {...devices["Desktop Edge"], channel: "msedge"},
    // },
    {
      name: "Google Chrome",
      use: {...devices["Desktop Chrome"], channel: "chrome"},
    },
  ],
});
