import { LoginPage } from "../pages/login.page";
import { CampaignPage } from "../pages/campaign.page";
import { ShoppingCartPage } from "../pages/shoppingcart.page";
import {test, expect} from "@playwright/test";

test('Go to shopping cart page', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    const campaignpage = new CampaignPage(page);
    await campaignpage.goToCampaign();    
    const shoppingcartpage = new ShoppingCartPage(page);
    await shoppingcartpage.goToShoppingCart();
});

test('Search for a product', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    const campaignpage = new CampaignPage(page);
    await campaignpage.goToCampaign();    
    const shoppingcartpage = new ShoppingCartPage(page);
    await shoppingcartpage.goToShoppingCart();
    await shoppingcartpage.searchProduct();
    await expect(shoppingcartpage.productSearched).toBeVisible();
});

test('Place product in quote', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    const campaignpage = new CampaignPage(page);
    await campaignpage.goToCampaign();    
    const shoppingcartpage = new ShoppingCartPage(page);
    await shoppingcartpage.goToShoppingCart();
    await shoppingcartpage.searchProduct();
    await expect(shoppingcartpage.productSearched).not.toHaveCount(0);
    await shoppingcartpage.orderProduct();
    await expect(shoppingcartpage.productNameOrdered).not.toHaveCount(0);
});

test('Confirm order', async ({  page  }) => {
    const loginpage = new LoginPage(page);
    await loginpage.loginValidAccount();
    await expect(loginpage.userInfo).toHaveCount(1);
    const campaignpage = new CampaignPage(page);
    await campaignpage.goToCampaign();    
    const shoppingcartpage = new ShoppingCartPage(page);
    await shoppingcartpage.goToShoppingCart();
    await shoppingcartpage.addNewQuote();
    await shoppingcartpage.getQuoteNumber();
    await shoppingcartpage.searchProduct();
    await expect(shoppingcartpage.productSearched).not.toHaveCount(0);
    await shoppingcartpage.orderProduct();
    await expect(shoppingcartpage.productNameOrdered).not.toHaveCount(0);
    await shoppingcartpage.confirmOrder();
});