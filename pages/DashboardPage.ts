import { expect, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('h6:has-text("Dashboard")')).toBeVisible();
  }
}