import appData from '../fixtures/appData.json';
import { test, expect } from './test-base';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type Cred = { id: string; username: string; password: string };

const validUsers = appData.orangeHRM.validUsers as Cred[];
const invalidUsernameUsers = appData.orangeHRM.invalidUsernameUsers as Cred[];
const invalidPasswordUsers = appData.orangeHRM.invalidPasswordUsers as Cred[];

test.describe.parallel('Login Page - Multiple Users', () => {
  test.describe('Valid logins', () => {
    for (const user of validUsers) {
      test(`Valid login | ${user.id} | ${user.username}`, async ({ page, appConfig }) => {
        const loginPage = new LoginPage(page, appConfig.baseUrl);
        const dashboardPage = new DashboardPage(page, appConfig.baseUrl);

        await loginPage.goto();
        await loginPage.login(user.username, user.password);

        // Capture screenshot on success with user id
        await page.screenshot({ path: `test-results/screenshots/success-${user.id}.png`, fullPage: false }).catch(() => {});
        await dashboardPage.expectLoaded();
      });
    }
  });

  test.describe('Invalid username', () => {
    for (const user of invalidUsernameUsers) {
      test(`Invalid username | ${user.id} | ${user.username}`, async ({ page, appConfig }) => {
        const loginPage = new LoginPage(page, appConfig.baseUrl);

        await loginPage.goto();
        await loginPage.login(user.username, user.password);

        await loginPage.expectLoginError();
        await page.screenshot({ path: `test-results/screenshots/invalid-username-${user.id}.png` }).catch(() => {});
      });
    }
  });

  test.describe('Invalid password', () => {
    for (const user of invalidPasswordUsers) {
      test(`Invalid password | ${user.id} | ${user.username}`, async ({ page, appConfig }) => {
        const loginPage = new LoginPage(page, appConfig.baseUrl);

        await loginPage.goto();
        await loginPage.login(user.username, user.password);

        await loginPage.expectLoginError();
        await page.screenshot({ path: `test-results/screenshots/invalid-password-${user.id}.png` }).catch(() => {});
      });
    }
  });
});