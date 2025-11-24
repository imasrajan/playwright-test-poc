import { test as base, expect } from '@playwright/test';
import appData from '../fixtures/appData.json';

type AppConfig = typeof appData.orangeHRM;

interface Credentials {
  username: string;
  password: string;
}

export const test = base.extend<{
  appConfig: AppConfig;
  adminUser: Credentials;
  invalidAdminUser: Credentials;
}>({
  appConfig: async ({}, use) => {
    await use(appData.orangeHRM);
  },

  adminUser: async ({ appConfig }, use) => {
    await use(appConfig.admin);
  },

  invalidAdminUser: async ({ appConfig }, use) => {
    await use(appConfig.invalidAdmin);
  }
});

export { expect };