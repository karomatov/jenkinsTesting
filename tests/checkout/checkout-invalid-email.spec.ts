import { test, expect } from '@playwright/test';

test('rejects an invalid email address', async ({ page }) => {
  await page.goto('');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('not-an-email');
  await page.getByRole('textbox', { name: 'Phone' }).fill('2025550147');

  const email = page.getByRole('textbox', { name: 'Email Address' });
  await expect(email).toHaveValue('not-an-email');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Enter personal details')).toBeVisible();
  await expect.poll(() => email.evaluate((input: HTMLInputElement) => input.validity.typeMismatch)).toBe(true);
});
