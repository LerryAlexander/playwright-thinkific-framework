import { test, expect, BrowserContext, Page } from '@playwright/test';
import { CoursePage } from '../pages/CoursePage';
import { loginViaAPI, waitForAppReady } from '../utils/helpers';
import { faker } from '@faker-js/faker';
import { TEXT_LABELS } from '../utils/ui-constants';

test.describe('Course Update Actions', () => {
  let context: BrowserContext;
  let page: Page;
  let coursePage: CoursePage;

  test.beforeEach(async () => {
    context = await loginViaAPI();
    page = await context.newPage();
    await waitForAppReady(page);  
    coursePage = new CoursePage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test.describe('@regression @update', () => {
    test('Update Course Title and Description', async () => {
      await coursePage.goToFirstCourse();
      await coursePage.goToCourseSettings();

      const newTitle = `Course: ${faker.company.catchPhrase()}`;
      const newDescription = faker.lorem.sentences(2);

      await coursePage.updateCourseTitle(newTitle);
      await coursePage.updateCourseDescription(newDescription);
      await coursePage.saveSettings();

      // Validate course title is updated in the list
      await coursePage.goToCourseList();
      const updatedTitle = await coursePage.getFirstCourseTitle();

      await expect(
        updatedTitle,
        `Expected course list to reflect updated title "${newTitle}"`
      ).toContain(newTitle);
    });

    test('Set Course Pricing: One-time payment', async () => {
      await coursePage.goToFirstCourse();

      const price = '49.99';
      const duration = '60';

      await coursePage.setOneTimePricing(price, duration);

      // Verify success toast message is shown
      await expect(
        coursePage.toastMessage,
        `Expected success toast message after setting one-time pricing`
      ).toContainText(TEXT_LABELS.SUCCESS_UPDATE_PRICE);
    });
  });
});
