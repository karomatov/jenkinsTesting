import { test } from '@playwright/test';

test('My first test', async ({ page }) => {
    // Navigate to the URL
    await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
    let title = await page.title();
    console.log('Page title:', title);

    // Wait for 4 seconds
    await page.waitForTimeout(4000);
});

test('Get URL', async ({ page }) => {
    // Navigate to the URL
    await page.goto('');
    let url = await page.url();
    await page.waitForTimeout(4000);
    console.log('Page URL:', url);
});
