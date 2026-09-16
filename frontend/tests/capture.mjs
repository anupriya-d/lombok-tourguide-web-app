import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
await mkdir('test-results', { recursive: true });
for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4174', { waitUntil: 'domcontentloaded' });
  for (const image of await page.locator('img[loading="lazy"]').all()) await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `test-results/home-${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
