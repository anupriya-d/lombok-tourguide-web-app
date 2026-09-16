import { test, expect } from '@playwright/test';
test('homepage, carousel, local images and responsive layout', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Discover the Real Lombok' })).toBeVisible();
  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect(page.getByRole('heading', { name: 'A little island. A big adventure.' })).toBeVisible();
  await page.getByRole('button', { name: 'Previous slide' }).click();
  await expect(page.getByRole('heading', { name: 'Discover the Real Lombok' })).toBeVisible();
  await expect(page.locator('.tour-card')).toHaveCount(4);
  for (const img of await page.locator('img[loading="lazy"]').all()) await img.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});
test('search filters persist in URL and can be reset', async ({ page }) => {
  await page.goto('/');
  await page.locator('select[name="destination"]').selectOption('rinjani');
  await page.getByRole('button', { name: 'Search Tours', exact: true }).click();
  await expect(page).toHaveURL(/destination=rinjani/);
  await expect(page.locator('.tour-card')).toHaveCount(1);
  await page.getByLabel('Activity', { exact: true }).selectOption('snorkeling');
  await expect(page.getByRole('heading', { name: 'No tours found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.tour-card')).toHaveCount(4);
});
test('tour and destination routes and unavailable slugs', async ({ page }) => {
  await page.goto('/tours');
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByRole('heading', { name: 'Mount Rinjani Trekking' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your sample itinerary' })).toBeVisible();
  await page.getByRole('link', { name: 'Ask About This Tour' }).click();
  await expect(page.getByText('Interested in Mount Rinjani Trekking?')).toBeVisible();
  await page.goto('/destinations');
  await page.locator('.destination-card').filter({ hasText: 'Gili Islands' }).click();
  await expect(page.getByRole('heading', { name: 'Gili Islands', exact: true })).toBeVisible();
  await expect(page.locator('.tour-card')).toHaveCount(1);
  await page.goto('/destinations/pink-beach');
  await expect(page.getByRole('heading', { name: 'More adventures are on the way' })).toBeVisible();
  await page.goto('/tours/missing-tour');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});
test('navigation and mobile menu', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'mobile') { await page.getByRole('button', { name: 'Open menu' }).click(); await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true'); }
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Destinations' }).click();
  await expect(page.getByRole('heading', { name: 'Find your kind of paradise' })).toBeVisible();
  if (testInfo.project.name === 'mobile') await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
