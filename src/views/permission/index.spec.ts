import { getLoginBrower } from "@/utils/puppeteer-login";
import { Browser, Page } from "puppeteer";

describe("权限管理页面测试", () => {
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

  it("测试页面加载功能", async () => {
    await testPage.goto("http://localhost:8080/permission");
    // 验证内容是否加载
    const content = await testPage.locator(".permission-page").wait();
    expect(content).not.toBeNull();
  });

  it("测试新增权限功能", async () => {
    await testPage.click(".add-permission");
    // 只写必填项
    // 输入权限名称
    const permissionName = "测试权限" + Math.floor(Math.random() * 10000);
    const addNameInput = await testPage.$('input[id="permission-form-name"]');
    await addNameInput?.type(permissionName);

    // 输入权限编码
    const permissionCode = "PERMISSION_TEST_" + Math.floor(Math.random() * 10000);
    const addCodeInput = await testPage.$('input[id="permission-form-code"]');
    await addCodeInput?.type(permissionCode);

    // 输入权限所属
    const permissionResource = "测试资源";
    const addResourceInput = await testPage.$('input[id="permission-form-resource"]');
    await addResourceInput?.type(permissionResource);

    // 点击确认按钮
    const addSubmitButton = await testPage.$('button[id="permission-form-submit"');
    await addSubmitButton?.click();
    // 验证添加成功提示语
    const addMsg = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(addMsg).not.toBeNull();

    // 等待提示消失
    await new Promise(resolve => setTimeout(resolve, 500));
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的第1个td元素也就是名称，在下面的span的文本
    const addedSpanText = await testPage
      .locator("tbody tr:nth-child(2) td:nth-child(1) span")
      .map(el => el.textContent)
      .wait();
    expect(addedSpanText).toContain(permissionName);
  });

  it("测试编辑权限功能", async () => {
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的最后一个td元素, 下面的div, 下面的第一个button
    const editButton = await testPage.$("tbody tr:nth-child(2) td:last-child div button:first-child");
    await editButton?.click();
    // 等待获取权限详情接口返回
    await new Promise(resolve => setTimeout(resolve, 500));
    const editPermissionName = "测试权限" + Math.floor(Math.random() * 10000);
    const editNameInput = await testPage.$('input[id="permission-form-name"]');
    await editNameInput?.evaluate(el => (el.value = ""));
    await editNameInput?.type(editPermissionName);

    // 点击确认按钮
    const editSubmitButton = await testPage.$('button[id="permission-form-submit"');
    await editSubmitButton?.click();
    // 验证编辑成功提示语
    const editMsg = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(editMsg).not.toBeNull();
    // 等待接口返回
    await new Promise(resolve => setTimeout(resolve, 500));
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的第1个td元素也就是名称单元格，在下面的span的文本
    const editSpanText = await testPage
      .locator("tbody tr:nth-child(2) td:nth-child(1) span")
      .map(el => el.textContent)
      .wait();
    expect(editSpanText).toContain(editPermissionName);
  });

  it("测试删除权限功能", async () => {
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的最后一个td元素, 下面的div, 下面的第二个button
    const deleteButton = await testPage.$("tbody tr:nth-child(2) td:last-child div button:nth-child(2)");
    await deleteButton?.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    // 点击确认按钮
    const deleteSubmitButton = await testPage.$(".ant-popconfirm-buttons button:last-child");
    await deleteSubmitButton?.click();
    // 验证删除成功提示语
    const deleteMsg = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(deleteMsg).not.toBeNull();
  });
});
