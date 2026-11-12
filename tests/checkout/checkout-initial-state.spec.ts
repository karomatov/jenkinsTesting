import { test, expect } from '@playwright/test';

test('shows the checkout summary and customer details form', async ({ page }) => {
  await page.goto('');

  await expect(page).toHaveTitle('Checkout | Cydeo');
  await expect(page.getByText('Start Application', { exact: true })).toBeVisible();
  await expect(page.getByText('Payment plan', { exact: true })).toBeVisible();
  await expect(page.getByText('Review', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Test Automation with Selenium' })).toBeVisible();
  await expect(page.getByText('$400', { exact: true })).toBeVisible();

  for (const name of ['First Name', 'Last Name', 'Email Address', 'Phone']) {
    await expect(page.getByRole('textbox', { name })).toBeVisible();
  }
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
});
