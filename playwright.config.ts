import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',

  timeout: 20000,
  expect: {
    timeout: 5000
  },

  use: {
    headless: false,
    viewport: { width: 1400, height: 900 },
    launchOptions: {
      slowMo: 350
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  workers: 1,

  retries: 1,

  reporter: [
    ['list'],
    ['html']
  ]
};

export default config;