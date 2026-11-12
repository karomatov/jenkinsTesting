import { test, expect } from '@playwright/test';

test('carries the selected payment plan into review without submitting payment', async ({ page }) => {
  await page.goto('');
  const email = `checkout.review.${Date.now()}@example.com`;
  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
  await page.getByRole('textbox', { name: 'Phone' }).fill('2025550147');
  await page.getByRole('button', { name: 'Next' }).click();

  const upfrontPlan = page.getByRole('button', { name: /Upfront.*\$400/ });
  await expect(upfrontPlan).toBeVisible();
  await upfrontPlan.click();
  await expect(upfrontPlan).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Subtotal', { exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: /Upfront/ }).getByText('$400', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Review', { exact: true })).toBeVisible();
  await expect(page.getByRole('progressbar')).toBeHidden();
  await expect(page.getByText('Product Price', { exact: true })).toBeVisible();
  await expect(page.getByText('Upfront discount', { exact: true }).last()).toBeVisible();
  await expect(page.getByText('Subtotal', { exact: true }).last()).toBeVisible();
  await expect(page.getByText('Processing fee', { exact: true })).toBeVisible();
  await expect(page.getByText('Total', { exact: true })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: /I have read and agree to the Terms and Conditions/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pay' })).toBeDisabled();
});
