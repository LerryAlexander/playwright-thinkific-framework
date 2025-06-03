import { Page, Locator } from '@playwright/test';
import { baseUrl, routes } from '../config/urls';
import { TIMEOUTS } from '../config/constants'; 

export class SignInPage {
  readonly page: Page;
  private emailField: Locator;
  private passwordField: Locator;
  private signInButton: Locator;

  private onboardingEmailField: Locator;
  private onboardingPasswordField: Locator;
  private onboardingSignInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('#user\\[email\\]');
    this.passwordField = page.locator('#user\\[password\\]');
    this.signInButton = page.locator('#sign-in');

    // Onboarding login locators
    this.onboardingEmailField = page.locator('#onboarding_tenant_info_email');
    this.onboardingPasswordField = page.locator('#onboarding_tenant_info_password');
    this.onboardingSignInButton = page.locator('[data-qa="proceed__btn"]');
  }

  async gotoSignIn(): Promise<void> {
    await this.page.goto(`${baseUrl}${routes.signIn}`);
  }

  async loginViaUI(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signInButton.click();
    await this.page.waitForURL(`**${routes.manage}`, { timeout: TIMEOUTS.long });
  }

  async loginViaOnboardingUI(email: string, password: string): Promise<void> {
    await this.page.goto(`${baseUrl}${routes.onboardingSignIn}`);
    await this.onboardingEmailField.fill(email);
    await this.onboardingPasswordField.fill(password);
    await this.onboardingSignInButton.click();
    await this.page.waitForURL(`**${routes.manage}`, { timeout: TIMEOUTS.long });
  }

}
