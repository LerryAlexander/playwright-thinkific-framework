import { Page, Locator } from '@playwright/test';
import { baseUrl, routes } from '../config/urls';
import { BUTTON_LABELS } from '../utils/ui-constants';

export class CoursePage {
  readonly page: Page;
  readonly chapterListContainer: Locator;
  readonly chapters: Locator;
  readonly course: Locator;
  readonly addChapterButton: Locator;
  readonly chapterNameInput: Locator;
  readonly saveChapterButton: Locator;
  readonly lastChapterTitle: Locator;
  readonly addLessonButton: Locator;
  readonly lessonTitleInput: Locator;
  readonly lessonContentField: Locator;
  readonly saveLessonButton: Locator;
  readonly lessonViewTitle: Locator;
  readonly courseListCards: Locator;
  readonly firstCourseTitle: Locator;
  readonly settingsTab: Locator;
  readonly deleteCourseButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly titleInput: Locator;
  readonly descriptionTextarea: Locator;
  readonly saveSettingsButton: Locator;
  readonly pricingTab: Locator;
  readonly oneTimePricingOption: Locator;
  readonly priceInput: Locator;
  readonly enrollmentDurationInput: Locator;
  readonly savePricingButton: Locator;
  readonly toastMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.chapterListContainer = page.locator('[data-rbd-droppable-id="chapter-list-drop-zone"]');
    this.chapters = this.chapterListContainer.locator('div.chapter-card_FVZUV');
    this.course = page.locator('section.Card_card__23');
    this.addChapterButton = page.getByRole('button', { name: BUTTON_LABELS.ADD_CHAPTER }).first();
    this.chapterNameInput = page.locator('[data-qa="chapter-name__input"]');
    this.saveChapterButton = page.locator('[data-qa="save-block-action-button"]');
    this.lastChapterTitle = page.locator('[data-qa="accordion-title"]').last();
    this.addLessonButton = this.chapters.first().locator('[data-qa="add-new-lesson-btn"]');
    this.lessonTitleInput = page.locator('[data-qa="lesson-form-title-field"]');
    this.lessonContentField = page.locator('div.fr-element.fr-view[contenteditable="true"]');
    this.saveLessonButton = page.locator('[data-qa="actions-bar__save-button"]');
    this.lessonViewTitle = page.locator('.content-card__title__ABBD');
    this.courseListCards = page.locator('.Card_card__content__156');
    this.firstCourseTitle = this.courseListCards.first().locator('[data-qa="card__content-title"]');
    this.settingsTab = page.locator('[data-qa="nav-item__settings"]');
    this.deleteCourseButton = page.locator('[data-qa="delete-course__button"]');
    this.confirmDeleteButton = page.locator('[data-qa="confirm-delete__button"]');
    this.settingsTab = page.locator('[data-qa="nav-item__settings"]');
    this.titleInput = page.locator('[data-qa="course-name__input"]');
    this.descriptionTextarea = page.locator('[data-qa="image-and-description-textarea"]');
    this.saveSettingsButton = page.getByRole('button', { name: BUTTON_LABELS.SAVE_SETTINGS });
    this.pricingTab = page.locator('[data-qa="nav-item__pricing"]');
    this.oneTimePricingOption = page.locator('label[for="bundle_primary_pricing_one_time"]');
    this.priceInput = page.locator('[data-qa="pricing__input"]');
    this.enrollmentDurationInput = page.locator('[data-qa="enrollment-duration__input"]');
    this.savePricingButton = page.locator('[data-qa="save-block-action-button"]');
    this.toastMessage = page.locator('.Toast_toast__container__55');

  }

  async isChapterListVisible(): Promise<boolean> {
    return this.chapterListContainer.isVisible();
  }

  async getChapterCount(): Promise<number> {
    return this.chapters.count();
  }

  getChapters(): Locator {
    return this.chapters;
  }

  async goToFirstCourse(): Promise<void> {
    await this.page.goto(`${baseUrl}${routes.coursesList}`);
    await this.course.first().click();
    await this.page.waitForURL(routes.courseOutlineRegex);
  }

  async addNewChapter(title: string): Promise<void> {
    await this.addChapterButton.click();
    await this.page.waitForURL(routes.newChapterRegex);
    await this.chapterNameInput.fill(title);
    await this.saveChapterButton.click();
  }

/**
 * Selects a lesson option by visible text (e.g., "Text", "Video").
 * @param name - The name of the lesson option to select.
 */
/**
 * Adds a new lesson of the given type to the first chapter in the course.
 * @param lessonType - The visible text of the lesson type to add (e.g., "Text", "Video").
 */
async addLessonToChapter(lessonType: string): Promise<void> {
  await this.addLessonButton.click();
  await this.page.waitForURL(routes.lessonTypeChooserRegex);
  
  const lessonOption = this.page.locator('.lesson-grid__grid-item_zwCrq', {
    hasText: lessonType,
  });
  await lessonOption.click();

  // Wait until lesson editor page loads (e.g., /new_text_lesson or similar)
  await this.page.waitForURL(routes.newLessonEditorRegex);
}

  getLessonByTitle(title: string): Locator {
    return this.page.locator('.content-card__title__ABBD').filter({ hasText: title });
  }

  async fillTextLessonForm(title: string, content: string): Promise<void> {
    await this.lessonTitleInput.fill(title);
    await this.lessonContentField.fill(content);
    await this.saveLessonButton.click();
    await this.page.waitForURL(routes.lessonViewRegex);
  }

  async goToCourseList(): Promise<void> {
    await this.page.goto(`${baseUrl}${routes.coursesList}`);
  }

  async clickFirstCourse(): Promise<void> {
    await this.course.first().click();
    await this.page.waitForURL(routes.courseOutlineRegex);
  }

  async goToCourseSettings(): Promise<void> {
    await this.settingsTab.click();
    await this.page.waitForURL(routes.settingViewRegex);
  }

  async deleteCourse(): Promise<void> {
    await this.deleteCourseButton.scrollIntoViewIfNeeded();
    await this.deleteCourseButton.click();
    await this.confirmDeleteButton.click();
  }

  async getFirstCourseTitle(): Promise<string> {
    return await this.firstCourseTitle.innerText();
  }

  async updateCourseTitle(newTitle: string): Promise<void> {
  await this.titleInput.fill('');
  await this.titleInput.type(newTitle);
}

async updateCourseDescription(description: string): Promise<void> {
  await this.descriptionTextarea.fill('');
  await this.descriptionTextarea.type(description);
}

async saveSettings(): Promise<void> {
  await this.saveSettingsButton.click();
  await this.page.waitForTimeout(2000); // allow save
}

  async setOneTimePricing(price: string, duration: string): Promise<void> {
    await this.pricingTab.click();
    await this.page.waitForURL(routes.pricingViewRegex);
    await this.oneTimePricingOption.click();
    await this.priceInput.fill(price);
    await this.enrollmentDurationInput.fill(duration);
    await this.savePricingButton.click();
  }

}

  
