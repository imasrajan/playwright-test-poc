import { test, expect } from './test-base';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('OrangeHRM Login', () => {

  // TC-01: Valid login
  test('Valid login should navigate to Dashboard',
    async ({ page, appConfig, adminUser }) => {
      const loginPage = new LoginPage(page, appConfig.baseUrl);
      const dashboardPage = new DashboardPage(page, appConfig.baseUrl);

      await loginPage.loginWith(adminUser);
      await dashboardPage.expectLoaded();
    });

  // TC-02: Invalid password
  test('Invalid password should show error message',
    async ({ page, appConfig, invalidAdminUser }) => {
      const loginPage = new LoginPage(page, appConfig.baseUrl);

      await loginPage.loginWith(invalidAdminUser);
      await loginPage.expectLoginError();
    });

  // TC-03: Invalid username
  test('Invalid username should show error message',
    async ({ page, appConfig, adminUser }) => {
      const loginPage = new LoginPage(page, appConfig.baseUrl);

      await loginPage.goto();
      await loginPage.login('WrongAdmin', adminUser.password);
      await loginPage.expectLoginError();
    });

});