import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './e2e',
  globalSetup: './global-setup.mjs',
  workers: 1,
  use: {
    storageState: path.resolve('./auth.json'),
    headless: true,
    baseURL: 'https://qa-zeus-dashboard.hydrogenpay.com/',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]]
});
