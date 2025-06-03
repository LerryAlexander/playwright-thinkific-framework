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
- ❌ CI-ready with GitHub Actions
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

## ✅ Set Up to Run Tests Locally

### 1. Install dependencies

```bash
npm install
```

### 🔐 AWS Credentials Setup (Required for Local Test Execution)

In order to fetch secure login credentials from **AWS Secrets Manager**, you need to set up your AWS credentials locally. This step is **required** to run the tests using `loginViaAPI()`.

#### 🪪 Step-by-Step Instructions

1. **Create AWS credentials directory** (if it doesn’t exist):

    ```bash
    mkdir -p ~/.aws
    ```

2. **Create the credentials file**:

    ```bash
    touch ~/.aws/credentials
    ```

3. **Edit the file** and paste the following:

    ```ini
    [default]
    aws_access_key_id=THE_ACCESS_KEY
    aws_secret_access_key=THE_SECRET_KEY
    ```

    > 🔒 Replace `THE_ACCESS_KEY` and `THE_SECRET_KEY` with values **I will be sharing privately**.

4. **Create the configuration file** (optional but recommended):

    ```bash
    touch ~/.aws/config
    ```

5. **Edit `~/.aws/config`** and set your region:

    ```ini
    [default]
    region=us-east-1
    ```

---

### 2. Configure your `.env`

```env
THINKIFIC_SECRET_NAME=Thinkific_Credentials_Course_Creator
AWS_REGION=us-east-1
```
## ✅ Running Tests Locally

### 1. Run all tests

```bash
npx playwright test --grep @regression
```

### 2. Run smoke tests

```bash
npx playwright test --grep @smoke
```

### 3. Run a specific test file

```bash
npx playwright test tests/course-creation.spec.ts
```

### 4. Run tests sequentially (no parallel execution)

```bash
npx playwright test --workers=1
```

### 5. Run tests with custom parallelism

```bash
npx playwright test --workers=4
```

### Open HTML report

```bash
npx playwright show-report
```

## ✅ Running Tests from GitHub Actions 

The CI/CD pipeline is configured using **GitHub Actions** to:
- Automatically run all tests on each push to the `main` branch
- Generate an HTML test report
- (Intended to) deploy the report to **GitHub Pages**

> To manually trigger the pipeline, just push code to the `main` branch or use the "Re-run jobs" option in the Actions tab.

---

## 📦 GitHub Pages Test Report (Running from CI/CD GitHub Actions)

❌ **Currently not working as expected**

➡️ **Intended Test Report Link**  
* https://lerryalexander.github.io/playwright-thinkific-framework/

> ⚠️ I encountered a deployment issue in the GitHub Pages step of the pipeline that I didn’t have time to fully resolve before submission. The report generation works locally, and the project is set up correctly for eventual GitHub Pages deployment.

## 🐳 Run Tests with Docker Compose


### 1. Run all tests

```bash
docker-compose up --build
```

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

## 🔮 Future Improvements

- **✅ Full CI/CD Execution via GitHub Actions**  
  Although the test suite executes successfully, the deployment to GitHub Pages is currently not functioning due to a CI/CD pipeline issue. A future improvement would be to fully stabilize the workflow so that reports are automatically published on every push to `main`.

- **🧪 Expand UI Test Coverage**  
  Additional test scenarios can be implemented to cover:
  - Visual elements
  - Verification of dynamic titles, subtitles, and content blocks
  
- **🚫 Negative Test Scenarios**  
  - Course creation with invalid or incomplete data
  - Navigation edge cases like "Back" button behavior
  - Validation errors for empty or duplicate input fields

- **📊 Test Results Dashboard**  
  Integrate a visual dashboard or reporting system such as TestRail.





