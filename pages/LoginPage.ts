import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly baseUrl: string;

  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorMessageBanner;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;

    // selectors
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // banner error for invalid credentials
    this.errorMessageBanner = page.locator('.oxd-alert-content-text');
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/web/index.php/auth/login`);
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWith(credentials: { username: string; password: string }): Promise<void> {
    await this.goto();
    await this.login(credentials.username, credentials.password);
  }

  async expectLoginError(): Promise<void> {
    await expect(this.errorMessageBanner).toBeVisible();
  }
}