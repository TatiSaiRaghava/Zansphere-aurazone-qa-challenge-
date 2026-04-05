# Aurazone QA Automation Suite

## Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm init -y
npm install --save-dev @playwright/test
npx playwright install
```

### Run All Tests
```bash
npx playwright test tests.spec.js
```

### Run on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project="Mobile Chrome"
```

### View HTML Report
```bash
npx playwright show-report
```

## Test Cases Covered

| ID    | Test Case                                      | Type        |
|-------|------------------------------------------------|-------------|
| TC-01 | Homepage loads with logo, banner, CTA          | Functional  |
| TC-02 | Bottom navigation routes work correctly        | Navigation  |
| TC-03 | Products page loads without blank state        | Functional  |
| TC-04 | Empty cart shows message and Browse CTA works  | Functional  |
| TC-05 | Profile page shows auth gate for guests        | Auth/Security|

## Notes
- Tests are read-only and do not modify any data
- Rate limiting: tests include natural delays; do not run in parallel bursts
- Screenshots saved on failure in `test-results/` folder
