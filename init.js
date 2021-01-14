const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    args: ['--start-maximized=true']
  });
  const page = await browser.newPage();
  await page.goto('https://facebook.com');

  const endpoint = browser.wsEndpoint();
  console.log('Endpoint', endpoint);
})();
