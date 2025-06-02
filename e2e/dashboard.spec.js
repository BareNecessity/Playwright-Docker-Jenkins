import { test, expect } from '@playwright/test';

// test('Basic dashboard page load', async ({ page }) => {
//   await page.goto('/merchants-list?page=1&pageSize=10');
//   await expect(page).toHaveURL(/merchants-list/);
// });


test.use({ storageState: 'auth.json' });
test('Run test on dashboard as logged-in user', async ({ page }) => {
    test.setTimeout(120000);
  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/merchants-list');

  // Continue with your dashboard tests...
 await page.getByRole('button', { name: 'More' }).click();
await page.getByRole('menuitem', { name: 'Reseller' }).click();

// ✅ Wait for visible "Dashboard" text in body
await page.waitForSelector('text=Dashboard');

// ✅ Confirm the correct page loaded
await expect(page).toHaveURL('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');

    // Save Reseller page session
    await page.context().storageState({ path: 'biller-auth.json' });
  });
