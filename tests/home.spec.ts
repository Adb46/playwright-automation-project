import { test as base, expect } from '@playwright/test';
import { HomePage } from './Pages/HomePage';
import URLFactory from '../util/URLFactory';

// Extend test with "homePage" fixture
const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    // Get the environment page and initialize the HomePage class
    await new URLFactory().getEnvironmentPage(page);
    const homePage = new HomePage(page); // Initialize HomePage after navigation
    await use(homePage); // Provide homePage to the test
  },
});

test('Check country selected', async ({ homePage }) => {
  // Assert that the country "USA - English" is selected
  await expect(homePage.countrySelected).toBeVisible();
});
