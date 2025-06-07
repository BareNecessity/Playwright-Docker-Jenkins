import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'biller-auth.json' });

test('Add new reseller', async ({ page }) => {
  const companyName = faker.company.name();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yopmail.com`;
  const phoneNumber = `080${faker.string.numeric(8)}`;

  await page.goto('/biller/dashboard');

  const addResellerBtn = page.getByText('Add new reseller', { exact: true });
  await expect(addResellerBtn).toBeVisible({ timeout: 20000 });
  await addResellerBtn.click();

  await page.getByPlaceholder('Damilila Groceries').fill(companyName);
  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="phoneNumber"]').fill(phoneNumber);

  await page.getByRole('combobox', { name: 'Select Option' }).click();
  await page.getByRole('option', { name: 'Postpaid' }).click();

  await page.getByText('Create reseller', { exact: true }).click();

  const toast = page.locator('.toast:has-text("Reseller created successfully")');
  await expect(toast).toBeVisible({ timeout: 15000 });
});
