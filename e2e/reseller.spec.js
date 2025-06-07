import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'biller-auth.json' });

test('Add new reseller', async ({ page }) => {
  const companyName = faker.company.name();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yopmail.com`;
  const phoneNumber = `080${faker.string.numeric(8)}`;

  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');

  // ✅ Wait for dashboard to fully load
  await expect(page).toHaveURL(/biller\/dashboard/, { timeout: 10000 });

await page.getByText('Resellers', { exact: true }).click()
const addResellerBtn = page.locator('text=/add new reseller/i');
await expect(addResellerBtn).toBeVisible({ timeout: 20000 });
await addResellerBtn.click();


  await page.getByPlaceholder('Damilila Groceries').fill(companyName);
  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="phoneNumber"]').fill(phoneNumber);

 await page.getByRole('combobox', { name: 'Reseller type' }).click();
await page.getByRole('option', { name: 'Postpaid' }).click();

await page.getByText('Create reseller', { exact: true }).click();

// await expect(
//   page.locator('.flex-wrap').filter({ hasText: 'New reseller has been created' }).first() //This test passed after several trials
// ).toBeVisible({ timeout: 100000 });



});

test('Reseller Details Page', async ({ page }) => {

  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');

  // ✅ Wait for dashboard to fully load
  await expect(page).toHaveURL(/biller\/dashboard/, { timeout: 10000 });

await page.getByText('Resellers', { exact: true }).click()

// 1. Locate and fill the search input
const searchInput = page.locator('input[placeholder="Search by company name"]');
await searchInput.fill('Credit');
await page.waitForTimeout(1000); // or better: wait for an element
await expect(page.getByText('Credit Bank NG')).toBeVisible();

await page.locator('tr', { hasText: 'Credit Bank NG' }).click();
  // Wait for 5 seconds after clicking
  await page.waitForTimeout(5000);
  // Assert the new URL
  await expect(page).toHaveURL('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard/resellers/53aedc22-cd58-42d2-dc9f-08dcb6c7125a');
  // Save Reseller Details page session
  // Assert the new page contains the text
  await expect(page.locator('p.font-bold', { hasText: 'Credit Bank NG' })).toBeVisible();
   // Locate the status element
  const statusLocator = page.locator('div.inline-flex.font-medium', { hasText: /Active|Inactive/ });

  // Get the text content
  const statusText = await statusLocator.textContent();

  if (statusText?.trim() === 'Active') {
    console.log('Reseller is active. Proceeding with test...');
    // Continue test steps here
  } else if (statusText?.trim() === 'Inactive') {
    console.log('Reseller is inactive. Action Terminated');
    test.skip(); // Skip the rest of the test
  } else {
    throw new Error('Unexpected status text found: ' + statusText);
  }

}); //Test 2 passed after several trials

test('Reseller Actions - Top up Wallet', async ({ page }) => {
  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard/resellers/53aedc22-cd58-42d2-dc9f-08dcb6c7125a');

  // Open "Reseller actions" and click "Top up wallet"
  await page.getByText('Reseller actions').click();
  await page.getByText('Top up wallet', { timeout: 5000 }).click();

  const dialog = page.locator('div[role="dialog"]');

  const openDialog = page.locator('div[role="dialog"][data-state="open"]');
await expect(openDialog).toBeVisible({ timeout: 5000 });

    await expect(dialog.getByRole('heading'))
      .toContainText('Topup Wallet');


  // 3. Fill in the amount field
  const amountInput = dialog.locator('input[name="amount"]');
  await amountInput.fill('5000');

  // 4. Click the "Initiate" button
  const initiateBtn = dialog.locator('button:has-text("Initiate")');
  await initiateBtn.click();

  // Optionally, you can wait for toast or confirmation
});





test('Reseller Actions - Set Wallet Threshold', async ({ page }) => {
  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard/resellers/53aedc22-cd58-42d2-dc9f-08dcb6c7125a');

  // Open "Reseller actions" and click "Top up wallet"
  await page.getByText('Reseller actions').click();
  await page.getByText('Set wallet threshold', { timeout: 5000 }).click();
   const amountInput = page.locator('input[name="amount"]');
await expect(amountInput).toBeVisible({ timeout: 5000 });
await amountInput.fill('5000'); // or any other value you want



});