import { LoginPage } from "../pages/login.page";
import { CampaignPage } from "../pages/campaign.page";
import { ShoppingCartPage } from "../pages/shoppingcart.page";
import {test, expect} from "@playwright/test";


test('Multiple template types', async ({ page }) => {
    let loginpage = new LoginPage(page);
    let campaignpage = new CampaignPage(page);
    let productName = '6x4 Edgewrap Signboard';
    let expectedTaskName = 'Design Online';
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    await campaignpage.goToCampaign();
    await expect(campaignpage.campaignHeader).toHaveCount(1);
    let shoppingcartpage = new ShoppingCartPage(page);
    await shoppingcartpage.goToShoppingCart();
    await shoppingcartpage.addNewQuote();
    await shoppingcartpage.getQuoteNumber();
    await shoppingcartpage.searchProduct();
    await expect(shoppingcartpage.productSearched).not.toHaveCount(0);
    await shoppingcartpage.orderProduct();
    await expect(shoppingcartpage.productNameOrdered).not.toHaveCount(0);
    await shoppingcartpage.confirmOrder();
    await campaignpage.checkOrderTask(productName, expectedTaskName);
    await expect(campaignpage.taskLinkURL).toContain('Templates.aspx');
});