import { Page, Locator } from '@playwright/test';
import { TIMEOUTS } from '../config/constants';
import { routes } from '../config/urls';
import { BUTTON_LABELS } from '../utils/ui-constants';

export class ManagePage {
  readonly page: Page;
  private createButton: Locator;
  private courseOptionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = page.locator(`button:has-text("${BUTTON_LABELS.CREATE}")`);
    this.courseOptionButton = page.locator(`button:has-text("${BUTTON_LABELS.COURSE}")`);
  }

  async startCourseCreation(): Promise<void> {
    await this.createButton.click();
    await this.courseOptionButton.click();
    await this.page.waitForURL(`**${routes.createCourseModal}**`, { timeout: TIMEOUTS.medium });
  }
}
