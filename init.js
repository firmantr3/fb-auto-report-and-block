const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized=true'],
    defaultViewport: null,
  });
  const pages = await browser.pages();
  const page = pages.length ? pages[0] : await browser.newPage();

  await page.goto('https://facebook.com');

  const endpoint = browser.wsEndpoint();
  console.log('Endpoint', endpoint);
})();
