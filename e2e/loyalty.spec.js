import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'biller-auth.json' });

test('Update Loyalty', async ({ page }) => {
    await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');
    
    // Wait for dashboard to fully load
    await expect(page).toHaveURL(/biller\/dashboard/, { timeout: 10000 });

await page.click('text=Loyalty Campaign');

const firstLink = page.getByText('New Sanbox Reseller Limited', { exact: true }).first();
await expect(firstLink).toBeVisible({ timeout: 5000 });
await firstLink.click();



// Now click the first matching campaign link
await page.locator('a[href^="/biller/dashboard/loyalty-campaign/"]').first().click();


const editCampaign = page.getByText('Edit campaign'); //Click the Edit Campaign button
await expect(editCampaign).toBeVisible({ timeout: 5000 });
await editCampaign.click();

const inputField = page.locator('input[inputmode="numeric"]');
// Clear existing value
await inputField.fill('');
// Then type new value
await inputField.type('13'); // replace with your desired value

// Select the Start Date
const startDateTrigger = page.locator('div[aria-haspopup="dialog"]').nth(0); // picks the 2nd one
await expect(startDateTrigger).toBeVisible();
await startDateTrigger.click();
//Wait for date picker dialog to appear
await page.waitForSelector('button[name="day"]', { timeout: 5000 });
// Get all day buttons *except* the one with `aria-selected="true"` (today)
const futureStartDate = page.locator('button[name="day"]:not([aria-selected="true"])');
// Click the first future date
await futureStartDate.nth(0).click();
// Close the Start Date dialog
await page.locator('div[data-state="open"][class*="bg-black"]').click();


// Select the End Date 
const endDateTrigger = page.locator('div[aria-haspopup="dialog"]').nth(1); // picks the 2nd one
await expect(endDateTrigger).toBeVisible();
await endDateTrigger.click();
//Wait for date picker dialog to appear
await page.waitForSelector('button[name="day"]', { timeout: 5000 });
// Get all day buttons *except* the one with `aria-selected="true"` (today)
const futureEndDate = page.locator('button[name="day"]:not([aria-selected="true"])');
// Click the first future date
await futureEndDate.nth(0).click();
//Close the End Date dialog
await page.locator('div[data-state="open"][class*="bg-black"]').click();

//Click the Confirm button to save changes
await page.getByRole('button', { name: 'Confirm changes' }).click({ force: true });




});




