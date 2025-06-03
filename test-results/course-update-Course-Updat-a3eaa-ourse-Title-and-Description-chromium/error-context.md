# Test info

- Name: Course Update Actions >> Update Course Title and Description
- Location: /Users/lerryortiz/Documents/Lerry documents/WorkProjects/Thinkific Home Test 2025/playwright-thinkific-framework/tests/course-update.spec.ts:23:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('section.Card_card__23').first()

    at CoursePage.goToFirstCourse (/Users/lerryortiz/Documents/Lerry documents/WorkProjects/Thinkific Home Test 2025/playwright-thinkific-framework/pages/CoursePage.ts:81:31)
    at /Users/lerryortiz/Documents/Lerry documents/WorkProjects/Thinkific Home Test 2025/playwright-thinkific-framework/tests/course-update.spec.ts:24:5
```

# Page snapshot

```yaml
- main:
  - heading "lerry-s-school-4d7b.thinkific.com" [level=1]
  - paragraph: Verify you are human by completing the action below.
  - text: lerry-s-school-4d7b.thinkific.com needs to review the security of your connection before proceeding.
- contentinfo:
  - text: "Ray ID:"
  - code: 949bf3479ffb1df5
  - text: Performance & security by
  - link "Cloudflare":
    - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=m
```

# Test source

```ts
   1 | import { Page, Locator } from '@playwright/test';
   2 | import { baseUrl, routes } from '../config/urls';
   3 | import { BUTTON_LABELS } from '../utils/ui-constants';
   4 |
   5 | export class CoursePage {
   6 |   readonly page: Page;
   7 |   readonly chapterListContainer: Locator;
   8 |   readonly chapters: Locator;
   9 |   readonly course: Locator;
   10 |   readonly addChapterButton: Locator;
   11 |   readonly chapterNameInput: Locator;
   12 |   readonly saveChapterButton: Locator;
   13 |   readonly lastChapterTitle: Locator;
   14 |   readonly addLessonButton: Locator;
   15 |   readonly lessonTitleInput: Locator;
   16 |   readonly lessonContentField: Locator;
   17 |   readonly saveLessonButton: Locator;
   18 |   readonly lessonViewTitle: Locator;
   19 |   readonly courseListCards: Locator;
   20 |   readonly firstCourseTitle: Locator;
   21 |   readonly settingsTab: Locator;
   22 |   readonly deleteCourseButton: Locator;
   23 |   readonly confirmDeleteButton: Locator;
   24 |   readonly titleInput: Locator;
   25 |   readonly descriptionTextarea: Locator;
   26 |   readonly saveSettingsButton: Locator;
   27 |   readonly pricingTab: Locator;
   28 |   readonly oneTimePricingOption: Locator;
   29 |   readonly priceInput: Locator;
   30 |   readonly enrollmentDurationInput: Locator;
   31 |   readonly savePricingButton: Locator;
   32 |   readonly toastMessage: Locator;
   33 |
   34 |
   35 |   constructor(page: Page) {
   36 |     this.page = page;
   37 |     this.chapterListContainer = page.locator('[data-rbd-droppable-id="chapter-list-drop-zone"]');
   38 |     this.chapters = this.chapterListContainer.locator('div.chapter-card_FVZUV');
   39 |     this.course = page.locator('section.Card_card__23');
   40 |     this.addChapterButton = page.getByRole('button', { name: BUTTON_LABELS.ADD_CHAPTER }).first();
   41 |     this.chapterNameInput = page.locator('[data-qa="chapter-name__input"]');
   42 |     this.saveChapterButton = page.locator('[data-qa="save-block-action-button"]');
   43 |     this.lastChapterTitle = page.locator('[data-qa="accordion-title"]').last();
   44 |     this.addLessonButton = this.chapters.first().locator('[data-qa="add-new-lesson-btn"]');
   45 |     this.lessonTitleInput = page.locator('[data-qa="lesson-form-title-field"]');
   46 |     this.lessonContentField = page.locator('div.fr-element.fr-view[contenteditable="true"]');
   47 |     this.saveLessonButton = page.locator('[data-qa="actions-bar__save-button"]');
   48 |     this.lessonViewTitle = page.locator('.content-card__title__ABBD');
   49 |     this.courseListCards = page.locator('.Card_card__content__156');
   50 |     this.firstCourseTitle = this.courseListCards.first().locator('[data-qa="card__content-title"]');
   51 |     this.settingsTab = page.locator('[data-qa="nav-item__settings"]');
   52 |     this.deleteCourseButton = page.locator('[data-qa="delete-course__button"]');
   53 |     this.confirmDeleteButton = page.locator('[data-qa="confirm-delete__button"]');
   54 |     this.settingsTab = page.locator('[data-qa="nav-item__settings"]');
   55 |     this.titleInput = page.locator('[data-qa="course-name__input"]');
   56 |     this.descriptionTextarea = page.locator('[data-qa="image-and-description-textarea"]');
   57 |     this.saveSettingsButton = page.getByRole('button', { name: BUTTON_LABELS.SAVE_SETTINGS });
   58 |     this.pricingTab = page.locator('[data-qa="nav-item__pricing"]');
   59 |     this.oneTimePricingOption = page.locator('label[for="bundle_primary_pricing_one_time"]');
   60 |     this.priceInput = page.locator('[data-qa="pricing__input"]');
   61 |     this.enrollmentDurationInput = page.locator('[data-qa="enrollment-duration__input"]');
   62 |     this.savePricingButton = page.locator('[data-qa="save-block-action-button"]');
   63 |     this.toastMessage = page.locator('.Toast_toast__container__55');
   64 |
   65 |   }
   66 |
   67 |   async isChapterListVisible(): Promise<boolean> {
   68 |     return this.chapterListContainer.isVisible();
   69 |   }
   70 |
   71 |   async getChapterCount(): Promise<number> {
   72 |     return this.chapters.count();
   73 |   }
   74 |
   75 |   getChapters(): Locator {
   76 |     return this.chapters;
   77 |   }
   78 |
   79 |   async goToFirstCourse(): Promise<void> {
   80 |     await this.page.goto(`${baseUrl}${routes.coursesList}`);
>  81 |     await this.course.first().click();
      |                               ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
   82 |     await this.page.waitForURL(routes.courseOutlineRegex);
   83 |   }
   84 |
   85 |   async addNewChapter(title: string): Promise<void> {
   86 |     await this.addChapterButton.click();
   87 |     await this.page.waitForURL(routes.newChapterRegex);
   88 |     await this.chapterNameInput.fill(title);
   89 |     await this.saveChapterButton.click();
   90 |   }
   91 |
   92 | /**
   93 |  * Selects a lesson option by visible text (e.g., "Text", "Video").
   94 |  * @param name - The name of the lesson option to select.
   95 |  */
   96 | /**
   97 |  * Adds a new lesson of the given type to the first chapter in the course.
   98 |  * @param lessonType - The visible text of the lesson type to add (e.g., "Text", "Video").
   99 |  */
  100 | async addLessonToChapter(lessonType: string): Promise<void> {
  101 |   await this.addLessonButton.click();
  102 |   await this.page.waitForURL(routes.lessonTypeChooserRegex);
  103 |   
  104 |   const lessonOption = this.page.locator('.lesson-grid__grid-item_zwCrq', {
  105 |     hasText: lessonType,
  106 |   });
  107 |   await lessonOption.click();
  108 |
  109 |   // Wait until lesson editor page loads (e.g., /new_text_lesson or similar)
  110 |   await this.page.waitForURL(routes.newLessonEditorRegex);
  111 | }
  112 |
  113 |   getLessonByTitle(title: string): Locator {
  114 |     return this.page.locator('.content-card__title__ABBD').filter({ hasText: title });
  115 |   }
  116 |
  117 |   async fillTextLessonForm(title: string, content: string): Promise<void> {
  118 |     await this.lessonTitleInput.fill(title);
  119 |     await this.lessonContentField.fill(content);
  120 |     await this.saveLessonButton.click();
  121 |     await this.page.waitForURL(routes.lessonViewRegex);
  122 |   }
  123 |
  124 |   async goToCourseList(): Promise<void> {
  125 |     await this.page.goto(`${baseUrl}${routes.coursesList}`);
  126 |   }
  127 |
  128 |   async clickFirstCourse(): Promise<void> {
  129 |     await this.course.first().click();
  130 |     await this.page.waitForURL(routes.courseOutlineRegex);
  131 |   }
  132 |
  133 |   async goToCourseSettings(): Promise<void> {
  134 |     await this.settingsTab.click();
  135 |     await this.page.waitForURL(routes.settingViewRegex);
  136 |   }
  137 |
  138 |   async deleteCourse(): Promise<void> {
  139 |     await this.deleteCourseButton.scrollIntoViewIfNeeded();
  140 |     await this.deleteCourseButton.click();
  141 |     await this.confirmDeleteButton.click();
  142 |   }
  143 |
  144 |   async getFirstCourseTitle(): Promise<string> {
  145 |     return await this.firstCourseTitle.innerText();
  146 |   }
  147 |
  148 |   async updateCourseTitle(newTitle: string): Promise<void> {
  149 |   await this.titleInput.fill('');
  150 |   await this.titleInput.type(newTitle);
  151 | }
  152 |
  153 | async updateCourseDescription(description: string): Promise<void> {
  154 |   await this.descriptionTextarea.fill('');
  155 |   await this.descriptionTextarea.type(description);
  156 | }
  157 |
  158 | async saveSettings(): Promise<void> {
  159 |   await this.saveSettingsButton.click();
  160 |   await this.page.waitForTimeout(2000); // allow save
  161 | }
  162 |
  163 |   async setOneTimePricing(price: string, duration: string): Promise<void> {
  164 |     await this.pricingTab.click();
  165 |     await this.page.waitForURL(routes.pricingViewRegex);
  166 |     await this.oneTimePricingOption.click();
  167 |     await this.priceInput.fill(price);
  168 |     await this.enrollmentDurationInput.fill(duration);
  169 |     await this.savePricingButton.click();
  170 |   }
  171 |
  172 | }
  173 |
  174 |   
  175 |
```