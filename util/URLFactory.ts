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
