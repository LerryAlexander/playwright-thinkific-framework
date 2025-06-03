import { test, expect, BrowserContext, Page } from '@playwright/test';
import { ManagePage } from '../pages/ManagePage';
import { GenerateCoursePage } from '../pages/GenerateCoursePage';
import { CoursePage } from '../pages/CoursePage';
import { loginViaAPI, waitForAppReady, generateCourseDescription, generateChapterTitle } from '../utils/helpers';
import { baseUrl, routes } from '../config/urls';
import { faker } from '@faker-js/faker';

test.describe('Course Automation Flow', () => {
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
  
  test('Start AI Course Creation', async () => {
    const managePage = new ManagePage(page);
    const generateCoursePage = new GenerateCoursePage(page);

    await page.goto(`${baseUrl}${routes.manage}`);
    await managePage.startCourseCreation();

    const description = generateCourseDescription();
    await generateCoursePage.generateCourse(description);

    await expect(coursePage.chapterListContainer).toBeVisible();
    await expect(coursePage.getChapters()).toHaveCount(5);
  });

  test('Add Chapter to Existing Course', async () => {
    await coursePage.goToFirstCourse();
    const title = generateChapterTitle();
    await coursePage.addNewChapter(title);
    await expect(coursePage.lastChapterTitle).toContainText(title);
  });

  test('Add Text Lesson to Existing Course', async () => {
    await coursePage.goToFirstCourse();
    await coursePage.addLessonToChapter('Text');

    const title = faker.lorem.words(4);
    const content = faker.lorem.paragraphs(2);

    await coursePage.fillTextLessonForm(title, content);
    await expect(coursePage.getLessonByTitle(title)).toBeVisible();
  });
});


