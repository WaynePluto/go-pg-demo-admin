import puppeteer, { Browser, Page } from "puppeteer";

describe("login 页面测试", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: process.env.ChromePath,
      headless: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    const pages = await browser.pages();
    if (pages.length === 1) {
      await browser.close();
    }
  });

  it("测试登录功能 - 成功登录", async () => {
    // 打开登录页面
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto("http://localhost:8080/login");

    // 等待登录表单加载完成
    await page.waitForSelector(".ant-pro-form-login-container");

    // 输入用户名
    const usernameInput = await page.$('input[id="username"]');

    await usernameInput?.type("administrator");

    // 输入密码
    const passwordInput = await page.$('input[id="password"]');
    await passwordInput?.type("123456");

    // 点击登录按钮
    const loginButton = await page.$('.ant-btn-primary[type="button"]');
    await loginButton?.click();

    // 等待登录完成并跳转到首页
    await page.waitForNavigation();

    // 验证是否成功跳转到首页
    expect(page.url()).toBe("http://localhost:8080/");

    // 验证首页内容是否加载
    const homePage = await page.locator(".home-page").wait();
    expect(homePage).toBeDefined();
  });

  it("测试登录功能 - 错误凭据", async () => {
    // 打开登录页面
    await page.goto("http://localhost:8080/login");

    // 等待登录表单加载完成
    await page.waitForSelector(".ant-pro-form-login-container");

    // 输入错误的用户名
    const usernameInput = await page.$('input[id="username"]');
    await usernameInput?.type("wronguser");

    // 输入错误的密码
    const passwordInput = await page.$('input[id="password"]');
    await passwordInput?.type("wrongpassword");

    // 点击登录按钮
    const loginButton = await page.$('.ant-btn-primary[type="button"]');
    await loginButton?.click();

    // 等待错误消息出现
    await page.waitForSelector(".ant-message-error", { timeout: 1000 });

    // 验证仍然在登录页面
    expect(page.url()).toBe("http://localhost:8080/login");
  });

  it("测试登录功能 - 表单验证", async () => {
    // 打开登录页面
    await page.goto("http://localhost:8080/login");

    // 等待登录表单加载完成
    await page.waitForSelector(".ant-pro-form-login-container");

    // 不输入任何内容直接点击登录
    const loginButton = await page.$('.ant-btn-primary[type="button"]');
    await loginButton?.click();

    // 等待表单验证错误消息
    await page.waitForSelector(".ant-form-item-explain-error");

    // 获取错误消息
    const errorMessages = await page.$$eval(".ant-form-item-explain-error", elements =>
      elements.map(el => el.textContent),
    );

    // 验证用户名和密码的必填验证
    expect(errorMessages.some(msg => msg?.includes("用户名是必填项"))).toBe(true);
    expect(errorMessages.some(msg => msg?.includes("密码是必填项"))).toBe(true);

    // 验证仍然在登录页面
    expect(page.url()).toBe("http://localhost:8080/login");
  });
});
