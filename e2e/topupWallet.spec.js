import { test, expect } from '@playwright/test';

test('Reseller Actions - Top up Wallet', async ({ page }) => {
  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard/resellers/53aedc22-cd58-42d2-dc9f-08dcb6c7125a');

  // Open "Reseller actions" and click "Top up wallet"
  await page.getByText('Reseller actions').click();
  await page.getByText('Top up wallet', { timeout: 5000 }).click();
// 1. Wait for the input to be ready (combines existence and visibility checks)
await page.locator('input[name="amount"]').waitFor({ state: 'visible' });

// 2. Clear existing values (if any) using force: true to bypass actionability checks
await page.locator('input[name="amount"]').clear({ force: true });

// 3. Fill the input with retries and verification
await page.locator('input[name="amount"]').fill('1000', {
  timeout: 5000, // Extended timeout for slow forms
  noWaitAfter: false // Ensures proper waiting
});

// 4. Verify the input actually received the value
await expect(page.locator('input[name="amount"]')).toHaveValue('1000', {
  timeout: 3000 // Allow time for potential form validation
});

});