import { defineConfig, devices } from '@playwright/test';

const externalPreview = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: externalPreview || 'http://127.0.0.1:4173',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: externalPreview ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
});
