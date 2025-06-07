import { test, expect } from '@playwright/test';

test('Basic dashboard page load', async ({ page }) => {
  await page.goto('/merchants-list?page=1&pageSize=10');
  await expect(page).toHaveURL(/merchants-list/);
});
