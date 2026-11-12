import { test, expect } from '@playwright/test';

test('continues to payment plan after valid customer details', async ({ page }) => {
  await page.goto('');
  const email = `checkout.continue.${Date.now()}@example.com`;
  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
  await page.getByRole('textbox', { name: 'Phone' }).fill('2025550147');

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Choose a payment plan')).toBeVisible();
  await expect(page.getByRole('button', { name: /Upfront.*\$400/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /5 Installments.*\$100 per month/ })).toBeVisible();
});
