import { LoginPage } from "../pages/login.page";
import { CampaignPage } from "../pages/campaign.page";
import {test, expect} from "@playwright/test";

test('Go to campaign dashboard', async ({ page }) => {
    let loginpage = new LoginPage(page);
    let campaignpage = new CampaignPage(page);
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    await campaignpage.goToCampaign();
    await expect(campaignpage.campaignHeader).toHaveCount(1);
});

test('Check order task link', async ({ page }) => {
    let loginpage = new LoginPage(page);
    let campaignpage = new CampaignPage(page);
    let productName = '6x4 Edgewrap Signboard';
    let expectedTaskName = 'Design Online';
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    await campaignpage.goToCampaign();
    await expect(campaignpage.campaignHeader).toHaveCount(1);
    await campaignpage.checkOrderTask(productName, expectedTaskName);
});