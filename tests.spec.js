// Aurazone QA Automation - Playwright Test Suite
// Run: npx playwright test tests.spec.js

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://test.aurazone.shop';

// TC-01: Homepage loads successfully with key elements
test('TC-01: Homepage loads with logo, navigation, and banner', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Aurazone/i);
  // Logo visible
  const logo = page.locator('img[alt="Aurazone"]').first();
  await expect(logo).toBeVisible();
  // Hero banner visible
  const banner = page.locator('img[alt="Banner"]');
  await expect(banner).toBeVisible();
  // Shop Now CTA button present
  const shopNow = page.locator('a', { hasText: 'Shop Now' });
  await expect(shopNow).toBeVisible();
});

// TC-02: Navigation links route to correct pages
test('TC-02: Bottom navigation links work correctly', async ({ page }) => {
  await page.goto(BASE_URL);
  // Navigate to Explore
  await page.click('a[href="/explore"]');
  await expect(page).toHaveURL(`${BASE_URL}/explore`);
  await expect(page.locator('h1')).toContainText('Discover Your Perfect Shoe');
  // Navigate to Cart
  await page.click('a[href="/cart"]');
  await expect(page).toHaveURL(`${BASE_URL}/cart`);
  // Navigate to Wishlist
  await page.click('a[href="/wishlist"]');
  await expect(page).toHaveURL(`${BASE_URL}/wishlist`);
});

// TC-03: Products page loads (check for blank/broken state)
test('TC-03: Products page loads without blank content', async ({ page }) => {
  await page.goto(`${BASE_URL}/products`);
  await expect(page).toHaveTitle(/Aurazone/i);
  // Page should not be completely empty - check body has content
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.length).toBeGreaterThan(50);
});

// TC-04: Cart page shows empty state message
test('TC-04: Empty cart shows correct message and browse CTA', async ({ page }) => {
  await page.goto(`${BASE_URL}/cart`);
  const emptyMsg = page.locator('text=Your cart is empty');
  await expect(emptyMsg).toBeVisible();
  const browseBtn = page.locator('a', { hasText: 'Browse Products' });
  await expect(browseBtn).toBeVisible();
  await browseBtn.click();
  await expect(page).toHaveURL(`${BASE_URL}/products`);
});

// TC-05: Profile page requires login - shows auth gate
test('TC-05: Profile page shows login required message for unauthenticated users', async ({ page }) => {
  await page.goto(`${BASE_URL}/profile`);
  const authMsg = page.locator('text=Profile Access Required');
  await expect(authMsg).toBeVisible();
  // Both login and create account options should exist
  const loginBtn = page.locator('text=Log In to Continue');
  await expect(loginBtn).toBeVisible();
  const createBtn = page.locator('text=Create New Account');
  await expect(createBtn).toBeVisible();
});
