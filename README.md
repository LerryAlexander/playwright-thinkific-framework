# Thinkific AI Course Automation Framework

This repository contains a complete **Playwright + TypeScript** testing framework for automating core user flows of Thinkific's AI-powered course creation feature.

## 🚀 Features

- ✅ API-based authentication via Thinkific login
- ✅ AWS Secrets Manager logic for credentials
- ✅ AI course creation flow validation
- ✅ Adding chapters and text lessons
- ✅ Updating course details (title, description)
- ✅ Setting pricing
- ✅ Deleting courses
- ✅ Cloudflare challenge handling
- ✅ Page Object Model structure
- ✅ CI-ready with GitHub Actions
- ✅ HTML reports via GitHub Pages
- ✅ Run with Docker

---

## 🧱 Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Faker](https://fakerjs.dev/)
- [AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html) (Secrets Manager)
- [dotenv](https://www.npmjs.com/package/dotenv) for config/env management

---

## 🗂️ Project Structure

```text
project-root/
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions workflow for CI
├── config/
│   ├── constants.ts              # Centralized timeout values
│   └── urls.ts                   # Base URL and route constants
├── pages/                        # Page Object Model directory
│   ├── SignInPage.ts
│   ├── CoursePage.ts
│   ├── GenerateCoursePage.ts
│   ├── ManagePage.ts
├── tests/                        # Test cases (organized by flow or grouped)
│   ├── course-creation.spec.ts   
│   ├── course-settings.spec.ts   
│   └── course-deletion.spec.ts   
├── utils/
│   ├── aws/
│   │   └── secrets.ts            # AWS Secrets Manager logic for credentials
│   ├── helpers.ts                # Reusable login via API, wait logic, etc.
│   └── ui-constants.ts           # Centralized UI strings and labels
├── .env                          # Environment variables (e.g. AWS secrets and region)
├── .gitignore
├── package.json
├── playwright.config.ts         # Playwright config (reporters, projects, etc.)
├── tsconfig.json
└── README.md
```

---

## ✅ How to Run Tests

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your `.env`

```env
THINKIFIC_SECRET_NAME=Thinkific_Credentials_Course_Creator
AWS_REGION=us-east-1
```

### 3. Run all tests

```bash
npx playwright test --grep @regression
```

### 4. Run smoke tests

```bash
npx playwright test --grep @smoke
```

### 5. Run a specific test file

```bash
npx playwright test tests/course-creation.spec.ts
```

### 6. Run tests sequentially (no parallel execution)

```bash
npx playwright test --workers=1
```

### 7. Run tests with custom parallelism

```bash
npx playwright test --workers=4
```

## 🐳 Run Tests with Docker Compose


### 1. Run all tests

```bash
docker-compose up --build
```

### Open HTML report

```bash
npx playwright show-report
```

## 📦 GitHub Pages Test Report (Running from CI/CD Github actions)

➡️ **Test Report Link**  
* https://lerryalexander.github.io/playwright-thinkific-framework/

---

## 🧪 Sample Test Scenarios

- Generate Course with AI  
- Add Chapter  
- Add Text Lesson  
- Update Title & Description  
- Set One-Time Pricing    
- Delete Course  

---

## 🛡️ Authentication

Authentication is managed via the `loginViaAPI()` utility, which:
- Retrieves credentials securely from **AWS Secrets Manager**
- Reuses session cookies via *Playwright's `storageState`* for seamless login

---

## 🧠 Notes

- Built-in **retry logic** and `waitForAppReady()` utility
- Test data is dynamically generated using [`faker`](https://github.com/faker-js/faker)
- Locators follow best practices using `data-qa`, `role`, and `label`-based selectors for stability and readability

---





