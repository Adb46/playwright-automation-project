# playwright-automation-project
 
How to configure playwright to a project from start:
 
1--Goto extensions and install (Playwright Test for VSCode)
 
2--Open command pallete (Ctrl+Shift+P) and type (Install Playwright)
   This will add all the dependencies

3--Goto Playwright config file and delete (unnecessary browsers and local dev server code)

4-- import type { PlaywrightTestConfig } from '@playwright/test'
    import { devices } from '@playwright/test'
    const dotenv = require('dotenv')
    dotenv.config();
   
5-- Add this setup in config file:
   (const config: PlaywrightTestConfig = {
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 10000
  },

  reportSlowTests: null,

  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    actionTimeout: 0,
  },
  fullyParallel: false,

  grepInvert: [/@pre/, /@mobileOnly/, /@slow/, /@screenshot/],

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
};

export default config;)

6-- Run npm install dotenv
-------------------------------------------------------------------------------------------------------------------------------------

1. Create a .env file and add
   # Laerdal URL (Environment-specific)
   URL_LAERDAL="https://laerdal.com/us/"

   # Environment settings for Laerdal URL as PROD or DEV
   NODE_ENV="PROD"  # Set your environment name

2.Create a folder named util and create a file called URLFactory.ts
  import * as dotenv from 'dotenv';
  import { Page } from '@playwright/test';

  dotenv.config();

  export default class UrlFactory {
    // Method to fetch the URL based on environment, accepting a 'course' argument
    async getURL(course: string = 'main'): Promise<string> {
      const environment = process.env.NODE_ENV;

      switch (environment) {
        case 'PROD':
          return process.env.URL_LAERDAL || '';
        case 'DEV':
          return process.env.URL_LAERDAL_DEV || ''; // Optionally, add a development URL here
        default:
          throw new Error('Environment not set or URL missing');
      }
    }

    // Method to get the environment page, accepting a 'course' argument
    async getEnvironmentPage(page: Page, course: string = 'main'): Promise<Page> {
      const url = await this.getURL(course); // Call the getURL method with the 'course' argument
      await page.goto(url, { waitUntil: 'networkidle' }); // Go to the environment-specific URL
      return page;
    }
  }

============================================================================================================================
1. Create a page file(For ex)

  import { Locator, Page, expect } from '@playwright/test';

  export class HomePage{

  readonly page: Page;
  readonly countrySelected: Locator;


  constructor(page: Page) {
      this.page = page;
      this.countrySelected = page.locator('//span[normalize-space(text())="USA - English"]')
  }
  }

2. Create a spec file(For ex)

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



