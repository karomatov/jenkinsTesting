import { test } from '@playwright/test';

test('Search for Playwright', async ({ page }) => {
    await page.goto('https://www.google.com');

    await page.waitForTimeout(4000);
    let inputElement = await page.locator('//textarea[@name="q"]');
    await inputElement.type('Playwright');
    await page.screenshot({ path: 'screenshot.png' });
    await page.waitForTimeout(4000);
    await page.keyboard.press('Enter');
    

});
