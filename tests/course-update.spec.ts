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
  
  test('Update Course Title and Description', async () => {
    await coursePage.goToFirstCourse();
    await coursePage.goToCourseSettings();

    const newTitle = `Course: ${faker.company.catchPhrase()}`;
    const newDescription = faker.lorem.sentences(2);

    await coursePage.updateCourseTitle(newTitle);
    await coursePage.updateCourseDescription(newDescription);
    await coursePage.saveSettings();

    // Go back to course list to validate the title update
    await coursePage.goToCourseList();
    const updatedTitle = await coursePage.getFirstCourseTitle();
    await expect(updatedTitle).toContain(newTitle);
  });

  test('Set Course Pricing: One-time payment', async () => {
    await coursePage.goToFirstCourse();

    await coursePage.setOneTimePricing('49.99', '60'); // price, duration

    await expect(coursePage.toastMessage).toContainText(TEXT_LABELS.SUCCESS_UPDATE_PRICE);
  });
});
