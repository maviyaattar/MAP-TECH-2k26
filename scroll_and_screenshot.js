const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:8080');
  
  // Scroll to payment section
  await page.evaluate(() => {
    window.scrollTo(0, 1800);
  });
  
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'payment-section.png' });
  
  await browser.close();
})();
