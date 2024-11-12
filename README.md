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

