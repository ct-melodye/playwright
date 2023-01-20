import {expect, Locator, Page} from '@playwright/test';
import {delay} from './utils';

export class CampaignPage{
    readonly url = 'https://live.campaigntrack.com/CtCampaignDashboard/?PropertyNo=' + '6784054';
    readonly page: Page;
    readonly campaignHeader: Locator;
    taskName: Object;
    taskLinkURL: String;

    constructor(page: Page){
        this.page = page;
        this.campaignHeader = page.locator('ct-campaign-header');
    }

    async goToCampaign(){
        await this.page.goto(this.url, {waitUntil: 'domcontentloaded'});
    }

    async checkOrderTask(productName, expectedTaskName){
        await delay(10000, null);
        //Click See More button if exists
        try{
            const tasksSeeMoreBtn = this.page.locator('#tasksListModalfy').getByRole('button');
            await tasksSeeMoreBtn.waitFor({timeout: 10000});
            await tasksSeeMoreBtn.click();
            await tasksSeeMoreBtn.click();
        }
        catch{console.log('no See More button')}
        await delay(5000, null);
        // let tasks = this.page.locator('section > .item-list > li > .list-div > .details-div > a');
        // const tasksCount = await tasks.count();
        // let finalCount = 0;
        // for(let i=0; i<tasksCount;i++){
        //     let try1 = await tasks.nth(i).textContent();
        //     if(try1?.includes('6x4 Edgewrap Signboard')==true){
        //          finalCount = i+1;
        //          break;
        //     }
        // }        
        // console.log(finalCount);
        // await this.page.locator('section > .item-list > li:nth-child('+finalCount+') > .list-div > .list-btn > a > .cs-1fr-auto-grid > button').click();
        
        this.page.locator('.list-div', {
            has: this.page.locator('.details-div', { hasText: productName})
            }).locator('.list-btn', { hasText: expectedTaskName }).nth(1).click();
        await delay(5000, null);
        this.taskLinkURL = this.page.url();
    }

}


