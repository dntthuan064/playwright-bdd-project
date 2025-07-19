# BrowserStack Integration Setup

This guide will help you set up and run your Playwright BDD tests on BrowserStack.

## Prerequisites

1. **BrowserStack Account**: Sign up for a free trial at [BrowserStack](https://www.browserstack.com/)
2. **Node.js**: Version 14+ installed on your machine
3. **BrowserStack Credentials**: Get your username and access key from your BrowserStack account profile

## Configuration

### 1. Set up Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# BrowserStack Configuration
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
BROWSERSTACK_WS_ENDPOINT=wss://cdp.browserstack.com/playwright

# Test Configuration
E2E_TAGS=@smoke
SKIP_TAG=@skip
```

### 2. Update browserstack.yml

Edit the `browserstack.yml` file and replace the placeholder values:

```yaml
userName: YOUR_ACTUAL_USERNAME
accessKey: YOUR_ACTUAL_ACCESS_KEY

platforms:
  - os: Windows
    osVersion: 11
    browserName: chrome
    browserVersion: latest
  - os: OS X
    osVersion: Ventura
    browserName: playwright-webkit
    browserVersion: latest
  - deviceName: Samsung Galaxy S23 Ultra
    browserName: chrome
    osVersion: 13.0
```

## Running Tests on BrowserStack

### Available Scripts

1. **Run tests on all BrowserStack Devide (include browers and mobile)**:

   ```bash
   yarn e2e:browserstack
   ```

2. **Run tests with specific tags on BrowserStack**:

   ```bash
   E2E_TAGS=@smoke yarn e2e:browserstack
   ```

### Manual BrowserStack Execution

You can also run tests manually using the BrowserStack CLI:

```bash
# Install BrowserStack CLI (if not already installed)
yarn add browserstack-cli

# Run tests using browserstack.yml configuration
browserstack run playwright test
```

## BrowserStack Dashboard

After running tests, you can view the results on the [BrowserStack Automate Dashboard](https://automate.browserstack.com/).

### BrowserStack Device List

Visit [BrowserStack's device list](https://www.browserstack.com/list-of-browsers-and-platforms/automate) to see all available devices and browsers.

## Supported Browsers and Platforms

The current configuration supports:

- **Desktop Browsers**:
  - Chrome on Windows 11
  - Firefox on Windows 11
  - Safari on macOS Ventura

- **Mobile Browsers**:
  - Chrome on Samsung Galaxy S23 Ultra (Android 13)

- **Popular Android Devices**
  - Samsung Galaxy S23 Ultra
  - Google Pixel 7
  - OnePlus 9
  - Samsung Galaxy Tab S8
  - Xiaomi Redmi Note 12

- **Popular iOS Devices**
  - iPhone 15 Pro
  - iPhone 14
  - iPad Pro 12.9 2022
  - iPad Air 2022
  - iPhone SE 2022

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure your BrowserStack username and access key are correct
2. **Connection Issues**: Check your internet connection and firewall settings
3. **Test Timeouts**: Increase timeout values in `playwright.config.ts` if needed
4. **Device Not Found**: Check the exact device name on BrowserStack's device list
5. **Browser Version Issues**: Use "latest" for the most recent version
6. **OS Version Mismatch**: Ensure OS version matches the device specification

### Debug Mode

To run tests in debug mode on BrowserStack:

```bash
yarn e2e:debug --project=browserstack-chrome
```

## Additional Resources

- [BrowserStack Playwright Documentation](https://www.browserstack.com/docs/automate/playwright/getting-started/nodejs)
- [BrowserStack Capabilities](https://www.browserstack.com/list-of-browsers-and-platforms/automate)
- [BrowserStack Support](https://www.browserstack.com/support)

## Notes

- Tests run on BrowserStack will be slower than local tests due to network latency
- BrowserStack provides real device testing capabilities
- You can customize the `browserstack.yml` file to test on different browser-OS combinations
- The integration maintains compatibility with your existing BDD setup
