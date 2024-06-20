import { Page } from 'playwright';
import { homepageLocators } from '../locators/homepageLoc';


export class HomePage {
    constructor(private page: Page) { }
    
    async navigate() {
         await this.page.goto(process.env.app_url!);
    }

    async closeCookieNotification() {
        await this.page.click(homepageLocators.cookieCloseButton);
    }

    async openMarketsPage() {
        await this.page.click(homepageLocators.marketsPageLink);
    }
    
    async clickLoginButton() {
        await this.page.click(homepageLocators.loginButton);
    }
    

}