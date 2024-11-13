import { Locator, Page, expect } from '@playwright/test';

export class HomePage{

readonly page: Page;
readonly countrySelected: Locator;


constructor(page: Page) {
    this.page = page;
    this.countrySelected = page.locator('//span[normalize-space(text())="USA - English"]')
}
}