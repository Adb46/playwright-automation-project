import { Locator, Page, expect } from '@playwright/test';

export class HomePage{

readonly page: Page;
readonly acceptCookies: Locator;


constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.locator('wb7-button.button.button--accept-all[data-test="handle-accept-all-button"]')
}
}