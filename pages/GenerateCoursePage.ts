import { Page, Locator, expect } from '@playwright/test';
import { routes } from '../config/urls';
import { TIMEOUTS } from '../config/constants';
import { TEXT_LABELS } from '../utils/ui-constants';

export class GenerateCoursePage {
  readonly page: Page;
  private descriptionField: Locator;
  private createButton: Locator;
  private draftingMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.descriptionField = page.locator('[data-qa="ai-prompt-description-field"]');
    this.createButton = page.locator('[data-qa="ai-outline-generate__btn"]');
    this.draftingMessage = page.locator(`text=${TEXT_LABELS.DRAFTING_COURSE}`);
  }

  async generateCourse(description: string): Promise<void> {
    await this.descriptionField.fill(description);
    await this.createButton.click();

    // validate loading message
    await expect(this.draftingMessage).toBeVisible({ timeout: TIMEOUTS.long });

    // Wait until redirected to final course page
    await this.page.waitForURL(routes.coursePage, {
      timeout: TIMEOUTS.long,
    });
  }
}
