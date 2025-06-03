import { test, expect, BrowserContext, Page } from '@playwright/test';
import { loginViaAPI, waitForAppReady } from '../utils/helpers';
import { CoursePage } from '../pages/CoursePage';
import { baseUrl, routes } from '../config/urls';

test.describe('Delete Course Flow', () => {
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

  test.describe('@regression @deletion', () => {
    test('Delete Course', async () => {
      await coursePage.goToCourseList();

      const originalTitle = await coursePage.getFirstCourseTitle();

      await coursePage.goToFirstCourse();
      await coursePage.goToCourseSettings();
      await coursePage.deleteCourse();

      await expect(page).toHaveURL(`${baseUrl}${routes.coursesList}`);

      const newFirstTitle = await coursePage.getFirstCourseTitle();
      expect(newFirstTitle?.trim()).not.toBe(originalTitle?.trim());
    });
  });
});


