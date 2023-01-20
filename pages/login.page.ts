//login.page.ts
import { expect, Locator, Page } from '@playwright/test';
export class LoginPage {
 readonly url ="https://live.campaigntrack.com/";
 readonly page: Page;
 readonly txtUsername: Locator;
 readonly txtPassword: Locator;
 readonly btnLogin: Locator;
 readonly userInfo: Locator


constructor(page: Page) {
this.page = page;
this.txtUsername = page.locator('#txtUsername');
this.txtPassword = page.locator('#txtPassword');
this.btnLogin = page.locator('#btnLogin');
this.userInfo = page.locator('#ctHeader')
}

async loginValidAccount(){
    await this.page.goto(this.url);
    await this.txtUsername.fill('ex001');
    await this.txtPassword.fill('track123');
    await this.btnLogin.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('ct-header');
}

}