import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'biller-auth.json' });

test('Create Loyalty', async ({ page }) => {
    await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');
    
    // ✅ Wait for dashboard to fully load
    await expect(page).toHaveURL(/biller\/dashboard/, { timeout: 10000 });

await page.click('text=Loyalty Campaign');
await page.getByRole('button', { name: 'Create Loyalty Program' }).click();
await expect(page.getByRole('dialog', { name: 'Add new loyalty' })).toBeVisible();
await page.click('button:has-text("Select reseller")');
//await page.getByRole('button', { name: 'Select reseller' }).click();
await page.waitForSelector('input[placeholder="Search options..."]');
await page.fill('input[placeholder="Search options..."]', 'Sandbox Tester');
await page.keyboard.press('Enter');






});




