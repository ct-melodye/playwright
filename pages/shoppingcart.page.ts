import {test, expect, Locator, Page} from "@playwright/test";
import { FrameLocator } from "playwright";
import { delay } from "./utils";

export class ShoppingCartPage{
    readonly productLink: Locator;
    readonly page: Page;
    readonly searchField: Locator;
    readonly textAreas: Locator;
    readonly textBoxes: Locator;
    readonly radioBoxes: Locator;
    readonly addToCampaignBtn: Locator;
    readonly productNameOrdered: Locator;
    readonly productName: string;
    readonly productSearched: Locator;
    readonly confirmOrderBtn: Locator;
    readonly addNewQuoteBtn: Locator;

    constructor(page: Page){
        this.page = page;   
        this.searchField = page.locator('//*[@id="finderTextboxDiv"]/input');
        this.textAreas = page.frameLocator('internal:role=complementary >> iframe').locator('textarea');
        this.textBoxes = page.frameLocator('internal:role=complementary >> iframe').locator('input[type="text"]:not(input[style="display: none;"])');
        this.radioBoxes = page.frameLocator('internal:role=complementary >> iframe').locator('input[type="radio"]');
        this.addToCampaignBtn =  page.frameLocator('internal:role=complementary >> iframe').getByRole('button', { name: 'Add To Campaign' });
        this.productName = '6x4 Edgewrap Signboard';
        this.productNameOrdered = page.locator('#cartQuoteContent').getByRole('button', { name: this.productName });
        this.productSearched = page.getByRole('button', { name: this.productName }).first();
        this.confirmOrderBtn = page.getByRole('button', { name: 'Confirm Order arrow_forward' });
        this.addNewQuoteBtn =  page.getByRole('button', { name: 'Add new quote add' });

    }
    
    async goToShoppingCart(){
        await this.page.getByRole('link', { name: 'Shopping Cart' }).getByRole('button').click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    
    async addNewQuote(){
        await this.addNewQuoteBtn.waitFor();
        await this.addNewQuoteBtn.click();

        try{
            await delay(2000, null);
            const addNewQuoteHeading =  this.page.getByRole('heading', { name: 'Add new quote' });
            await addNewQuoteHeading.first().waitFor();
            await this.page.locator('#ok').click();            
        }
        catch { console.log('no stage 2 quote');}
    }

    async getQuoteNumber(){
        await delay(2000, null);
        let quoteNum = await this.page.locator('#quoteName').textContent();
        const quoteNumber = quoteNum?.replace('Quote ', '');
        console.log(quoteNumber);
    }

    async searchProduct(){
        await this.searchField.click();
        await this.page.getByPlaceholder('Search for a product, supplier, pre-saved schedules, recent properties').fill(this.productName);
        await this.page.waitForLoadState('domcontentloaded');
    }
    async orderProduct(){
        delay(3000, null);
        await this.page.getByRole('button', { name: this.productName }).first().click();
        await this.page.waitForLoadState('load');
        await this.page.frameLocator('internal:role=complementary >> iframe').locator('#ddlDate').waitFor();
        await this.page.frameLocator('internal:role=complementary >> iframe').locator('#ddlDate').selectOption({index:1});
        // fill out all textareas
        for (const li of await this.textAreas.all())
        await li.fill('test')
       //fill out all displayed textfields
        for (const li of await this.textBoxes.all())
        await li.fill('1');
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.addToCampaignBtn.waitFor();
        await this.addToCampaignBtn.click();
        await this.page.waitForLoadState("domcontentloaded");
    }
    async confirmOrder(){
        await this.confirmOrderBtn.waitFor();     
        await this.confirmOrderBtn.click();
        await this.page.getByRole('heading', { name: 'Review Your Order' }).waitFor();
        await this.page.getByRole('button', { name: 'ASAP' }).click();
        
        const contribWarning =  this.page.getByText('warning There are not enough contributions to confirm this order.');
        try{
            await contribWarning.first().waitFor({timeout: 5000});
            await this.page.getByText('keyboard_arrow_right keyboard_arrow_down Current Contributions').click();
            await this.page.getByRole('button', { name: 'Add New Contribution add' }).click();
            await delay(5000, null);
            await this.page.locator('ct-contribution-edit-v3').waitFor();
            await this.page.locator('#saveBtn').waitFor();
            await this.page.locator('#saveBtn').click();
        } catch(e){
            console.log("no warning");
        }
        
        await this.page.locator('label').filter({ hasText: 'Generate Confirmation PDF' }).waitFor()
        await this.page.locator('label').filter({ hasText: 'Generate Confirmation PDF' }).click();
        await delay(3000, null);
        await this.page.getByRole('button', { name: 'Place Order Now arrow_forward' }).click();
    }
}