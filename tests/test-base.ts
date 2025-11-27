import base, { expect as baseExpect } from '@playwright/test';
import appData from '../fixtures/appData.json';

// Define the type for AppConfig coming from JSON
type AppConfig = typeof appData.orangeHRM;

// Extend Playwright test with only appConfig fixture
export const test = base.extend<{
  appConfig: AppConfig;
}>({
  appConfig: async ({}, use) => {
    await use(appData.orangeHRM);
  },
});

export const expect = baseExpect;