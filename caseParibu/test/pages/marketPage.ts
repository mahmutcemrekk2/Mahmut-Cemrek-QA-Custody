import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { marketPageLocators } from '../locators/marketPageLoc'; 

let currentPrice: number;
let cryptAmount: number;

export class MarketPage {
    constructor(private page: Page) { }

    async selectFanFilter() {
        await this.page.click(marketPageLocators.fanFilterButton);
    }
    
    async setPriceChangeInterval(time: number) {
        await this.page.click(marketPageLocators.priceChangeIntervalDropdown);
        const hours = marketPageLocators.selectHours.replace('%s', time.toString());
        await this.page.click(hours);
    }
    
    async clickCryptocurrency(which: number) {
        await this.page.locator(marketPageLocators.selectCryptocurrency).nth(which - 1).click();
    }
    
    async enterUnitPrice() {
        currentPrice = Number(await this.page.locator(marketPageLocators.currentPrice).innerText());
        await this.page.fill(marketPageLocators.unitPrice, currentPrice.toString());
    }
    
    async enterAmount(amount: number) {
        cryptAmount = amount;
        await this.page.fill(marketPageLocators.amount, amount.toString());
    }
    
    async verifyTotalPrice() {
        const totalPrice = await this.page.locator(marketPageLocators.total).evaluate((input: HTMLInputElement) => input.value);
        const Expected = currentPrice * cryptAmount;
        expect(Number(totalPrice)).toBe(parseFloat(Number(Expected).toFixed(2)));
        console.log('confirmed to be currentPrice × cryptAmount = totalPrice' );
    }

    async sortByMarketPriceDescending() {
        await this.page.click(marketPageLocators.marketPrice);
    }


    
    
}