import { chromium, firefox, webkit } from '@playwright/test';

const capabilities = {
  'bstack:options': {
    userName: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    os: 'Windows',
    osVersion: '11',
    browserVersion: 'latest',
    projectName: 'Playwright BDD Project',
    buildName: 'Playwright BDD Build',
    sessionName: 'Playwright BDD Test'
  }
};

const browserstackConfig = {
  capabilities,
  browsers: [
    {
      name: 'chrome',
      use: {
        ...chromium,
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`
        }
      }
    },
    {
      name: 'firefox',
      use: {
        ...firefox,
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            ...capabilities,
            'bstack:options': {
              ...capabilities['bstack:options'],
              browserName: 'firefox'
            }
          }))}`
        }
      }
    },
    {
      name: 'safari',
      use: {
        ...webkit,
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            ...capabilities,
            'bstack:options': {
              ...capabilities['bstack:options'],
              browserName: 'safari'
            }
          }))}`
        }
      }
    }
  ]
};

export default browserstackConfig; 