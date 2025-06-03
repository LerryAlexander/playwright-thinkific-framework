import { faker } from '@faker-js/faker';
import { request, BrowserContext, chromium } from '@playwright/test';
import { getUserCredentials } from './aws/secrets';
import { baseUrl, routes } from '../config/urls';
import { Page } from '@playwright/test';

/**
 * Logs in to Thinkific via API using credentials stored in AWS Secrets Manager.
 * Reuses the session via storageState for browser context authentication.
 *
 * @returns {Promise<BrowserContext>} Authenticated Playwright browser context.
 * @throws Will throw an error if login request fails.
 */
export async function loginViaAPI(): Promise<BrowserContext> {
  const { Username, Password } = await getUserCredentials();

  const requestContext = await request.newContext();
  const response = await requestContext.post(`${baseUrl}${routes.signIn}`, {
    form: {
      'user[email]': Username,
      'user[password]': Password,
    },
  });

  if (response.status() !== 302 && response.status() !== 200) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  const storageState = await requestContext.storageState();
  const browser = await chromium.launch();
  const browserContext = await browser.newContext({ storageState });

  return browserContext;
}

/**
 * Waits for the main application to be ready by checking that the page is
 * past Cloudflare bot protection or challenge screens.
 * 
 * @param page - The Playwright page instance
 */
export async function waitForAppReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');

  const challenge = page.locator('text=Verify you are human');

  if (await challenge.isVisible({ timeout: 3000 }).catch(() => false)) {
    await challenge.waitFor({ state: 'detached', timeout: 10000 });
  }

  // Wait until user lands on the expected page, e.g., /manage/courses
  //await page.waitForURL(/\/manage(\/.*)?$/, { timeout: 10000 });
}

/**
 * Generates a random tech-related topic for course creation.
 */
export function getRandomTechTopic(): string {
  const techNouns = ['Testing', 'Automation', 'Infrastructure', 'APIs', 'UI Design', 'Cloud'];
  const techTools = ['Playwright', 'TypeScript', 'Docker', 'GitHub Actions', 'React'];

  const noun = faker.helpers.arrayElement(techNouns);
  const tool = faker.helpers.arrayElement(techTools);

  return `${tool} ${noun}`;
}

/**
 * Generates a dynamic course description based on the topic.
 * If no topic is provided, a random one will be generated.
 *
 * @param topic - Optional subject of the course
 * @returns A course description string
 */
export function generateCourseDescription(topic?: string): string {
  const synonyms = [
    'Learn',
    'Master',
    'Understand',
    'Explore',
    'Get started with',
    'Dive into',
    'Gain expertise in',
    'Uncover the power of'
  ];

  const randomVerb = faker.helpers.arrayElement(synonyms);
  const courseTopic = topic || getRandomTechTopic();

  return `${randomVerb} ${courseTopic} with practical examples and expert guidance.`;
}

/**
 * Generates a random, readable chapter title.
 * Combines a buzzword and a tech-related noun for variety.
 * 
 * @returns {string} - A randomly generated chapter title.
 */
export function generateChapterTitle(): string {
  const buzzwords = [
    'Optimize', 'Streamline', 'Leverage', 'Automate', 'Enable',
    'Integrate', 'Orchestrate', 'Enhance', 'Transform', 'Scale'
  ];

  const buzzword = faker.helpers.arrayElement(buzzwords);
  const techNoun = faker.hacker.noun(); // e.g., "protocol", "firewall", "interface"

  const capitalized = `${buzzword} ${techNoun}`
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `Chapter: ${capitalized}`;
}