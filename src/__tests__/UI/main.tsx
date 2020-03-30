import puppeteer from "puppeteer";

describe("Main UI tests", () =>{
  let browser:puppeteer.Browser;
  let page:puppeteer.Page;
  // headless: false,
  // devtools: true,
  // slowMo: 250
  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    page.close()
  });

  afterAll(() => {
    browser.close()
  });

  it("View", async() => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1', { visible: true});
    await page.screenshot({path: 'src/__tests__/UI/screen/home.png'});
    await page.click('[href="/calc"]');
    await page.waitForSelector('[data-testid="title"]', { visible: true});
    await page.screenshot({path: 'src/__tests__/UI/screen/calc.png'});
    await page.emulate(puppeteer.devices['iPhone 5 landscape'])
    await page.screenshot({path: 'src/__tests__/UI/screen/calc-iphone5-l.png'});
  })
})
