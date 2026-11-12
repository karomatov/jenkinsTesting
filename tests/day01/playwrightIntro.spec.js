//const {test, expect} = require("@playwright/test");

import { test } from "@playwright/test";

test("My first test", async ({page}) => {
    await page.goto("https://www.google.com");
    await page.waitForTimeout(4000);
})