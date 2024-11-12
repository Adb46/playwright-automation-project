import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
const dotenv = require('dotenv')
dotenv.config();

const config: PlaywrightTestConfig = {
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

export default config;
