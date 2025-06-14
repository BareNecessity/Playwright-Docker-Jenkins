import { chromium, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://qa-zeus-dashboard.hydrogenpay.com/', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });

    await page.fill('input[placeholder="herbert.wigwe@hydrogenpay.com"]', process.env.LOGIN_EMAIL);
    await page.fill('input[placeholder="........"]', process.env.LOGIN_PASSWORD);
    await page.keyboard.press('Tab');
    await page.click('button:has-text("Login")');

    await page.waitForURL(/\/verify/, { timeout: 15000 });

    const otp = '123456';
    for (let i = 0; i < otp.length; i++) {
      await page.fill(`input[aria-label="Please enter OTP character ${i + 1}"]`, otp[i]);
    }

    await page.click('button:has-text("Verify")');
    await page.waitForURL('**/merchants-list?page=1&pageSize=10', { timeout: 30000 });

    await context.storageState({ path: path.resolve(__dirname, 'auth.json') });
    console.log('✅ Saved session to auth.json');

 
    const moreBtn = page.getByText('More');
await expect(moreBtn).toBeVisible();
await moreBtn.click();

const fourthItem = page.locator('div[role="menu"] >> p[role="menuitem"]').nth(3);
await expect(fourthItem).toBeVisible({ timeout: 5000 });
await fourthItem.click();



    await page.waitForURL(url => url.toString().includes('/biller/dashboard'), { timeout: 30000 });

    
    await context.storageState({ path: path.resolve(__dirname, 'biller-auth.json') });
    console.log(' Saved session to biller-auth.json');
  } catch (error) {
    console.error(' Global setup failed:', error.message);
    await page.screenshot({ path: path.resolve(__dirname, 'global-setup-error.png') });
    process.exit(1);
  }

  await browser.close();
}
