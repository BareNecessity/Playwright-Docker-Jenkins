import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'biller-auth.json' });

test('Add new Provider', async ({ page }) => {
  const providerName = faker.company.name();
const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const providerEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yopmail.com`;
  const providerPhoneNumber = `080${faker.string.numeric(8)}`;

  await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');

  // ✅ Wait for dashboard to fully load
  await expect(page).toHaveURL(/biller\/dashboard/, { timeout: 10000 });

  await page.getByText('Providers', { exact: true }).click()
const addProviderBtn = page.locator('text=/add new provider/i');
await expect(addProviderBtn).toBeVisible({ timeout: 20000 });
await addProviderBtn.click();

await page.getByPlaceholder('Provider Name').fill(providerName);
await page.locator('input[name="email"]').fill(providerEmail);
await page.getByPlaceholder('Phone Number').fill(providerPhoneNumber);
await page.getByText('Create provider', { exact: true }).click();



await page.click('section:nth-child(3) .text-sm');

const toast = page
  .locator('section[aria-label="Notifications alt+T"]')
  .getByText('Provider created successfully')
  .first();

// await expect(toast).toBeVisible({ timeout: 10000 });
// await expect(toast).toBeHidden({ timeout: 10000 });


});

test('Disable Provider', async ({ page }) => {

await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/biller/dashboard');
await page.getByText('Providers', { exact: true }).click()
// Resize window to 1068 x 945
  await page.setViewportSize({ width: 1068, height: 945 });

  const allEmails = await page.locator('div.text-start.lowercase').allTextContents();
console.log('Visible emails:', allEmails);


const email = page.getByText('provider+64160@yopmail.com', { exact: true });
await expect(email).toBeVisible({ timeout: 10000 });

await Promise.all([
  page.waitForNavigation(),
  email.click()
]);



  // 1. Click the <p> tag with text 'Provider actions' to open the dropdown
await page.getByText('Provider actions', { exact: true }).click();

// 2. Wait for the toggle to appear (optional but safer)
await page.locator('button#disable-enable-provider').waitFor({ state: 'visible', timeout: 5000 });

// 3. Click the second toggle (based on your description, assuming there's more than one)
await page.locator('button#disable-enable-provider').nth(1).click();


});