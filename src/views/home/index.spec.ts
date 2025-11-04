import { getLoginBrower } from "@/utils/puppeteer-login";
import { Browser, Page } from "puppeteer";

describe("home 页面测试", () => {
  let testBrowser: Browser;
  let testPage: Page;

  beforeAll(async () => {
    const { browser, page } = await getLoginBrower();
    testBrowser = browser;
    testPage = page;
  });

  afterAll(async () => {
    await testPage.close();
    const pages = await testBrowser.pages();
    if (pages.length === 1) {
      await testBrowser.close();
    }
  });

  it("测试首页加载功能", async () => {
    await testPage.goto("http://localhost:8080/");
    // 验证首页内容是否加载
    const homePage = await testPage.locator(".home-page").wait();
    expect(homePage).toBeDefined();
  });
});
