import {test, expect} from '@playwright/test';

test.describe('Group Practice', () => {
    test.afterEach(async ({page}) => {
        console.log('After each taking screenshot...');
        await page.waitForTimeout(4000);
        await page.screenshot({ path: `screenshot-${Date.now()}.png` });
    });
    test('Test 1', async ({page}) => {
        await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
        await page.waitForTimeout(4000);
        let title = await page.title();
        console.log('Page title:', title);
        test.expect(title).toBe('Checkout | Cydeo');
    });

    // test('Test 2', async ({page}) => {
    //     await page.goto('https://www.google.com');
    //     await page.waitForTimeout(4000);
    //     let url = await page.url();
    //     console.log('Page URL:', url);
    // });
});

