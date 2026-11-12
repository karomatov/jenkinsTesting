import { test, expect } from '@playwright/test';

test('requires mandatory customer details before continuing', async ({ page }) => {
  await page.goto('');

  const requiredFields = ['First Name', 'Last Name', 'Email Address', 'Phone'];
  for (const name of requiredFields) {
    const field = page.getByRole('textbox', { name });
    await expect(field).toBeVisible();
    await expect(field).toHaveAttribute('required', '');
  }

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Enter personal details')).toBeVisible();
  for (const name of requiredFields) {
    const field = page.getByRole('textbox', { name });
    await expect.poll(() => field.evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  }
});
