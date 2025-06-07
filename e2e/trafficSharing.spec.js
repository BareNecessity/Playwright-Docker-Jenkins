import { test, expect } from '@playwright/test';

test.use({ storageState: 'biller-auth.json' });

test('Update Traffic Sharing', async ({ page }) => {
    await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');
    
    // Wait for dashboard to fully load
    await expect(page).toHaveURL(/biller\/dashboard/, { timeout: 10000 });
    const trafficSharing = page.getByText('Traffic Sharing');
await expect(trafficSharing).toBeVisible({ timeout: 5000 });
await trafficSharing.click();
await page.locator('table >> tr:nth-child(2) >> td:nth-child(3)').click();
await page.locator('button').filter({ hasText: 'Edit configuration' }).first().click();




});